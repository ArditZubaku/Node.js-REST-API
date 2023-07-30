const { ObjectId } = require("mongodb");

class User {
  constructor(fullName, email, username, password) {
    this._id = new ObjectId(); // MongoDB's _id will be generated automatically
    this.full_name = fullName;
    this.email = email;
    this.username = username;
    this.password = password;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static collectionName() {
    return "users";
  }

  static async connect() {
    const db = await connectToDatabase();
    this.collection = db.collection(this.collectionName());
  }

  static async findByUsername(username) {
    return this.collection.findOne({ username });
  }

  static async findById(id) {
    return this.collection.findOne({ _id: ObjectId(id) });
  }

  static async create(user) {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    await this.collection.insertOne(user);
  }

  static async comparePasswords(passswordToCompare, hashedPassword) {
    return await bcrypt.compare(passswordToCompare, hashedPassword);
  }
}

module.exports = User;

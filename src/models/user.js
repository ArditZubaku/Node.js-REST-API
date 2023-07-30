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
}

module.exports = User;

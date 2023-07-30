const express = require("express");
const router = express.Router();
const { register, login, myProfile} = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate");

router.post("/register", register);
router.post("/login", login);
router.get('/my-profile', authenticate, myProfile);

module.exports = router;

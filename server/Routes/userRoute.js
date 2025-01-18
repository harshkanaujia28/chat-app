const express = require("express")
const {
    registerUser,
    loginUser,
    findUser,
    getUsers,
    searchUsers, // We will add this function in the controller
  } = require("../Controllers/userController");


const router = express.Router();
 

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/find/:userId",findUser);
router.get("/", getUsers);
router.get("/search", searchUsers); 

module.exports = router;
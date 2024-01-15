const controller = require('../controller');
const router = require('express').Router();
const userValidation = require('../validations/user')

// const {getUser, loginUser, updateUser, deleteUser, registerUser, getUsers} = require("../controllers/userController");

router.get("/:id", controller.UserController.getUser);

router.get("/", controller.UserController.getUsers);

router.post("/login",userValidation, controller.UserController.loginUser);

router.post("/register",userValidation, controller.UserController.registerUser);

router.put("/:id", controller.UserController.updateUser);

router.delete("/:id", controller.UserController.deleteUser);

module.exports = router;
// const asyncHandler = require("express-async-handler");
const Model = require("../../../models/Index");
const User = Model.User;
const validate = require("../../validations/userValidationSchema");

 const registerUser = (async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    // if(error){
    //     console.log(error);
    // }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered!")
    }
    const user = await User.create({
        username,
        email, 
        password
    });
    console.log(`User created ${user}`);
    if(user){
        console.log(`User created ${user}`);
        res.status(201).json({_id: user.id, email: user.email, message: "Register the user"});
    } else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    // res.json({message: "Register the user"});
});

const loginUser = (async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    } else{
        res.status(200);
        res.json({message: "Login succesful!"});
    }
});

const getUser = (async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    res.status(200).json(user);
});

const getUsers = (async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

const updateUser = (async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(404);
        throw new Error("User not found!");
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedUser);
});

const deleteUser = (async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(404);
        throw new Error("User not found!");
    }

    await User.deleteOne();

    res.status(200).json(user);
});

// dbconnect();

module.exports = {getUser, loginUser, updateUser, deleteUser, registerUser, getUsers};

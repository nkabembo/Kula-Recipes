require("dotenv").config({
    path:'../.env' //give .env file location
});
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')
const bcrypt = require("bcryptjs");

const tokenKey = process.env.VITE_TOKEN_KEY;



const registerUser = async (req, res) =>{
    try{
        const {email, username} = req.body;
        //Checking if user already exists in db
        const userExistQuery = await User.findOne({email}).exec();
        //console.log("profile " + req.body.profileUrl)
        //console.log("File ...." + req.file.filename)
        //console.log("Body:  "  + JSON.stringify(req.profileUrl))
        const profileUrl = req.file.filename;

        if (userExistQuery){
            return res.json({message:"Email is taken, User already exists"})
        }

        //Hashing password and creating new user
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        const user = await User.create({email, username, password: hashedPassword, profileUrl})

        return res.status(201).json({message:"User has been successfully added",success: true,user});
    }catch(error){
        console.error(error);
        return res.status(400).send("Error. Try again.");
    }
}

const login = async (req, res) =>{
   // console.log(req.params)
    try{
        const {email} = req.body;
        const userExistQuery = await User.findOne({email}).exec();
        if (!userExistQuery){
            return res.json({message:"Incorrect email of password", success: false})
        }

        const passwordAuth = bcrypt.compareSync(req.body.password,userExistQuery.password);

        if(!passwordAuth){
            return  res.json({message:"Incorrect email of password", success: false});
        }
        const {password, ...other} = userExistQuery;
        const token = jwt.sign({
            id: userExistQuery._id},
            tokenKey);
        //console.log("Others   " + JSON.stringify(other))
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other)

    }catch(error){
        console.error(error);
    }
}

const logout = async (req, res) =>{
    res.clearCookie("access_token", {
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out")
}


module.exports = {registerUser, login , logout}
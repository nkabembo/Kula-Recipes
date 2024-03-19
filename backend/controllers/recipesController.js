// htttp request functions in db which will be referecence in  routes
const jwt  = require('jsonwebtoken');
const Recipe = require('../models/recipeModel')
const mongoose = require('mongoose')
const tokenKey = process.env.VITE_TOKEN_KEY;
//get all recipes
const getRecipes = async (req, res) =>{
    const recipes = await Recipe.find({}).sort({createdAt: -1});
    res.status(200).json(recipes)
}
//create a recipe
const createRecipe = async (req, res)=>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
    });
    const {title, description,ingredients, category, recipeImg, username, time} = req.body
    try{
        const recipe = await Recipe.create({title, description,ingredients, category, recipeImg,time, username})
        res.status(200).json(recipe)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//get a single recipe
const getRecipe = async (req, res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: "No such recipe", success: false})
    }
    const recipe = await Recipe.findById(id)
    if(!recipe){
        return res.status(404).json({message: "No such recipe", success: false})
    }
    res.status(200).json(recipe)
}


//delete a recipe
const deleteRecipe = async (req, res) =>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, tokenKey, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        
    });
    const {id} = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: "No such recipe", success: false})
    }
    const recipe = await Recipe.findOneAndDelete({_id: id})

    if(!recipe){
        return res.status(404).json({message: "No such recipe", success: false})
    }
    res.status(200).json(recipe)
}
//Update a Recipe
const updateRecipe = async (req, res) =>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, tokenKey, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        
    });
    const {id} = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: "No such recipe", success: false})
    }
    const recipe = await Recipe.findOneAndUpdate({_id: id},{...req.body})
    if(!recipe){
        return res.status(404).json({message: "No such recipe", success: false})
    }
    res.status(200).json(recipe)
}
module.exports = {
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipe,
    getRecipes
}
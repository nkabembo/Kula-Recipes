const express = require('express')
const {createRecipe,
    getRecipes,
    getRecipe,
    deleteRecipe,
    updateRecipe
} = require('../controllers/recipesController')
const router = express.Router()


//Getting all recipes
router.get('/', getRecipes)

//Getting a recipe
router.get('/:id',getRecipe)

//Adding a new recipe
router.post('/', createRecipe)

//Deleting a recipe
router.delete('/:id',deleteRecipe)

//Editing/Updating a recipe 
router.patch('/:id',updateRecipe)

module.exports = router
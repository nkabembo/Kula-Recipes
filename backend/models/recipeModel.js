const mongoose = require('mongoose')

const Schema = mongoose.Schema


const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients:{
        type: Array,
        require: true
    },
    category:{
        type: String,
        enum: ['Side', 'Veggies', 'Meat','Dessert'],
        required: true
    },
    recipeImg:{
        type: String,
        required: true
    },
    time:{
        type:String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model('Recipe', recipeSchema)
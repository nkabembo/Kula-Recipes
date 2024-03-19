require('dotenv').config()
const multer = require('multer')
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose')


//reuire recipes route from route folder to be able to use recipe routes
const recipeRoutes = require('./routes/recipes')
const authRoutes = require('./routes/auth')
const usersRoutes = require('./routes/users')
//Creates express app 
const app = express();

//Middleware
const upload = require('./upload');
//Looks at the request that come in to see if they have a request body/ data and if the do attaches body to req handler allows to say req.body to access the data
app.use(cookieParser())
app.use(express.json()) //allow us to receive info from the front ent in json format
//app.use(express.urlencoded({ extended: false }));
//global middleware: runs first , must specify next() to allow to current http request e.g app.get
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../kula-recipe-frontend/public/images");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const uploadImg = multer({ storage });
app.post("/api/upload", uploadImg.single("recipeImg"), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
console.log(".....................")
app.use("/users", usersRoutes);
//Routers from recipeRoutes are appended to end of /api/recipes
app.use('/api/recipes', recipeRoutes)

//connecting to databse through mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        //Listening for requests only after db is connected
        app.listen(process.env.PORT, function (){
            console.log('Connected to db & Recipe App is listening on port ' , process.env.PORT);
        })  
    })
    .catch((error) =>{
        console.log(error)
    })

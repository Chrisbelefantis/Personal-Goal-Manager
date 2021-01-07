const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();


const goalsRoutes = require('./api/routes/goals');
const categoriesRoutes = require('./api/routes/categories');
const userRoutes = require('./api/routes/user');


mongoose.connect('mongodb+srv://chrisbelefantis:'+process.env.MONGO_ATLAS_PSW+'@react-app-cluster.bkdid.mongodb.net/goal-manager-app?retryWrites=true&w=majority', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
});


//First middleware
//Just to have output at the console for the requests
app.use(morgan('dev'));

//Second middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())



// //Third middleware
// //To avoid CORS errors
app.use((req,res,next)=> {
    //I set the headers and the request continues
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","*");

    //we have return beacause I dont need to go the routes, this is the first message
    //browser sends
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }

    next();

});




app.use('/goals',goalsRoutes);

app.use('/categories',categoriesRoutes);

app.use('/users',userRoutes);

app.use((req,res,next)=>{
    const error = new Error("Route Not Found");
    error.status = 404;
    next(error);

});



app.use((error,req,res,next)=>{

    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });

});

module.exports = app;
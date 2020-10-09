const mongoose = require('mongoose');


const categorieSchema = new mongoose.Schema({

    _id : mongoose.Schema.Types.ObjectId,
    title: {type: String , required: true, unique: true},
    user: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required:true}

});

module.exports =  mongoose.model('Category',categorieSchema);
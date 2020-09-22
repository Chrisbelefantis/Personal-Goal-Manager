const mongoose = require('mongoose');


const goalSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String , required:true},
    category: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required:true},
    description: String,
    dueDate: Date,
    isCompleted: {type: Boolean, required: false,default: false},
    user: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required:true},
});


module.exports =  mongoose.model('Goal',goalSchema);


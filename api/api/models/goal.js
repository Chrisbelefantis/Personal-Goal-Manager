const mongoose = require('mongoose');


const goalSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String , required:true},
    category: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required:true},
    description: String,
    dueDate: String,
    isCompleted: {type: Boolean, required: true}
});


module.exports =  mongoose.model('Goal',goalSchema);


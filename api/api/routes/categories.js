const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Category = require('../models/category');



router.get('/',(req,res,next)=>{

    Category.find({},'title')
    .exec()
    .then(data=>{
        res.status(200).json(Object.values(data));
    })
    .catch(err=>{
        res.status(500).json({"error" : err});
    });

});


router.post('/',(req,res,next)=>{

    const newCategory = new Category({
        _id:mongoose.Types.ObjectId(),
        title: req.body.title
    });

    Category.find({title: req.body.title})
    .exec()
    .then(data=>{
        if(data.length===0){

            newCategory.save()
            .then(data=>{
                res.status(201).json({
                    "message":"New Category Added",
                    "category": data
                });
            })
            .catch(err=>{
                res.status(500).json({
                    "message": "An error occured",
                    "error": err
                });
            });

        }else{
            res.status(409).json({
                "message":"Category Allready Exists"
            });
        }

    });
});


router.delete('/:categoryID',(req,res,next)=>{

    const id = req.params.categoryID;

    Category.findOne({_id: id})
    .exec()
    .then(result=>{
        if(result){
            Category.deleteOne({_id: id})
            .then(message=>{
                res.status(200).json({
                    "message":"Category Deleted"
                });
            })
            .catch(err=>{
                res.status(500).json({
                    "Error": err
                });
            });
        }else{
            res.status(404).json({
                "message":"There is no such category"
            });
        }


    });

});



module.exports=router;
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Goal = require('../models/goal');
const Category = require('../models/category');

const checkAuth = require('../../middleware/check-auth');

router.get('/',checkAuth,(req,res,next)=>{

    Category.find({user: req.userData.userId},'title')
    .exec()
    .then(data=>{
        res.status(200).json(Object.values(data));
    })
    .catch(err=>{
        res.status(500).json({"error" : err});
    });

});


router.post('/',checkAuth,(req,res,next)=>{

    
    const newCategory = new Category({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        user: req.userData.userId
    });

    Category.find({title: req.body.title, user: req.userData.userId})
    .exec()
    .then(data=>{
        console.log(data,"data");
        if(data.length===0){
     
            newCategory.save()
            .then(data=>{
                
                res.status(201).json({
                    "message":"New Category Added",
                    "category": data
                });
            })
            .catch(err=>{
              console.log(err);
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

router.patch('/:categoryID',checkAuth,(req,res)=>{
    
    const categoryId = req.params.categoryID;
    const userId = req.userData.userId;
    const newTitle = req.body.title;
    

    Category.findOne({_id : categoryId})
    .exec()
    .then(result=>{
        if(result){
            Category.updateOne({_id:categoryId,user:userId},{$set:{title:newTitle}})
            .exec()
            .then(result=>{
                res.status(200).json({
                    message:"Category Updated",
                })
            })
            .catch(err=>{
                res.status(500).json({
                    error: err
                });
            })
        }
        else{
            res.status(404).json({
                "message":"There is no such category"
            });
        }
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    })


});

router.delete('/:categoryID',checkAuth,(req,res)=>{

    const categoryID = req.params.categoryID;
    
    Goal.find({category: categoryID})
    .exec()
    .then(data=>{
        
        const goalsId = []
        for(let i=0; i<data.length; i++){
            goalsId.push(data[i]._id);            
        }

        Goal.deleteMany({_id: {$in: goalsId}})
        .then(data=>{
            Category.deleteOne({_id:categoryID})
            .then(data=>{
                res.status(200).json({
                    message:'success'
                });
            })
        })
    })
    .catch(err=>{
        console.log(err);
    })
});



module.exports=router;
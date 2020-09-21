const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Goal = require('../models/goal');


const checkAuth = require('../../middleware/check-auth');


router.get('/',checkAuth,(req,res,next)=>{

    let result = [];

    Goal.find({})
    .populate('category')
    .exec()
    .then(data=>{

        
        //Change the format of the response
        //Group goals by category
        for(let i=0; i<data.length; i++)
        {

            let goalContent = { 
                "title": data[i].title,
                "isCompleted": data[i].isCompleted,
                "isExpanded": false,
                "id":data[i]._id,
            };


        
            let isCategoryExist = false;
            let categoryIndex = -1;
            for(let j=0; j<result.length; j++){
                if(result[j].title === data[i].category.title){
                    isCategoryExist = true;
                    categoryIndex = j;
                }

            }

            if(!isCategoryExist){
         
                result.push({
                    "title": data[i].category.title,
                    "id": data[i].category._id,
                    "content": [goalContent]
                });
            }else{
       
             
                result[categoryIndex].content.push(goalContent);
            }



        }
        res.status(200).json({
            "categories":
                [...result]
        });
    

    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    })
});







router.post('/',checkAuth,(req,res,next)=>{




    const newGoal = new Goal({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        dueDate: req.body.dueDate,
        isCompleted: req.body.isCompleted
    });

    newGoal.save()
    .then(data=>{
        res.status(201).json({
            "message": "New Goal Added",
            "Goal": data
        })
    })
    .catch(err=>{
        res.status(500).json({
            "erros": err
        });
    });
    

});


router.get('/:goalID',checkAuth,(req,res,next)=>{

    const id = req.params.goalID;
    Goal.findOne({_id:id})
    .exec()
    .then(result=>{

        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({
                "message":"Goal not Found"
            });
        }

    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    });


});


router.patch('/:goalID',checkAuth,(req,res,next)=>{

  
    const id = req.params.goalID;
    let updateOps = {};

    for(var key in req.body){
        let temp = `req.body.${key}`
        updateOps[key] = eval(temp);
    }


    Goal.updateOne({_id:id},{$set: updateOps})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:"Goal Updated",
            request: {
                type:"GET",
                url: "http://localhost:3000/goals/"+id
            }
        })

    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    });


});


router.delete('/:goalID',checkAuth,(req,res,next)=>{

    const id = req.params.goalID;

    Goal.findOne({_id: id})
    .exec()
    .then(result=>{
        if(result){
            Goal.deleteOne({_id: id})
            .then(message=>{
                res.status(200).json({
                    "message":"Goal Deleted"
                });
            })
            .catch(err=>{
                res.status(500).json({
                    "Error": err
                });
            });
        }else{
            res.status(404).json({
                "message":"There is no such Goal"
            });
        }


    });

});





module.exports = router;

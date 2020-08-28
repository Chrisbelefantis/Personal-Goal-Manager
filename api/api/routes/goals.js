const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Goal = require('../models/goal');
const { json } = require('body-parser');






router.get('/',(req,res,next)=>{

    let result = {};

    Goal.find({})
    .populate('category')
    .exec()
    .then(data=>{

        //Change the format of the response
        //Group goals by category
        for(let i=0; i<data.length; i++)
        {
            console.log(data[i].category.title);

            if(!result.hasOwnProperty(data[i].category.title)){
                result[data[i].category.title] = [];
            }

            result[data[i].category.title].push({
                "title": data[i].title,
                "isCompleted": data[i].isCompleted,
                "request":{
                    "type": "GET",
                    "url": "http://localhost:3000/goals/" +data[i]._id
                }
            });
        }

        res.status(200).json(result);

    })
    .catch(err=>{
        res.status(500).json({
            "error": err
        });
    });



});


router.post('/',(req,res,next)=>{
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


router.get('/:goalID',(req,res,next)=>{

    const id = req.params.goalID;
    Goal.findOne({_id:id})
    .exec()
    .then(data=>{

        if(data){
            res.status(200).json({
                data
            });
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


router.patch('/:goalID',(req,res,next)=>{

  
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

module.exports = router;

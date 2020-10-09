const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const jwt = require("jsonwebtoken");

router.post('/signup',(req,res,next)=>{
    
    User.find({email: req.body.email})
    .exec()
    .then(result=>{

        if(result.length >= 1){
            res.status(409).json({
                message: 'Mail Exists'
           })
        }else{


            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    res.status(500).json({
                        error: err
                    })
                }
                else{
                    const user = new User({
                        _id : new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    })
                    
                   
                    const token = jwt.sign(
                        {
                            email: user.email,
                            userId : user._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );

                    user.save()
                    .then(savedData=>{
                        res.status(201).json({
                            message: "New User Added",
                            data: savedData,
                            token: token,
                            expiresIn: 3600
                        });          
                    })
                    .catch(err=>{
                        res.status(500).json({
                            error: err
                        })
                    })

                }
            }) 
        }
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    })


});


router.post("/login",(req,res,next)=>{
    User.findOne({email: req.body.email})
    .exec()
    .then(data=>{
        console.log(data);
        if(data===null){
            res.status(401).json({
                message: "Auth Failed"
            })
        }else{
            bcrypt.compare(req.body.password,data.password,(err,result)=>{
                if(result){
                    const token = jwt.sign(
                        {
                            email: data.email,
                            userId : data._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );

                    return res.status(200).json({
                        message: "Auth successful",
                        token: token,
                        expiresIn: 3600
                      });
                }else{
                    res.status(401).json({
                        message: "Auth Failed"
                    })
                }
            })

        }
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    });

});


router.delete("/:userId", (req, res, next) => {
    User.remove({ _id: req.params.userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User deleted"
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });



module.exports = router;
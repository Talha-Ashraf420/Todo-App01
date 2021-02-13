const express = require('express');
const app = express();
var router = express.Router();
const tasksRoute = express.Router();
let Tasks=require('../models/tasks');
const mongoose=require('mongoose')
var { customAlphabet } = require("nanoid");
const nanoid = customAlphabet('1234567890', 5)
const alpha = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 1)


tasksRoute.route('/add-task').post(function(req,res){
    console.log('this is data',req.body);
    var str1="CAT-"
    var str3=alpha(1)
    var str2=nanoid(5)
    var taskId=str1.concat(str3.concat(str2))
    let tasks=new Tasks({
        tasks: req.body.tasks,
        taskId:taskId
    });
    
    tasks.save()
    .then(tasks=>{
        res.json({
            res:true,
            data: tasks,
            message:"Successfully Added!"})
    })
    .catch(err=>{
        res.status(401).json({
            res:err,
            message:'Errors in adding info'
        })
    })
})
tasksRoute.route('/get-tasks').get(function(req,res){
    Tasks.find(function(err,data){
        if(err){
            console.log(err)
        }
        else{
            console.log('data====',data);
           res.json(data)
        }
    })
})

tasksRoute.route('/get-task/delete/:id').get(function (req, res) {
    Tasks.findByIdAndRemove({_id: req.params.id}, function(err, product){
        if(err) res.status(500).send('Error in Deleting/Record not found!')
        else res.json('Successfully removed');
    });
 });
 
module.exports=tasksRoute;
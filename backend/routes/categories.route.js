const express = require('express');
const app = express();
var router = express.Router();
const taskCategories = express.Router();
let Category=require('../models/categories');
const mongoose=require('mongoose')
var { customAlphabet } = require("nanoid");
const nanoid = customAlphabet('1234567890', 5)
const alpha = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 1)


taskCategories.route('/add-category').post(function(req,res){
    console.log('this is data',req.body);
    var str1="CAT-"
    var str3=alpha(1)
    var str2=nanoid(5)
    var categoryId=str1.concat(str3.concat(str2))
    let category=new Category({
        category: req.body.category,
        categoryId:categoryId
    });
    
    category.save()
    .then(category=>{
        res.json({
            res:true,
            data: category,
            message:"Successfully Added!"})
    })
    .catch(err=>{
        res.status(401).json({
            res:err,
            message:'Errors in adding info'
        })
    })
})

taskCategories.route('/get-tasks/edit/:id').put(function(req,res){
    Category.findOneAndUpdate({_id: req.params.id},
     {
       $push: {
           "category.tasks":req.body.tasks,
          }
 }, function (err, result) {
       if (err) {
          return res.status(500).send('Something broke!');
       }
    else {
        console.log(result)
           res.status(200).json({status: true, messages: 'Status Changed'}
           )}
  });
})

taskCategories.route('/get-categories').get(function(req,res){
    Category.find(function(err,data){
        if(err){
            console.log(err)
        }
        else{
            console.log('data====',data);
           res.json(data)
        }
    })
})

taskCategories.route('/get-category/delete/:id').get(function (req, res) {
    Category.findByIdAndRemove({_id: req.params.id}, function(err, product){
        if(err) res.status(500).send('Error in Deleting/Record not found!')
        else res.json('Successfully removed');
    });
 });
 
module.exports=taskCategories;
const mongoose=require('mongoose')
var Schema=mongoose.Schema;
var categoriesSchema= new mongoose.Schema({
    category:{
        categoryName:String,
        tasks:[Object]
    },
    categoryId:String,
    }
 )
module.exports=mongoose.model('Categories',categoriesSchema)
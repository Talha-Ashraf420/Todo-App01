const express = require('express')
const app = express()
const path=require('path')

const forceSSL=function(){
    return function(req,res,next){
        if(req.headers['x-forwaerded-proto']!=='https'){
            return res.redirect(
                ['https//:',req.get('Host'),req.url].join('')
            )

        }
        next();
    }
}
app.use(express.static(__dirname+'/dist/Todo'));

app.get('/', function (req, res) {
  res.send(path.join(__dirname+'/dist/Todo/index.html'))
})
 
app.listen(process.env.PORT || 8080)
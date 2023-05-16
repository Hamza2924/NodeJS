const express = require('express')
const app = express();
const fs= require('fs');
const path = require('path');
const dirpath =path.join(__dirname);

//console.log(dirpath);
//fs.writeFileSync(dirpath+'/abc.txt',"fghfgfdrteerett");

//Create
app.get('/', function (req, res) {
     try{  
        fs.writeFileSync('abc.txt',"Hellow world ");
    
       }
       catch(err){
          console.log(err);
       }
       res.send('Hello World');
})

const port=8000;
 app.listen(port,()=>{console.log(`server running on Port:${port}`)});


//Read 
app.get("/home",function(req,res){
 
       fs.readFile('abc.txt','utf8',(err,item)=>{
        console.log(item);
       });
   
//    res.send("REad File")
res.status(201).send("Read File");

})
app.listen(2000);


//Update
app.get("/Update",function(req,res){
 
    fs.appendFile('abc.txt',"Append Data in file",(err)=>{
     if(!err){
        console.log("File IS Updated");
    }
    });

res.send("Updated");

})
app.listen(1000);

//Delete
app.get("/delete",function(req,res){
 
    fs.unlink('simple.txt',(err)=>{
     if(!err){
        console.log("File is deleted");
    }
    });

res.send("Delelted");

})
app.listen(9000);


//https://github.com/frazbakht5/techlift-teaching/blob/node-class-demo/node-js/index.js
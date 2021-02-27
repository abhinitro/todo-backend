const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const todoModel=require('./todo.model');

const { validationResult } = require('express-validator');



module.exports={

    create,
    index,
    destroy,
    update,
    getById
}



async function create(req,res) {


    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
     if (!errors.isEmpty()) {
        res.status(400).json({  status: 400,errors: errors.array() });
        return;
      }

     let post=req.body;
     post['create_user_id']=req.user.sub;
     console.log(post); 
     let todo=todoModel.create(req.body); 

     return res.status(200).json( {
        status: 200,
        msg: "todo is created",
        todo
    }); 

    
}


async function index(req,res) {

    let todos=await todoModel.findAll(req.user.sub);
    return res.status(200).json( {
        status: 200,
        todos 
       }); 

    
}


async function getById(req,res){

    let todo =await todoModel.findById(req.params.id);

    if(!todo){
        return res.status(400).json( {
            status: 400,
            msg: "model not found",
            
        }); 

    }

    return res.status(200).json( {
        status: 200,
        todo:todo
       }); 

}

async function destroy(req,res) {

    let todo =await todoModel.findById(req.body.id);

    if(!todo){
        return res.status(400).json( {
            status: 400,
            msg: "model not found",
            
        }); 

    }

    console.log(todo[0].create_user_id);
    console.log("ccccccccccc",todo,req.user.sub,todo.create_user_id);

    if(todo[0].create_user_id !=req.user.sub){
        return res.status(400).json( {
            status: 400,
            msg: "you don't have access",
            
        }); 
    }

   await todoModel.destroy(req.body.id); 
   return res.status(200).json( {
    status: 200,
    msg:"Todo is destroyed" 
   }); 

    
}

async function update(req,res) {


    if(req.body.hasOwnProperty("state_id")){


    }else{
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) {
       res.status(400).json({  status: 400,errors: errors.array() });
       return;
     }
    }

     let post=req.body;

     post['id']=req.params.id;

     let find=await todoModel.findById(req.params.id);

     console.log(find,find.length);

     if(find.length==0){
        return res.status(400).json( {
            status: 400,
            msg:"Todo is not found" 
           }); 
        
    }
     
     let model=await todoModel.update(post);

     return res.status(200).json( {
        status: 200,
        msg:"Todo is updated" ,
       
       }); 
    
}   
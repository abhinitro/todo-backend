const con= require("./../_helpers/db");
const { body } = require('express-validator');
const util = require('util');


let table='bucket_todos_lists';

const query = util.promisify(con.query).bind(con);


module.exports={
    
    findAll,
    create,
    destroy
    
  
    
};


async function findAll(bucket_id){

    let sql=`select * from ${table} left join todos on ${table}.todo_id = todos.id and ${table}.bucket_id = '${bucket_id}'`;
    let model =await query(sql);
    return model;

}

async function create(obj){

    console.log(obj);
    let todo_id=obj.todo_id;
    let bucket_id=obj.bucket_id;
    let create_user_id=obj.create_user_id;
    let sql = `INSERT INTO ${table} (todo_id,bucket_id,create_user_id) VALUES ('${todo_id}','${bucket_id}','${create_user_id}')`;
    let model =await query(sql);
    return model;
}

async function destroy(req,res) {
    let todo =await todoModel.findById(req.body.id);
    if(!todo){
        return res.status(400).json( {
            status: 400,
            msg: "model not found",
        }); 
    }
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

async function destroy(id){
    let sql=`DELETE FROM ${table} WHERE bucket_id=${id}`;
    let model =await query(sql);
    return model;
}
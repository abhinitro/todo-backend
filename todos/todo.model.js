const con= require("./../_helpers/db");
const { body } = require('express-validator');
const util = require('util');


let table='todos';

const query = util.promisify(con.query).bind(con);


module.exports={

    findOne,
    findAll,
    findById,
    create,
    update,
    destroy
    
};

async function findOne(obj){


}

/**
 * 
 * @param {String} id 
 */
async function findById(id){

    let sql=`SELECT * FROM ${table} where id=${id}`;
    let model =await query(sql);
    console.log(typeof model);
    return model;
    
}

async function findAll(id){

  let sql=`SELECT * FROM ${table} where create_user_id=${id}`;
  let model =await query(sql);
  return model;

}


async function create(obj){

    let title=obj.title;
    let description=obj.description;
    let date=obj.date;
    let create_user_id=obj.create_user_id;
    let sql = `INSERT INTO ${table} (title,description,date,create_user_id) VALUES ('${title}', '${description}','${date}','${create_user_id}')`;
    let model =await query(sql);
    return model;


}

async function update(obj){
    let id=obj.id;
    if(obj.hasOwnProperty("state_id")){
        let sql=`UPDATE ${table} SET state_id="${1}"WHERE id=${id}`;
        let model =await query(sql);
        return model;

    }
  
  
    let title=obj.title;
    let description=obj.description;
    let date=obj.date;
  

    

    let sql=`UPDATE ${table} SET title="${title}",description="${description}",date="${date}" WHERE id=${id}`;
   
    let model =await query(sql);
    return model;

}

async function destroy(id){

    let sql2=`DELETE FROM bucket_todos_lists WHERE todo_id=${id}`;
    let model2=await query(sql2);
    let sql=`DELETE FROM ${table} WHERE id=${id}`;
    let model =await query(sql);
    return model;
}
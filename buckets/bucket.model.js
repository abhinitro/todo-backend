const con= require("./../_helpers/db");
const { body } = require('express-validator');
const util = require('util');


let table='buckets';

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
    let create_user_id=obj.create_user_id;
    let sql = `INSERT INTO ${table} (title,create_user_id) VALUES ('${title}','${create_user_id}')`;
    let model =await query(sql);
   
    return model.insertId;
}

async function update(obj){
    let id=obj.id;
    let title=obj.title;
    let description=obj.description;
    let date=obj.date;
    let sql=`UPDATE ${table} SET title="${title}" WHERE id=${id}`;
    let model =await query(sql);
    return model;

}

async function destroy(id){
    let sql=`DELETE FROM ${table} WHERE id=${id}`;
    let model =await query(sql);
    return model;
}
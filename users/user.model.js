const con= require("./../_helpers/db");
const { body } = require('express-validator');
const util = require('util');


let table='users';

const query = util.promisify(con.query).bind(con);


module.exports={

    findByEmail,
    create,
    validate,
    findById
}




async function validate(method){

    switch (method) {
        case 'createUser': {
         return [ 
            body('password').exists(),
            body('email').exists().isEmail(),
            body('contact').optional().isInt(),
           ];   
        }
      }
    
}




async function create(obj){


    let email=obj.email;
    let password=obj.password;
    let first_name=obj.first_name;
    let last_name=obj.last_name;
    let contact=obj.contact;

    let sql = `INSERT INTO ${table} (email, password,first_name,last_name,contact) VALUES ('${email}', '${password}','${first_name}','${last_name}','${contact}')`;
    let model =await query(sql);
    return model;
}

async function findByEmail(email){

    let sql=`SELECT * FROM ${table} where email='${email}'`;


     try{


      let model =await query(sql);

      console.log("findByEmail try",model);
      return model;


     }catch(err){

        console.log("findByEmail",err);
     }

}

async function findById(id){

    let sql=`SELECT * FROM ${table} where id='${id}'`;


     try{


      let model =await query(sql);

      console.log("findByEmail try",model);

      if(model.length==0){
          return null;
      }
      return model[0];


     }catch(err){

        console.log("findByEmail",err);
     }

}
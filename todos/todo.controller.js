const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const todoService=require('./todo.service');



// routes
router.post('/create', body('title').exists(),body('description').exists(),body('date').exists(),create);
router.post('/update/:id',body('title').exists(),body('description').exists(),body('date').exists(),edit);
router.get('/index',index);
router.post('/delete',body('id').exists(),destroy);
router.get('/getById/:id',getById);



module.exports = router;





async function getById(req,res){

    return todoService.getById(req,res);


}

async function create(req,res){

    return todoService.create(req,res);


}



async function index(req,res){

    return todoService.index(req,res);

    
}


async function destroy(req,res){


return todoService.destroy(req,res);

    
}

async function edit(req,res){

    return todoService.update(req,res);


    
}
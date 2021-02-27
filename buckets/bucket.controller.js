const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const todoService=require('./bucket.service');



// routes
router.post('/create', body('title').exists(),create);
router.post('/update/:id',body('title').exists(),edit);
router.get('/index',index);
router.get('/bucket-index/:id',indexBucketTodo);
router.post('/delete',body('id').exists(),destroy);
router.get('/getById/:id',getById);


module.exports = router;

async function indexBucketTodo(req,res){
    return todoService.indexBucketTodo(req,res);
 }

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
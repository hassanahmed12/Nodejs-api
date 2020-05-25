const express = require('express');
const router = express.Router();
const members = require('./Members')
router.get('/api/members',(req,res)=>{

    res.json(members);
})
router.get ('/api/members/:id',(req,res)=>{
    const found = members.some(members=>members.id===parseInt(req.params.id));
    if(found){
    res.json(members.filter(members=>members.id===parseInt(req.params.id)));
    }
    else{
        res.status(400).json({msg:`this id ${req.params.id} is not in our database`});
    }
});
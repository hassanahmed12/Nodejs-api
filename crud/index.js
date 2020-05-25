const express = require('express');
const app = express();
const members = require('./Members')
const logger = require('./middleware');
const uuid = require('uuid');

app.use(express.json());
app.use(logger);
app.get('/api/members',(req,res)=>{

    res.json(members);
})
app.get ('/api/members/:id',(req,res)=>{
    const found = members.some(members=>members.id===parseInt(req.params.id));
    if(found){
    res.json(members.filter(members=>members.id===parseInt(req.params.id)));
    }
    else{
        res.status(400).json({msg:`this id ${req.params.id} is not in our database`});
    }
});
app.post('/api/members',(req,res)=>{
    const newMember = {
        
            id: uuid.v4(),    name: req.body.name,
            email: req.body.email,
            status: 'inactive'
          

    };
     if(!newMember.email || !newMember.name){
         res.status(400).json({msg:`pls enter a valid ${newMember.email} or ${newMember.id}` });
     }
     members.push(newMember);
     res.json(members);
})
app.put ('/api/members/:id',(req,res)=>{
    const found = members.some(members=>members.id===parseInt(req.params.id));
    if (found) {
        const updMember = req.body;
        members.forEach(member => {
          if (member.id === parseInt(req.params.id)) {
            member.name = updMember.name ? updMember.name : member.name;
            member.email = updMember.email ? updMember.email : member.email;
    
            res.json({ msg: 'Member updated', member });
          }
        });
      } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
      }
    });
    app.delete('/api/members/:id', (req, res) => {
        const found = members.some(member => member.id === parseInt(req.params.id));
      
        if (found) {
          res.json({
            msg: 'Member deleted',
            members: members.filter(member => member.id !== parseInt(req.params.id))
          });
        } else {
          res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
        }
      });

app.listen(3000,()=>{console.log("the port is running on 3000")})
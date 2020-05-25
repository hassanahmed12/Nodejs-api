const express = require('express');
const app = express();
app.use(express.json());
let courses = [
    {id:1, name:'course1'},{id:2, name:'course1'},{id:3, name:'course1'}
]
app.get('/',(req,res)=>{
res.send('hello world');

});
app.get('/api/course',(req,res)=>{
res.send([1,2,3])

});
app.get('/api/courses',(req,res)=>{
res.send(courses);

});
app.get('/api/courses',(req,res)=>{
const course = courses.find(c=>c.id===parseInt(req.params.id))
if(!course) res.status(404).send('the course of that id was not found')
res.send(course)
})
app.post('/api/courses/new',async(req,res)=>{
const course = {
    id: courses.length + 1,
    name: req.body.name
};
let newCourses= await courses.push(course);
    res.send(courses);
    console.log(res.status)


});
//put and delete has to be done
const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening to port 3000 ${port}`))
const express = require('express');
const app = express(); 
const path = require('path');
const mc = require('./controllers/main');
const port = 1313; 

app.use(express.json()); 
app.use(express.static(path.join(__dirname,'../public')))

//Add new items to myList, both user-created and existing
app.post('/api/lists',(req,res,next)=> {mc.create});
//Select list to get, get all myList ojbects and get all or query mainList 
app.get('/api/lists/:myList/:mainList',(req,res,next)=> {mc.read});
//Edit project notes within myList items
app.put('/api/lists/:myKey/',(req,res,next)=> {mc.update}); 
//Remove items from myList array, main list not modifiable
app.delete('/api/lists/key',(req,res,next)=> {mc.delete}); 

app.listen(1313, () => console.log(`Server listening on port ${port}.`))

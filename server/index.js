const express = require('express');
const app = express(); 
const mc = require('./controllers/main');
const port = 1313; 

app.use(express.json());  
// app.use(express.static(path.join(__dirname,'../public/index.html')))

//Add new items to myList, both user-created and existing
app.post('/api/lists',(req,res)=> {mc.create(req,res)});
//Select list to get, get all myList ojbects and get all or query mainList 
app.get('/api/lists/:myList/:mainList',(req,res)=> {mc.read(req,res)});
//Edit project notes within myList items
app.put('/api/lists/:myKey',(req,res)=> {mc.update(req,res)}); 
//Remove items from myList array, main list not modifiable
app.delete('/api/lists/:key',(req,res)=> {mc.delete(req,res)}); 

app.listen(1313, () => console.log(`Server listening on port ${port}.`))

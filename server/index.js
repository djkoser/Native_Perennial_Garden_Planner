const express = require('express');
const app = express(); 
const path = require('path');
const port = 1313; 

app.use(express.json()); 
app.use(express.static(path.join(__dirname,'../public')))

app.get('',()=> {});
app.put('',()=> {}); 
app.post('',()=> {});
app.delete('',()=> {}); 

app.listen(1313, () => console.log(`Server listening on port ${port}.`))

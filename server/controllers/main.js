const masterPlantList = require('../../plantMasterList.json');
const myList=[];

//Add new items to myList, both user-created and existing
// '/api/lists'
//Select list to get, get all myList ojbects and get all or query mainList 
// '/api/lists/:myList/:mainList'
//Edit project notes within myList items
// '/api/lists/:myKey/'
//Remove items from myList array, main list not modifiable
// '/api/lists/key'

const filterText = (req, queryName,keyName) => {
  return masterPlantList.filter((plt) => {
    let val = plt[keyName].toLowerCase();
    return val.includes(req.query[queryName].toLowerCase())
  });
};

const matchText = (req,queryName,keyName) => {
  return masterPlantList.filter((plt) => {
    return plt[keyName] === req.query[queryName]
  });
}

//Query minHeight before maxHeight!!
const between = (req) => {
  return masterPlantList.filter((plt) => {
    if (req.query.maxHeight && req.query.minHeight) {
      return plt.height <= Number.parseInt(req.query.maxHeight) && plt.height >= Number.parseInt(req.query.minHeight);
    } else if (req.query.maxHeight && !req.query.minHeight) {
      return plt.height <= Number.parseInt(req.query.maxHeight);
    } else if (!req.query.maxHeight && req.query.minHeight) {
      return plt.height >= Number.parseInt(req.query.minHeight);
    };
  });
}

module.exports = {
  create:(req,res)=> {
    if (req.body) {
      myList.push(req.body);
      res.status(201).send(myList); 
    } else {res.status(406).send(myList);}; 
  },
  read: (req,res)=> {
    if (req.params.myList==="true" && req.params.mainList==="false") {
      res.status(200).send(myList);
    };
    if (req.params.mainList==="true" && req.params.myList==="false") {
      let result = []; 
      if (req.query.botName) {
        console.log("botname")
        result = [...filterText(req,"botName","botanical_name")]; 
        console.log(result)
      };
      if (req.query.comName) {
        result = [...filterText(req,"comName","common_name")];
      };
      if (req.query.sun) {
        result = [...matchText(req,"sun","sun")];
      };
      if (req.query.blmTime) {
        result = [...matchText(req,"blmTime","bloom_time")];
      };
      if (req.query.maxHeight || req.query.minHeight) {
        result = [...between(req)]; 
      };
      if (req.query.moisture) {
        result = [...matchText(req,"moisture","moisture")];
      };
      console.log(result)
      result.length===0 ? res.status(200).send(masterPlantList) : res.status(200).send(result);

    } else if (req.params.myList === req.params.mainList) {
      res.status(200).send(masterPlantList);
    }
  },
  update: (req,res)=> {
    if (req.params.myKey) {
      myList.forEach((plt)=> plt.id===Number.parseInt(req.params.myKey) ? plt.project_notes = req.body.notesInput : null);
      res.status(200).send(myList);
    } else {res.status(406).send(myList);}; 
  },
  delete: (req,res)=> {
    if (req.params.key) {
      let ind = myList.findIndex(plt=> plt.id===Number.parseInt(req.params.key) ? true : false);
      myList.splice(ind,1); 
      res.status(200).send(myList);
    } else {res.status(406).send(myList);}; 
  }
};
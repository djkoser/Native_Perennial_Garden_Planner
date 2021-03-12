const masterPlantList = require('../../plant_master-list.json'); 
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

const lessThan = (req) => {
  return masterPlantList.filter((plt) => {
    return plt.height <= Number.parseInt(req.query.height);
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
    if (req.params.myList) {
      res.status(200).send(myList);
    };
    if (req.params.mainList) {
      let result = []; 
      if (req.query.botName) {
        result = [...filterText(req,"botName","botanical_name")]; 
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
      if (req.query.height) {
        result = [...lessThan(req)]; 
      };
      if (req.query.moisture) {
        result = [...matchText(req,"moisture","moisture")];
      };
      res.status(200).send(result);
    } else {
      res.status(200).send(masterPlantList);
    }
  },
  update: (req,res)=> {
    if (req.params.myKey) {
      myList.forEach((plt)=> plt.id===Number.parseInt(req.params.myKey) ? plt.project_notes=req.body.notesInput : null);
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
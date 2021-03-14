const masterPlantList = require('../../plantMasterList.json');
const myList=[];
let numESpring;
let numLSpring;
let numSummer;
let numFall;


//Add new items to myList, both user-created and existing
// '/api/lists'
//Select list to get, get all myList ojbects and get all or query mainList 
// '/api/lists/:myList/:mainList'
//Edit project notes within myList items
// '/api/lists/:myKey/'
//Remove items from myList array, main list not modifiable
// '/api/lists/key'

const filterText = (list,req,queryName,keyName) => {
  return list.filter((plt) => {
    let val = plt[keyName].toLowerCase();
    if (val.includes(req.query[queryName].toLowerCase())){
      return true;
    } else if (val.includes(req.query[queryName].toLowerCase())){
      return false
    };
  })
};

const matchText = (list,req,queryName,keyName) => {
  return list.filter((plt) => plt[keyName] === req.query[queryName] ? true : false); 
}

const between = (list, req) => {
  return list.filter((plt) => {
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
    if (req.params.myList==="true" && req.params.mainList==="false" && req.params.counter==='false') {
      res.status(200).send(myList);
    };
    if (req.params.mainList==="true" && req.params.myList==="false" && req.params.counter==='false') {
      let result = [...masterPlantList]; 
      if (req.query.botName) {
        result = [...filterText(result,req,"botName","botanical_name")]; 
      };
      if (req.query.comName) {
        result = [...filterText(result,req,"comName","common_name")];
      };
      if (req.query.sun) {
        result = [...matchText(result,req,"sun","sun")];
      };
      if (req.query.blmTime) {
        result = [...matchText(result,req,"blmTime","bloom_time")];
      };
      if (req.query.maxHeight || req.query.minHeight) {
        result = [...between(result,req)]; 
      };
      if (req.query.moisture) {
        console.log(req.query.moisture)
        result = [...matchText(result,req,"moisture","moisture")];
      };
      res.status(200).send(result);

    } else if (req.params.myList === req.params.mainList && req.params.counter==='false') {
      res.status(200).send(masterPlantList);
    } else if (req.params.counter==='true') {
      res.status(200).send({
        numESpring:Number.parseInt(numESpring),
        numLSpring:Number.parseInt(numLSpring),
        numSummer: Number.parseInt(numSummer),
        numFall: Number.parseInt(numFall)
      });
    }
  },
  patch: (req, res) => {
    if (req.params.myKey) {
      myList.forEach((plt) => plt.id.toString() === req.params.myKey ? plt.project_notes = req.body.project_notes : null);
      res.status(200).send(myList);
    } else if (!req.params.myKey) {
      res.status(406).send(myList)
    };
  },
  put: (req,res)=> {
    switch (req.params.counterName) {
      case 'numESpring':
        numESpring=req.body.count;
        res.status(200).send(`${numESpring}`)
        break
      case "numLSpring":
        numLSpring=req.body.count;
        res.status(200).send(`${numLSpring}`)
        break
      case "numSummer":
        numSummer=req.body.count; 
        res.status(200).send(`${numSummer}`)
        break
      case "numFall":
        numFall=req.body.count;
        res.status(200).send(`${numFall}`)
        break
      default:
        console.log('test')
        res.status(406).send("Invalid List Name")
        break
      }
    },
  delete: (req,res)=> {
    if (req.params.key) {
      let ind = myList.findIndex(plt=> plt.id.toString()===req.params.key ? true : false);
      myList.splice(ind,1); 
      res.status(200).send(myList);
    } else {res.status(406).send(myList);}; 
  }
};
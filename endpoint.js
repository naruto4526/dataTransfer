const express = require('express');
const fsPromises = require('fs').promises;
const path = require('path');


router = express.Router();


router.route('/').post((req,res) => {
  let data = req.body.updates;
  const addData = async (data) => {
    fsPromises.readFile(path.join(__dirname,'data','personInfo.txt'),'utf-8').then((informationArray) => {
      informationArray = informationArray.split(',');
      
      const personObj = {
        name:informationArray[0],
        age:informationArray[1],
        gender:informationArray[2],
        fileName:informationArray.join('_'),
        Hb: 0,
        RBC: 0,
      }
    let personsRecord = require('./data/personsRecord');

    personsRecord.push(personObj);
    const filename = informationArray.join('_');
    console.log(filename);
    personsRecord = personsRecord.map((person)=>JSON.stringify(person));
    fsPromises.appendFile(path.join(__dirname,'data','raw_data',`${filename}.json`),data);
    fsPromises.writeFile(path.join(__dirname,'data','personsRecord.json'),'[' + personsRecord.join(',') +']');
    }).then(() => {
      console.log('Data has been updated.');
    })
  }
  addData(data).then(()=> {
    res.json({message:'request recieved'})
  });
})


router.route('/').get((req,res) => {
  res.json({message:"what da gomma"})
})
module.exports = router;

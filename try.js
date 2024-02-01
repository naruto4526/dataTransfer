const fsPromises = require('fs').promises;
const path = require('path');
const persons = require('./data/personsRecord.json');


for (let p of persons) {
  console.log(p.name);
  fsPromises.readFile(path.join('data','raw_data',p.fileName +'.json'),'utf-8').then((data) =>console.log(data))
  .catch((err) => console.log(err));
} 
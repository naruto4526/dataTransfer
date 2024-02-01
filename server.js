const express = require('express');

const app = express();




app.use(express.json());

//inside function, I will create a directory if it is not there, called data.
//inside data, there will be two more directories and one file. The file will contain, the information about the person.
//this file is used to name the files in the subdirectories. One subdirectory is for raw data and the other subdirectory is for truth values. We can store the data in json format itself. Let it be an array of json data for each person.
app.use('/',require('./endpoint.js'));


 
app.listen(8080, ()=>console.log("server is listening at: 8080"));

//json object received will look like:

// [ {}, {}, {}, {}] if timestamps are required...

// { red : num, ir :num, time : {} }

//once this request has been received and saved in variable,
//fire off the readLine event
//This will ask user for some input, this input will then be
//used as filename for the data we received.
const express = require('express');
const app = express();
app.use(express.json());
app.use('/',require('./endpoint.js'));
app.listen(8080, ()=>console.log("server is listening at: 8080"));

/* 

JSON object structure: 

headers,

body,
 {
  updates: [
    {
      Red:,
      IR:,
    },
    {
      Red:,
      IR:,
    }
  ]

 }

*/

/*
Steps:
1. Press Ctrl + ` until a terminal opens up.
2. Change into the localServer directory.
3. Run the following command : 'node server.js'
4. Open a different terminal and then run 'https://key-piglet-whole.ngrok-free.app 8080'
4. Open personinfo.txt and delete it's contents
5. Enter information about the volunteer in the name,age,gender format, in personInfo.txt
6. Have the person place their finger on the sensor, and then press the button.
7. Verify the contents in raw_data, and the personsRecord.json
8. Repeat steps 4 to 7.

*/
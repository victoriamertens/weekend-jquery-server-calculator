//Set the Port
let PORT = 5000;
//Start Express
let express = require('express');
let app = express();
app.use(express.static('public'));
app.listen(PORT, () => console.log('server is running'));
//Start Body Parser
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//GLOBAL VARIABLES

let calculatorHistory = [];
let returnData = [];

//GET and POST and DELETE FUNCTIONS

//POST /calculate
//push data object into the calculatorHistory array
//app.sendStatus(200);

// GET /calculate
app.get('/calculate', (req, res) => {
  console.log('in GET /calculate');
  //set returnData to empty array
  //returnData = [];
  //grab the information from the calculatorHistory.length-1 index
  //let currentInput = calculatorHistory[calculatorHistory.length-1];
  //evaluate the answer without eval
  //push answer to the 0 index of returnData
  //loop over calculator history, push into return data
  //response is returnData
});

//PROCESSING FUNCTIONS

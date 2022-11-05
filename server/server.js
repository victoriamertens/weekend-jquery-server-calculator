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
app.post('/calculate', (req, res) => {
  console.log(req.body);
  calculatorHistory.push(req.body);
  res.sendStatus(200);
});

// GET /calculate
app.get('/calculate', (req, res) => {
  console.log('in GET /calculate');
  //set returnData to empty array
  returnData = [];
  if (calculatorHistory.length === 0) {
    res.send([{ answer: 0 }]);
  } else {
    let inputsToCalculateObject =
      calculatorHistory[calculatorHistory.length - 1];
    console.log('current calculation data is:', inputsToCalculateObject);
    //evaluate the answer without eval
    evaluateExpression(inputsToCalculateObject);
    //push answer to the 0 index of returnData
    //loop over calculator history, push into return data
    //response is returnData
  }
});

//PROCESSING FUNCTIONS

function evaluateExpression(inputsObject) {
  let number1 = Number(inputsObject.num1);
  let number2 = Number(inputsObject.num2);
  let math = {
    '+': function (x, y) {
      return x + y;
    },
    '-': function (x, y) {
      return x - y;
    },
    '*': function (x, y) {
      return x * y;
    },
    '/': function (x, y) {
      return x / y;
    },
  };
  let answer = math[inputsObject.operator](number1, number2);
  console.log(answer);
}

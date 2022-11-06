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

//GET and POST FUNCTIONS

//POST '/calculate'
app.post('/calculate', (req, res) => {
  calculatorHistory.push(req.body);
  res.sendStatus(200);
});

// GET '/calculate'
app.get('/calculate', (req, res) => {
  //for initial render, let response be answer: 0
  if (calculatorHistory.length === 0) {
    res.send([{ answer: 0 }]);
  } else {
    //If a post has completed and there is calculator history
    let returnData = [];
    let expression = calculatorHistory[calculatorHistory.length - 1].expression;
    answer = evaluateExpression(expression);
    returnData.push(answer);
    //loop over calculator history, push into return data
    for (let i = 0; i < calculatorHistory.length; i++) {
      returnData.push(calculatorHistory[i]);
    }
    //Send back the return data with answer on index 0, and history after
    res.send(returnData);
  }
});

//PROCESSING FUNCTIONS

function evaluateExpression(stringExpression) {
  //Check to see if each operator exists (indexOf is greater than -1)
  let operatorIndex = 0;
  let indexOfPlus = stringExpression.indexOf('+');
  let indexOfMinus = stringExpression.indexOf('-');
  let indexOfDivide = stringExpression.indexOf('/');
  let indexOfMultiply = stringExpression.indexOf('*');

  //Set the operator to a variable, by looping through all options
  if (indexOfMinus !== -1) {
    operatorIndex = indexOfMinus;
  } else if (indexOfPlus !== -1) {
    operatorIndex = indexOfPlus;
  } else if (indexOfMultiply !== -1) {
    operatorIndex = indexOfMultiply;
  } else if (indexOfDivide !== -1) {
    operatorIndex = indexOfDivide;
  }
  //Split the expression string into 3 pieces based on the index of the operator
  let firstNum = stringExpression.slice(0, operatorIndex);
  let operator = stringExpression.slice(operatorIndex, operatorIndex + 1);
  let secondNum = stringExpression.slice(
    operatorIndex + 1,
    operatorIndex.length
  );
  //run a math function to evaluate the expression
  let answer = mathFunction(firstNum, operator, secondNum);
  //return an object with property answer and the value of the evaluated expression
  return { answer: answer };
}

function mathFunction(firstNum, operator, secondNum) {
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
  let answer = math[operator](Number(firstNum), Number(secondNum));
  return answer;
}

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

//GET and POST and DELETE FUNCTIONS

//POST /calculate
app.post('/calculate', (req, res) => {
  console.log(req.body);
  calculatorHistory.push(req.body);
  console.log('history:', calculatorHistory);
  res.sendStatus(200);
});

// GET /calculate
app.get('/calculate', (req, res) => {
  console.log('in GET /calculate');
  //set returnData to empty array

  if (calculatorHistory.length === 0) {
    res.send([{ answer: 0 }]);
  } else {
    let returnData = [];
    let expression = calculatorHistory[calculatorHistory.length - 1].expression;
    console.log('current calculation data is:', expression);
    //evaluate the answer without eval
    answer = evaluateExpression(expression);
    returnData.push(answer);
    console.log('returnData:', returnData);
    //loop over calculator history, push into return data
    for (let i = 0; i < calculatorHistory.length; i++) {
      returnData.push(calculatorHistory[i]);
    }
    console.log('return data:', returnData);
    res.send(returnData);
  }
});

//PROCESSING FUNCTIONS

function evaluateExpression(incomingExpression) {
  console.log(incomingExpression);
  let expressionIndex = incomingExpression.indexOf('+');
  let firstNum = incomingExpression.slice(0, expressionIndex);
  let operator = incomingExpression.slice(expressionIndex, expressionIndex + 1);
  let secondNum = incomingExpression.slice(
    expressionIndex + 1,
    expressionIndex.length
  );
  console.log(firstNum, 'break', operator, 'break', secondNum);

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
  console.log(answer);
  return { answer: answer };
}

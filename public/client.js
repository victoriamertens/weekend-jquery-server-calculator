//on document load run onReady
$(document).ready(onReady);

function onReady() {
  console.log('in onReady');
  //renderFunction();
  $('.operator').on('click', operatorCapture);
  // $('#equals-btn').on('click', calculateInputs);
  // $('#clear-btn').on('click', renderFunction);
}

//render function
//clear history
//GET function, /calculate
//will need to return history AND answer
//response will be used to append to DOM
//clear inputs (can be used for clear button too)

let operator = '';

function operatorCapture() {
  operator = $(this).text();
  console.log(operator);
}
//operatorCapture
// operator = $(this).text ();

//calculateInputs
//ajax POST request, /calculate
// data includes operator capture and inputs
//returns response of status code
//then GET request of renderFunction
//dont forget the catch statements

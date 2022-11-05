//on document load run onReady
$(document).ready(onReady);

function onReady() {
  console.log('in onReady');
  renderFunction();
  $('.operator').on('click', operatorCapture);
  $('#equals-btn').on('click', calculateInputs);
  // $('#clear-btn').on('click', renderFunction);
}

//render function
function renderFunction() {
  //clear history
  $('#history').empty();
  //GET function, /calculate
  $.ajax({
    method: 'GET',
    url: '/calculate',
  }).then(function (response) {
    console.log('render returned from server:', response);
    $('#answer').append(`
    <h1>${response[0].answer}</h1>
    `);
    if (response.length === 1) {
      console.log('no history to append');
    } else {
    }
  });
  //will need to return history AND answer
  //response will be used to append to DOM
  //clear inputs (can be used for clear button too)
}

let operator = '';

function operatorCapture() {
  operator = $(this).text();
  console.log(operator);
}

function calculateInputs() {
  //ajax POST request, /calculate
  $.ajax({
    method: 'POST',
    url: '/calculate',
    data: {
      num1: $('#input-1').val(),
      operator: operator,
      num2: $('#input-2').val(),
    },
  }).then(function (response) {
    console.log(response);
    renderFunction();
  });
  // data includes operator capture and inputs
  //returns response of status code
  //then GET request of renderFunction
  //dont forget the catch statements
}

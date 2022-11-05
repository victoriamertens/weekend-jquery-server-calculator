//on document load run onReady
$(document).ready(onReady);

function onReady() {
  console.log('in onReady');
  renderFunction();
  $('.operator').on('click', operatorCapture);
  $('#equals-btn').on('click', checkInputs);
  $('#clear-btn').on('click', clearClickFunction);
}
let operator = '';

//render function
function renderFunction() {
  //clear history
  $('#history').empty();
  $('#answer').empty();
  //GET function, /calculate
  $.ajax({
    method: 'GET',
    url: '/calculate',
  })
    .then(function (response) {
      console.log('render returned from server:', response);
      $('#answer').append(`
    <h1>${response[0].answer}</h1>
    `);
      if (response.length === 1) {
        console.log('no history to append');
      } else {
        for (let i = 1; i < response.length; i++) {
          $('#history').append(
            `
        <li>${response[i].num1} ${response[i].operator} ${response[i].num2} = ${response[i].answer}</li>
        `
          );
        }
      }
    })
    .catch(function (error) {
      alert('Error:Check inputs', error);
    });
  //clear inputs (can be used for clear button too)
  $('#input-1').val('');
  $('#input-2').val('');
}

function operatorCapture() {
  operator = $(this).text();
  console.log(operator);
}

function checkInputs() {
  if (operator === '') {
    alert('Need to select an operator');
  } else {
    calculateInputs();
  }
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

function clearClickFunction() {
  console.log('in click function');
  $('#input-1').val('');
  $('#input-2').val('');
  $('#answer').empty();
  $('#answer').append(`
    <h1>0</h1>
    `);
}

//on document load run onReady
$(document).ready(onReady);

function onReady() {
  console.log('in onReady');
  renderFunction();
  $('.input-btn').on('click', updateInput);
  $('#equals-btn').on('click', checkInputs);
  $('#clear-btn').on('click', clearClickFunction);
}

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
      $('#answer').append(`
    <h1>${response[0].answer}</h1>
    `);
      for (let i = 1; i < response.length; i++) {
        $('#history').append(
          `<li>${response[i].expression} </li>
            `
        );
      }
    })
    .catch(function (error) {
      alert('Error:Check inputs', error);
    });
  //clear inputs (can be used for clear button too)
  $('#input-1').val('');
  $('#input-2').val('');
}
let calculation = '';
function updateInput() {
  calcButtonValue = $(this).text();
  calculation = calculation.concat('', calcButtonValue);
  $('.input-btn').removeClass('selected-btn');
  $(this).addClass('selected-btn');
  $('#num-input').val(calculation);
}

function checkInputs() {
  if (calculation.includes('+')) {
    calculateInputs();
  } else if (calculation.includes('-')) {
    calculateInputs();
  } else if (calculation.includes('*')) {
    calculateInputs();
  } else if (calculation.includes('/')) {
    calculateInputs();
  } else {
    alert('Need to select an operator');
  }
}

function calculateInputs() {
  //ajax POST request, /calculate
  $.ajax({
    method: 'POST',
    url: '/calculate',
    data: {
      expression: calculation,
    },
  }).then(function (response) {
    renderFunction();
  });
  // data includes operator capture and inputs
  //returns response of status code
  //then GET request of renderFunction
  //dont forget the catch statements
}

function clearClickFunction() {
  calculation = '';
  $('#num-input').val('');
  $('#answer').empty();
  $('#answer').append(`
    <h1>0</h1>
    `);
  $('.input-btn').removeClass('selected-btn');
}

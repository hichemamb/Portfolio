var input = document.querySelector('.input');
var maj = document.querySelector('.maj');
var number = document.querySelector('.number');
var carspe = document.querySelector('.carspe');
var carac = document.querySelector('.carac');
var box = document.querySelector('.box');


var uppercase = /[A-Z]/g;
var numbers = /[0-9]/g;
var specialChars = /[!@#$%^&*(),.?":{}|<>]/g;

input.addEventListener('input', function() {

  box.style.display = 'block';


  if (input.value.match(uppercase)) {
    maj.style.color = 'green';
  } else {
    maj.style.color = 'red';
  }

  if (input.value.match(numbers)) {
    number.style.color = 'green';
  } else {
    number.style.color = 'red';
  }

  if (input.value.length >= 8) {
    carac.style.color = 'green';
  } else {
    carac.style.color = 'red';
  }

  if (input.value.match(specialChars)) {
    carspe.style.color = 'green';
  } else {
    carspe.style.color = 'red';
  }

})

input.addEventListener('blur', function() {
  box.style.display = 'none';
})

input.addEventListener('focus', function() {
  box.style.display = 'block';
})

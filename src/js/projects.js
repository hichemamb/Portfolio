var item = document.querySelector('.Projects-container__item');
var overlay = document.querySelector('.Projects-container__item__overlay');


item.addEventListener('mouseover',function(){
  overlay.style.display="block";
  overlay.classList.add('lightSpeedIn');
})

item.addEventListener('mouseout',function(){
  overlay.style.display="none";
  overlay.classList.remove('lightSpeedIn');
})

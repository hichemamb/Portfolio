var text = document.querySelector('.About-container-text__textTwo');

var descriptionText = new Typewriter(text, {
  cursor: '',
  loop: true,
  delay:0.2
});

descriptionText.typeString('Hichem')
.pauseFor(2000)
.deleteChars(6)
.typeString('a Junior Front-End Developer')
.pauseFor(2000)
.deleteChars(28)
.typeString('from Paris')
.pauseFor(2000)
.deleteChars(10)
.start();

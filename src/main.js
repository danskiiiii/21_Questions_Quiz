let answered = 0, currentQuestion=0, totalPoints = 0, smallPoints=0, smallAnswers=0;
let questionsArray =[];	
let questionsOrder =[];
const quiz_status = document.getElementById("quiz_info");
const quiz_body = document.getElementById("quiz_question");

function setQuestionsOrder() {
  questionsOrder.length = 0;
    for (let i=0; i<questionsArray.length; i++){ 
      questionsOrder.push(i); }
  questionsOrder.sort(randomOrder);  
  answered = 0;  currentQuestion = questionsOrder[answered];
}

function randomOrder() {  
  return (Math.round(Math.random())-0.5); }

function renderResults(){
  if ((totalPoints/answered*100) >= 50){
    quiz_status.innerHTML = "Gratulacje! Wynik powyżej 50%, ocena pozytywna."; } 
  else {quiz_status.innerHTML = "Wynik poniżej 50%, ocena negatywna."; } 
  quiz_body.innerHTML = "Ilość poprawnych: "+totalPoints+" z 21 pytań = "+(totalPoints/answered*100).toFixed(2)+'%<br>';
  quiz_body.innerHTML += '<br> <button class="btn btn-warning" onclick="location.reload()">Jeszcze raz</a> ';
  setQuestionsOrder();
  totalPoints = 0;  
}
  
function nextQuestion(){  
  answered++;  
  currentQuestion = questionsOrder[answered];
  if (answered < 21 ) {
       renderQuestion(); } 
  else { 
    renderResults(); }
}

function renderQuestion() {
  quiz_status.innerHTML = "Pytanie "+(answered+1)+" z 21";
  if (answered > 0) { quiz_status.innerHTML += '<br>Obecny wynik: '+(totalPoints/answered*100).toFixed(2)+'%'; }
  let question = questionsArray[currentQuestion][0];
  let optionA = questionsArray[currentQuestion][1];
  let optionB = questionsArray[currentQuestion][2];
  let optionC = questionsArray[currentQuestion][3];
  
  quiz_body.innerHTML = "<h4>"+question+"</h4>";
  quiz_body.innerHTML += "<button class='btn btn-info' style='width: 80px;'onclick='checkAnswer1(this.id); disableButtons1()' id='A_yes' >TAK</button> <button class='btn btn-info' style='width: 80px;'onclick='checkAnswer1(this.id); disableButtons1()' id='A_no' >NIE</button> A) "+optionA+"<br><br>";
  quiz_body.innerHTML += "<button class='btn btn-info' style='width: 80px;'onclick='checkAnswer2(this.id); disableButtons2()' id='B_yes' >TAK</button> <button class='btn btn-info' style='width: 80px;'onclick='checkAnswer2(this.id); disableButtons2()' id='B_no' >NIE</button> B) "+optionB+"<br><br>";
  quiz_body.innerHTML += "<button class='btn btn-info' style='width: 80px;'onclick='checkAnswer3(this.id); disableButtons3()' id='C_yes' >TAK</button> <button class='btn btn-info' style='width: 80px;'onclick='checkAnswer3(this.id); disableButtons3()' id='C_no' >NIE</button> C) "+optionC+"<br><br>";
}                                                                              

function checkAnswer1(answerID){ 
if ( answerID  == questionsArray[currentQuestion][4]) { quiz_body.innerHTML +="<h6 class='alert alert-success' > A) DOBRZE!</h6>"; smallPoints++; }
else { quiz_body.innerHTML +="<h6 class='alert alert-danger'> A) ŹLE.</h6>";}  
smallAnswers++;
if (smallAnswers == 3) {quiz_body.innerHTML += "<button class='btn btn-warning' onclick='nextQuestion()'>Następne pytanie</button>";
 if(smallPoints==3){totalPoints++;}
 smallPoints=0; smallAnswers=0;   }
}

function checkAnswer2(answerID){ 
if ( answerID  == questionsArray[currentQuestion][5]) { quiz_body.innerHTML +="<h6 class='alert alert-success'> B) DOBRZE!</h6>"; smallPoints++; }
else { quiz_body.innerHTML +="<h6 class='alert alert-danger'> B) ŹLE.</h6>";}
smallAnswers++;
if (smallAnswers == 3) {quiz_body.innerHTML += "<button class='btn btn-warning' onclick='nextQuestion()'>Następne pytanie</button>";
 if(smallPoints==3){totalPoints++;}
 smallPoints=0; smallAnswers=0;  }
}

function checkAnswer3(answerID){ 
if ( answerID  == questionsArray[currentQuestion][6]) { quiz_body.innerHTML +="<h6 class='alert alert-success'> C) DOBRZE!</h6>"; smallPoints++; }
else { quiz_body.innerHTML +="<h6 class='alert alert-danger'> C) ŹLE.</h6>";}
smallAnswers++;
 if (smallAnswers == 3) {quiz_body.innerHTML += "<button class='btn btn-warning' onclick='nextQuestion()'>Następne pytanie</button>";
 if(smallPoints==3){totalPoints++;}
 smallPoints=0; smallAnswers=0;  }
}

function disableButtons1(){
document.getElementById("A_yes").disabled = true; 
document.getElementById("A_no").disabled = true; 
}

function disableButtons2(){
document.getElementById("B_yes").disabled = true; 
document.getElementById("B_no").disabled = true; 
}

function disableButtons3(){
document.getElementById("C_yes").disabled = true; 
document.getElementById("C_no").disabled = true; 
}

//// https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
function loadJSON(callback) {
  let xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  // using false here, async call was resulting with an undefined array "questionsArray"
  xobj.open('GET', 'src/quiz_data.json', false);
	xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
           callback(xobj.responseText);}
        };
  xobj.send(null);  
 } 
 function init() {
 loadJSON(function(response) {
     questionsArray = JSON.parse(response);
 });
}

window.onload = function() { 
	init();
	setQuestionsOrder();
	renderQuestion();
}
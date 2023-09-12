import getDate from "./request.js";
// Quiz
const API = "https://countries-api-v7sn.onrender.com/countries?limit=250";
getDate(API)
  .then((data) => quizUpdate(data))
  .catch((err) => console.log(err, "Something went wrong"));

const flagLink = [];
let quiz = [];
let randomName = () => Math.floor(Math.random() * 250);

function quizUpdate(data) {
  data.forEach((el) => {
    flagLink.push(el);
  });
  const flag = JSON.stringify(flagLink);
  localStorage.setItem("flag", flag);
}

const svgRandomLink = JSON.parse(localStorage.getItem("flag"));
svgRandomLink.forEach((el) => {
  quiz.push(
    new Question(
      el.flags.svg,
      el.name.common,
      svgRandomLink[randomName()].name.common,
      svgRandomLink[randomName()].name.common
    )
  );
});
const answerA = document.getElementById("answerA");
const answerB = document.getElementById("answerB");
const answerC = document.getElementById("answerC");

const quizImg = document.getElementById("quiz-img__link");
// let randomFlag = Math.floor(Math.random() * 250);

// const createQues = () => {
//   let href = svgRandomLink[randomFlag];
//   quizImg.setAttribute("src", href.flags.svg);
//   let randomName = () => Math.floor(Math.random() * 250);
//   const btn = document.querySelectorAll(`.answer-btn`);

//   const arr = [href.name.common];
//   for (let i = 0; i < 3; i++) {
//     arr.push(svgRandomLink[randomName()].name.common);
//   }
//   btn.forEach((answs, i) => {
//     // answs.textContent = arr[i];
//   });
// };
// createQues();
// document.addEventListener("click", (e) => {
//   const selectAnswer = e.target.textContent;
//   if (selectAnswer == svgRandomLink[randomFlag].name.common) {
//     natija.classList.remove("hidden");
//     natija.textContent = `TO'G'RI`;
//   } else {
//     natija.classList.remove("hidden");
//     natija.textContent = `XATO`;
//   }
//   setTimeout(() => {
//     // let random = Math.floor(Math.random() * 250);
//     // quizImg.setAttribute("src", svgRandomLink[random].flags.svg);
//     natija.classList.add("hidden");
//     createQues();
//   }, 500);
// });

//variables
// let testquiz = [];
// testquiz[0] = new Question("What is 2-2?", "0", "2", "4");

let randomQuestion;
let answers = [];
const natija = document.getElementById("natija-text");

document.addEventListener("DOMContentLoaded", (e) => {
  btnProvideQuestion();
});

function Question(question, rightAnswer, wrongAnswer1, wrongAnswer2) {
  this.question = question;
  this.rightAnswer = rightAnswer;
  this.wrongAnswer1 = wrongAnswer1;
  this.wrongAnswer2 = wrongAnswer2;
}

function btnProvideQuestion() {
  let randomNumber = Math.floor(Math.random() * quiz.length);
  randomQuestion = quiz[randomNumber]; //getQuestion
  // randomQuestion = testquiz[randomNumber]; //test

  // randomQuestion = testquiz; //test
  answers = [
    randomQuestion.rightAnswer,
    randomQuestion.wrongAnswer1,
    randomQuestion.wrongAnswer2,
  ];
  let first = answers[0];
  let second = answers[1];
  let end = answers[2];

  let index = Math.floor(Math.random() * 6);
  let randomObj = {
    0: answers,
    1: answers,
    2: [first, end, second],
    3: [end, first, second],
    4: [end, second, first],
    5: [second, first, end],
    6: [second, end, first],
  };

  quizImg.setAttribute("src", randomQuestion.question); //link
  answerA.value = randomObj[index][0]; //a
  answerA.textContent = randomObj[index][0];
  answerB.value = randomObj[index][1]; //b
  answerB.textContent = randomObj[index][1];
  answerC.value = randomObj[index][2]; //c
  answerC.textContent = randomObj[index][2];
}

function clickAnswA() {
  let answer = this.value;
  checkAnswer(answer);
}

function clickAnswB() {
  let answer = this.value;
  checkAnswer(answer);
}
function clickAnswC() {
  let answer = this.value;
  checkAnswer(answer);
}
let showRightAnswer = document.getElementsByClassName("about-country__name")[0];
function checkAnswer(answer) {
  if (answer == randomQuestion.rightAnswer) {
    natija.classList.remove("hidden");
    setTimeout(() => {
      natija.classList.add("hidden");
      btnProvideQuestion();
    }, 3000);
    natija.textContent = `TO'G'RI`;
  } else {
    showRightAnswer.textContent += `Javob:${randomQuestion.rightAnswer}`;
    natija.classList.remove("hidden");
    setTimeout(() => {
      natija.classList.add("hidden");
      showRightAnswer.textContent = "To'g'ri javobni tanlang";

      btnProvideQuestion();
    }, 3000);
    natija.textContent = `XATO`;
  }
}

answerA.addEventListener("click", clickAnswA);
answerB.addEventListener("click", clickAnswB);
answerC.addEventListener("click", clickAnswC);

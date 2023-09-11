import getDate from "./request.js";
// Quiz
const API = "https://countries-api-v7sn.onrender.com/countries?limit=250";
getDate(API)
  .then((data) => quizUpdate(data))
  .catch((err) => console.log(err, "Something went wrong"));

  const flagLink = []
  let svg;
  function quizUpdate(data){
    data.forEach((el)=>{
      flagLink.push(el.flags.svg)
    })
    const flag = JSON.stringify(flagLink)
     svg = localStorage.setItem("flag", flag);
    
  }
  let retString = localStorage.getItem("flag")
  let svgRandomLink = JSON.parse(retString)
 
let randomFlag=Math.floor(Math.random()*250)
const quizImg = document.getElementById('quiz-img__link');
quizImg.setAttribute('src',svgRandomLink[randomFlag])

const btn = document.getElementById(`answer`)
btn.addEventListener('click',(e)=>{
  
  
  quizImg.setAttribute('src',svgRandomLink[randomFlag])

})
for(let i =0 ; i<4;i++){

}


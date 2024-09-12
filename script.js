const questions = [
    {
        question : "Java is part of 'javascript'.",
        answer : [
            {text: "True", correct: "false"},
            {text: "False", correct: "true"},
            {text: "Both A & B", correct: "false"},
            {text: "none of these", correct: "false"},
        ]
    },
    {
        question : "which data type is used to create a variable that should store text ?",
        answer : [
            {text: "int", correct: "false"},
            {text: "string", correct: "false"},
            {text: "text", correct: "false"},
            {text: "String", correct: "true"},
        ]
    },
    {
        question : "How do you create a variable with the numeric value 5?",
        answer : [
            {text: "float x = 5; ", correct: "false"},
            {text: "x = 5", correct: "false"},
            {text: "int x = 5;", correct: "true"},
            {text: "num x = 5;", correct: "false"},
        ]
    },
    {
        question : "Which method can be used to find the length of a string ?",
        answer : [
            {text: "length()", correct: "true"},
            {text: "len()", correct: "false"},
            {text: "size()", correct: "false"},
            {text: "getlength()", correct: "false"},
        ]
    },
    {
        question : "Which operator is used to compare two values?",
        answer : [
            {text: "==", correct: "true"},
            {text: "=", correct: "false"},
            {text: "><", correct: "false"},
            {text: "<>", correct: "false"},
        ]
    }
       
]

// ********get all the dom control*****

const questionElement = document.querySelector("#question");
const answerbutton = document.querySelector("#answer-button");
const nextbutton = document.querySelector("#next-btn");
const hidebutton = document.querySelector("#hide-btn");

let currentQuestionIndex = 0;
let score = 0;

// ******StratQuize Function ********

function startQuiz(){
    
    let currentQuestionIndex = 0;
    let score = 0;

    nextbutton.innerHTML="Next";
    showQuestion();
}

//******ShowQuestion Function ********

function showQuestion(){

    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answer.forEach((answer)=>{
        let button = document.createElement("button");
        button.classList.add("btn");
        button.innerHTML = answer.text;
        answerbutton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function selectAnswer(e){

    let selectbtn = e.target;
    const isCorrect = selectbtn.dataset.correct ==="true";

    if(isCorrect){
        selectbtn.classList.add("correct");
        score++;
    }else{
        selectbtn.classList.add("incorrect");
    }

    Array.from(answerbutton.children).forEach(button=>{

        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbutton.style.display="block";   
}

//******ResetState Function ********

function resetState(){
    nextbutton.style.display = "none";
    while(answerbutton.firstChild){
        answerbutton.removeChild(answerbutton.firstChild);
    }
}

//***********HandleBextButton function ********

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

//******ShowScore Function ********

function showScore(){
    resetState();

    questionElement.innerHTML =`You Scored ${score} Out Of ${questions.length}`;
    nextbutton.innerHTML = "Play Again";
    nextbutton.style.display ="block";
}

nextbutton.addEventListener("click", ()=>{
        if(currentQuestionIndex < questions.length){
            handleNextButton();
        }else{
            startQuiz();
        }
});

//******StratQuize Function Calling********

startQuiz();

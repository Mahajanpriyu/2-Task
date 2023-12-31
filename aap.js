const questions =[
    {
        question: "What is the full form of html?",
        answers:[
            {text: "HyperText Markup Language",correct: true},
            {text: "HighText Markup Language",correct: false},
            {text: "HyperText Markdown Language",correct: false},
            {text: "None of the above",correct: false},
        ]
    },
    {
        question: "What is the smallest header in html by default?",
        answers:[
            {text: "h1",correct: false},
            {text: "h4",correct: false},
            {text: "h6",correct: true},
            {text: "h5",correct: false},
        ]
    },
    {
        question: "We enclose HTML tags within?",
        answers:[
            {text: "{}",correct: false},
            {text: "<>",correct: true},
            {text: "!!",correct: false},
            {text: "None of the above",correct: false},
        ]
    },
    {
        question: "What is the full form of css?",
        answers:[
            {text: "color and Style Sheets",correct: false},
            {text: "Coloured Style Sheets",correct: false},
            {text: "Cascading Style Sheets",correct: true},
            {text: "None of above",correct: false},
        ]
    },
    {
        question: "How can we change the text color of an element?",
        answers:[
            {text: "Color",correct: true},
            {text: "background-color",correct: false},
            {text: "Both A and B",correct: false},
            {text: "None of above",correct: false},
        ]
    }
];

const questionElement =document.getElementById("question");
const answerButton =document.getElementById("answer-button");
const nextButton =document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function  showQuestion(){
    resetState();
    let  currentQuestion = questions[ currentQuestionIndex];
    let questionNo =  currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button =document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} Out of ${questions.length}!`;

    nextButton.innerHTML="Play Again";
    nextButton.style.display ="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz()
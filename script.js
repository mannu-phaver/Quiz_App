const questions = [
    {
        question: "India is great country",
        answers: [
            { text: "True", correct: true },
            { text: "False", correct: false }
        ]
    },
    {
        question: "India is great country",
        answers: [
            { text: "True", correct: true },
            { text: "False", correct: false }
        ]
    },
    {
        question: "India is great country",
        answers: [
            { text: "True", correct: true },
            { text: "False", correct: false }
        ]
    },
    {
        question: "India is great country",
        answers: [
            { text: "True", correct: true },
            { text: "False", correct: false }
        ]
    },
    {
        question: "India is great country",
        answers: [
            { text: "True", correct: true },
            { text: "False", correct: false }
        ]
    },
    {
        question: "India is great country",
        answers: [
            { text: "True", correct: true },
            { text: "False", correct: false }
        ]
    },
    {
        question: "India is great country",
        answers: [
            { text: "True", correct: true },
            { text: "False", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


// first it will be here
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    // goest to this showquestion function
    showQuestion();
}

function resetState() {
    
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("bttn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        // Adding click functionality. 
        button.addEventListener("click",selectAnswer);
    });
}
function selectAnswer(e) {
    const selectBtn=e.target;
    const isCorrect=selectBtn.dataset.correct ==="true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    // To add green color for the correct answer after selected once.
    Array.from(answerButtons.children).forEach(button =>{

        if(button.dataset.correct ==="true"){
            // add green color once a wrong option selected.
            button.classList.add("correct");
        }
        button.disabled = true;
        // button.classList.add("correct");
    });
     // Store response (index of selected button: 0 for True, 1 for False)
    responses[currentQuestionIndex] = Array.from(answerButtons.children).indexOf(selectBtn);
    localStorage.setItem('quizResponses', JSON.stringify(responses));
    localStorage.setItem('quizScore', score);
    nextButton.style.display= "block";
}

function showScore(){
    resetState();
    // to display score 
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML ="Play Again";
    nextButton.style.display= "block";
        // Clear localStorage for a fresh start
    localStorage.removeItem('quizResponses');
    localStorage.removeItem('quizCurrentQuestionIndex');
    localStorage.removeItem('quizScore');
}

// function to handle next button
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
      // Store currentQuestionIndex
    localStorage.setItem('quizCurrentQuestionIndex', currentQuestionIndex);
}


// function for next button

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();
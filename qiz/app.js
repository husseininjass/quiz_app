//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "0",
    question: "What is JavaScript primarily used for??",
    options: [
      " Styling web pages",
      "Adding interactivity and dynamic content to web pages",
      "Creating database management systems",
      "Building operating systems",
    ],
    correct: "Adding interactivity and dynamic content to web pages",
  },
  {
    id: "1",
    question: "How do you check the data type of a variable in JavaScript?",
    options: [
      "typeof variableName",
      "checkType(variableName)",
      "typeOf(variableName)",
      "dataType(variableName)",
    ],
    correct: "typeof variableName",
  },
  {
    id: "2",
    question:
      "Which keyword is used to declare a constant variable in JavaScript?",
    options: ["let", "var", "const", "set"],
    correct: "const",
  },
  {
    id: "3",
    question: "How can you create an object in JavaScript?",
    options: [
      "var obj = new Object();",
      "var obj = {};",
      "var obj = Object.create({})",
      "All of the above",
    ],
    correct: "All of the above",
  },
  {
    id: "4",
    question: "What type of language is JavaScript?",
    options: [
      "Compiled language",
      "Interpreted language",
      "Assembly language",
      "Machine language",
    ],
    correct: "Interpreted language",
  },
  {
    id: "5",
    question: "Which of the following is NOT a JavaScript data type?",
    options: [" String", " Float", "Boolean", "Array"],
    correct: "Float",
  },
  {
    id: "6",
    question:
      "Which function is used to print content to the browser's developer console?",
    options: ["console.log()", "print()", "log())", "debug()"],
    correct: "console.log()",
  },

  {
    id: "7",
    question: "The '===' operator in JavaScript checks for:",
    options: [
      "Value equality only",
      "Type equality only",
      "Value and type equality",
      "None of the above",
    ],
    correct: "Value and type equality",
  },

  {
    id: "8",
    question: "What is the purpose of the 'this' keyword in JavaScript?",
    options: [
      "It refers to the current HTML element.",
      "It refers to the previous function in the call stack.",
      "It refers to the current object in the context.",
      "It refers to the global window object.",
    ],
    correct: "It refers to the current object in the context.",
  },

  {
    id: "9",
    question:
      " Which built-in method is used to convert a string to all lowercase letters?",
    options: [
      "toLowerCase()",
      "lowerCase()",
      "changeCase('lower')",
      "allLowerCase()",
    ],
    correct: "toLowerCase",
  },
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
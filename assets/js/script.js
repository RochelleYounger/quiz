// quiz info
var quizObjects = [
    {
        question: "A spider has __ legs.",
        img: "",
        answers: ["a) 1000", "b) 6", "c) 8", "d) 10"],
        correct: "c) 8",
    },
    {
        question: "A spider has __ eyes.",
        img: "",
        answers: ["a) 4", "b) 2", "c) 7", "d) 8"],
        correct: "d) 8",
    },
    {
        question: "Spiders have two main body parts: the _________ and the _________.",
        img: "",
        answers: ["a) cephalothorax, abdomen", "b) head, cephalothorax", "c) pronotoum, abdomen", "d) mandibles, sting"],
        correct: "a) cephalothorax, abdomen",
    },
    {
        question: "Except for one small family ___________, all spiders have venom which they inject into prey through their fangs to digest them.",
        img: "",
        answers: ["a) Agelenidae", "b) Theraphosidae", "c) Salticidae", "d) Uloboridae"],
        correct: "d) Uloboridae",
    },
    {
        question: "Jumping spiders don't build webs.",
        img: "",
        answers: ["a) true", "b) false", "c) I don't know.", "d) yes and no"],
        correct: "a) true",
    },
    {
        question: "Lucas the Spider is a jumping spider.",
        img: "",
        answers: ["a) true", "b) false", "c) I don't know.", "d) yes and no"],
        correct: "a) true",
    },
    {
        question: "There is a species of herbivore(ish) jumping spiders that are found in Central America. It's name is ____________",
        img: "",
        answers: ["a) Ero furcata", "b) Bagheera kiplingi", "c) Phidippus pius", "d) Plexippus paykulli"],
        correct: "",
    },
    {
        question: "The scientific name for spiders is _________",
        img: "",
        answers: ["a) Spider", "b) Anarae", "c) Araignée", "d) Araneae"],
        correct: "d) Aranae",
    },
    {
        question: "The full scientific classification for spiders is: Kingdom-________, Phylum-_________, Subphylum-_________, Class-__________, Order-__________",
        img: "",
        answers: ["a) Arthropoda, Chelicerata, Animalia, Arachnida, Araneae", "b) Animalia, Arthropoda, Chelicerata, Arachnida, Araneae", "c) Animalia, Chelicerata, Arthropoda, Arachnida, Araneae", "d) "],
        correct: "b) Animalia, Arthropoda, Chelicerata, Arachnida, Araneae",
    },
    {
        question: "Most spiders are harmful to humans.",
        img: "",
        answers: ["a) true", "b) false", "c) I don't know.", "d) yes and no"],
        correct: "b) false",
    },
    {
        question: "Extreme or irrational fear of spiders is called _____________",
        img: "",
        answers: ["a) arachnophobia", "b) arachniphobia", "c) arachnephobia", "d) arachnaphobia"],
        correct: "a) arachnophobia",
    },
];


// grab elements from page to manipulate

var firstSection = document.getElementById("quiz-intro");
var quizSection = document.getElementById("quiz-questions");
var startButton =  document.getElementById("play");
var timerEl = document.getElementById("timer");
var answerSection = document.getElementById("answer-btns");
var judgementDivEl = document.getElementById("judgement");
var judgementalText = document.getElementById("judgemental-text");

// hides cards
var hide = function() {
    firstSection.setAttribute("hidden", true)
};

// waiting until after answer is given to display judgement
var hideJudgement = function() {
    judgementDivEl.setAttribute("hidden", true)
};

var currentInterval = 0;
var time = 60;
var displayedQuestion = 0;


// starts quiz game
var play = function() {
    hide();
    quizSection.removeAttribute("hidden");

    askQuestion();

    currentInterval = setInterval(countdown, 1000);

    // time();

};

var countdown = function() {
    time--;
    // time();
    if(time < 1) {
        stop();
    }
};

// displays the countdown 
var timer = function() {
    timerEl.textContent = time;
};

var askQuestion = function() {
    var questionInfo = quizObjects[displayedQuestion];
    var answers = questionInfo.answers;

    var questionTextEl = document.getElementById("quiz-question");
    questionTextEl.textContent = questionInfo.question;

    for (var i=0; i < answers.length; i++) {
        var answer = answers[i];
        var answerBtnEl = document.getElementById("answer-btn" + i)
        answerBtnEl.textContent = answer;
    }
};

var correct = function(answerBtnEl) {
    if (answerBtnEl.textContent === quizObjects[displayedQuestion].correct) {
        return true;
    } else {
        return false
    }
};

var answerCheck = function(event) {
    var clickedAnswer = event.target;
    judgementDivEl.removeAttribute("hidden");
    if (correct(clickedAnswer)) {
        console.log("right")
        judgementalText = "Satisfactory";
        setTimeout(hideJudgement, 1000);
    } else {
        console.log("wrong")
        judgementalText = "Failure :|";
        setTimeout(hideJudgement, 1000);
        if(time >= 6) {
            time = time - 6;
        } else {
            time =0;
            stop();
        }
    }

    displayedQuestion++;
    if(displayedQuestion < quizObjects.length) {
        askQuestion();
    } else {
        stop();
    }
}

var stop = function() {
    clearInterval(currentInterval);
    hide();
    console.log("gameOver")
}


// event listeners on dom objects
// start the game
startButton.addEventListener("click", play);
// answering
answerSection.addEventListener("click", answerCheck)

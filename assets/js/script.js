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
        correct: "b) Bagheera kiplingi",
    },
    {
        question: "The scientific name for spiders is _________",
        img: "",
        answers: ["a) Spider", "b) Anarae", "c) Araignée", "d) Araneae"],
        correct: "d) Araneae",
    },
    {
        question: "The full scientific classification for spiders is: Kingdom-________, Phylum-_________, Subphylum-_________, Class-__________, Order-__________",
        img: "",
        answers: ["a) Arthropoda, Chelicerata, Animalia, Arachnida, Araneae", "b) Animalia, Arthropoda, Chelicerata, Arachnida, Araneae", "c) Animalia, Chelicerata, Arthropoda, Arachnida, Araneae", "d) Chelicerata, Arthropoda, Animalia, Araneae, Arichnida"],
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
    {
        question: "Spiders are awesome.",
        img: "",
        answers: ["a) true", "b) false", "c) I don't know.", "d) yes and no"],
        correct: "a) true",
    },
];


// grab elements from page to manipulate

var firstSection = document.getElementById("quiz-intro");
var quizSection = document.getElementById("quiz-questions");
var gameOverSection = document.getElementById("quiz-gameover")
var highscoresSection = document.getElementById("quiz-highscores")
var startButton =  document.getElementById("play");
var timerEl = document.getElementById("timer");
var timerContainerEl = document.getElementById("timer-display")
var answerSection = document.getElementById("answer-btns");
var judgementDivEl = document.getElementById("judgement");
var judgementalText = document.getElementById("judgemental-text");
var usernameFormEl = document.getElementById("username-form");
var usernameInput = document.getElementById("username");
var usernameSubmit = document.getElementById("username-submit");
var userScore = document.getElementById("score");
var highscoreListEl = document.getElementById("highscores");
var highscoresClearBtn = document.getElementById("clear-btn");
var returnBtn = document.getElementById("return-btn");
var seeHighscoresEl = document.getElementById("see-highscores");

// hides cards
var hide = function() {
    firstSection.setAttribute("hidden", true);
    quizSection.setAttribute("hidden", true);
    gameOverSection.setAttribute("hidden", true);
    highscoresSection.setAttribute("hidden", true);
};

// waiting until after answer is given to display judgement
var hideJudgement = function() {
    judgementDivEl.setAttribute("hidden", true)
};

var currentInterval = 0;
var time = 60;
var displayedQuestion = 0;
var correctAnswers = 0;


// starts quiz game
var play = function() {
    hide();
    quizSection.removeAttribute("hidden");

    askQuestion();

    currentInterval = setInterval(countdown, 1000);

    timer();

};

var countdown = function() {
    time--;
    timer();
    if(time < 1) {
        stop();
    }
};

// displays the countdown 
var timer = function() {
    timerContainerEl.removeAttribute("hidden");
    timerEl.textContent = time;
};

var askQuestion = function() {
    var questionInfo = quizObjects[displayedQuestion];
    var responses = questionInfo.answers;

    var questionTextEl = document.getElementById("quiz-question");
    questionTextEl.textContent = questionInfo.question;

    for (var i=0; i < responses.length; i++) {
        var answer = responses[i];
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
        console.log("right");
        judgementalText = "Satisfactory";
        setTimeout(hideJudgement, 1000);
        correctAnswers++;
        console.log(correctAnswers);
    } else {
        console.log("wrong")
        judgementalText = "Failure :|";
        setTimeout(hideJudgement, 1000);
        if(time >= 6) {
            time = time - 6;
            timer();
        } else {
            time =0;
            timer();
            stop();
        }
    }

    displayedQuestion++;
    if(displayedQuestion < quizObjects.length) {
        askQuestion();
    } else {
        stop();
    }
};

var stop = function() {
    clearInterval(currentInterval);
    hide();
    gameOverSection.removeAttribute("hidden");
    console.log("gameOver")
    userScore.textContent = (correctAnswers * 100) + (time * 10);
    console.log(userScore.textContent);
    time = 60;
    timerContainerEl.setAttribute("hidden", true);
};

var grabHighscores = function() {
    var localHighscores = localStorage.getItem("highscoresArr");
    if (localHighscores !== null) {
      let highscoresArr = JSON.parse(localHighscores);
      return highscoresArr;
    } else {
      highscoresArr = [];
    }
    return highscoresArr;
};

var update = function(item) {
    var highscoresArr = grabHighscores();
    highscoresArr.push(item);
    localStorage.setItem("highscoresArr", JSON.stringify(highscoresArr));

};

var sortedHighscores = function() {
    var highscoresArr = grabHighscores();
    if (!highscoresArr) {
      return;
    }
  
    highscoresArr.sort(function (a, b) {
      return b.score - a.score;
    });
    return highscoresArr;
};

var displayHighscores = function() {
    var sortedhighscoresArr = sortedHighscores();
    highscoreListEl.innerHTML = "";
    for (let i = 0; i < sortedhighscoresArr.length; i++) {
        var highscoreEntry = sortedhighscoresArr[i];
        var listItemEl = document.createElement("li");
        listItemEl.textContent = highscoreEntry.username + " - " + highscoreEntry.score;
        highscoreListEl.append(listItemEl);
    }
};

var saveScore = function(event) {
    event.preventDefault();
    
    // validate
    if (!usernameInput.value) {
        alert("Field cannot be left empty");
        return;
    }

    // console.log(usernameInput.value);

    var scoreItemObject = {
        username: usernameInput.value,
        score: userScore.textContent,
    };

    console.log(scoreItemObject);

    update(scoreItemObject);
    hide();
    highscoresSection.removeAttribute("hidden");
    displayHighscores();

};

var clearList = function() {
    localStorage.clear();
    displayHighscores();
};

var restartQuiz = function() {
    // hide();
    // firstSection.removeAttribute("hidden");
    window.location.reload(false);
};

var viewHighscores = function() {
    hide();
    highscoresSection.removeAttribute("hidden");
    clearInterval(currentInterval);

    time = null;
    timer();

    displayHighscores();

};




// event listeners attached to dom objects
// start the game
startButton.addEventListener("click", play);
// answering
answerSection.addEventListener("click", answerCheck);
// highscore list update
usernameFormEl.addEventListener("submit", saveScore);
// clearing highscores
highscoresClearBtn.addEventListener("click", clearList);
// return to quiz intro
returnBtn.addEventListener("click", restartQuiz)
// go to highscore section
seeHighscoresEl.addEventListener("click", viewHighscores)




// var pointsAwarded = function(){
//     var points = (correctAnswers * 100) + (time * 10);
//     return points;
// }

// var stop = function() {
//     clearInterval(currentInterval);
//     hide();
//     gameOverSection.removeAttribute("hidden");
//     console.log("gameOver")
//     userScore.textContent = pointsAwarded();
//     console.log(userScore.textContent);
// };

// var saveScore = function(event) {
//     event.preventDefault();
    
//     // validate
//     if (!usernameInput.value) {
//         alert("Field cannot be left empty");
//         return;
//     }

//     var scoreItemObject = {
//         username = usernameInput.value,
//         score: pointsAwarded(),
//     };
// };
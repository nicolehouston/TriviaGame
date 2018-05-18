// Create variables
var showTimer;
var time = 20;
var timerRunning = false;
var index = 0;
var correct = 0;
var incorrect = 0;

// Create an array with question objects
var questions = [
    {q:"How many members are there in the fellowship of the ring?", a:["Eight", "Twelve", "Nine"], correctAnswer: "Nine"},
    {q:"What is the name of Elrond's daughter?", a:["Eowyn", "Arwen", "Galadriel"], correctAnswer: "Arwen"},
    {q:"How old is Bilbo Baggins turning at the beginning of the 'Fellowship of the Ring'?", a:["111", "121", "185"], correctAnswer: "111"},
    {q:"Which of the following characters was NOT a member of the fellowship of the ring?", a:["Borimir", "Farimir", "Gimli"], correctAnswer: "Farimir"},
    {q:"What is the name of the 'White City'?", a:["Gondor", "Minas Tirith", "Rohan"], correctAnswer: "Minas Tirith"},
    {q:"How many rings of power were given to the elves?", a:["Five", "Seven", "Three"], correctAnswer: "Three"},
    {q:"What is the name of the wizard who joins Sauron?", a:["Gandalf", "Radagast", "Saruman"], correctAnswer: "Saruman"},
    {q:"What was the secret word used to enter the Mines of Moria?", a:["Mellon", "Tomo", "Dwarf"], correctAnswer: "Mellon"},
    {q:"What was it that made Gandalf fall from the bridge of Khazad Dum?", a:["A Goblin", "An Orc", "A Balrog"], correctAnswer: "A Balrog"},
    {q:"Where did the people of Rohan flee to in order to escape Saruman's army?", a:["Minas Tirith", "Rivendell", "Helm's Deep"], correctAnswer: "Helm's Deep"}
];

// Create functions
function displayQuestion(){
    var question = $("<p id='question'>").text(questions[index].q);
    $(".container").append(question);
    for(var i = 0; i < questions[index].a.length; i++){
        var answerChoice = $("<p class='answer'>").text(questions[index].a[i]);
        answerChoice.val(questions[index].a[i]);
        $(".container").append(answerChoice);
    }
}

function stopTimer(){
    timerRunning = false;
    clearInterval(showTimer);
}

// Function that clears the question and answer choices to reveal the correct answer
function clearQuestion(){
    $(".answer").remove();
    $("#question").remove();

}

// Function that counts down the time for each question
function countDown(){
    $("#timeRemaining").text("Time remaining: " + time + " seconds");
    if(time === 0){
        stopTimer();
        incorrect++;
        clearQuestion();
        var revealedAnswer = $("<p id='revealAnswer'>").text("Out of time! The correct answer is: " + questions[index].correctAnswer);
        $(".container").append(revealedAnswer);
        index++;
        if(index === questions.length){
            setTimeout(restartGame, 4000);
        }
        else{
            setTimeout(startRound, 4000);
        }
    }
    time--;
}

// Function to restart game
function restartGame(){
    $("#revealAnswer").text("Want to play again?");
    $("#timeRemaining").text("Total Correct: " + correct + "   " + "Total Incorrect: " + incorrect);
    clearQuestion();
    var startOver = $("<button id='startOver'>").text("Replay");
    $(".container").append(startOver); 
    $("#startOver").click(function(){
        timerRunning = false;
        index = 0;
        correct = 0;
        incorrect = 0;
        startRound();
    }) 
}

// Create a function that begins each round with a new question and starts the timer over again
function startRound(){
    $("#startOver").remove("button");
    $("#revealAnswer").remove();
    displayQuestion();
    time = 20;
    if (!timerRunning){
        countDown();
        showTimer = setInterval(countDown, 1000);
        timerRunning = true;   
    }
}

// Function that begins the game when the user hits the start button
//========================================================================================================
$("#startButton").click(function(){
    $(".start").empty();
    startRound();
})

// This function runs when the user selects an answer choice
$(document).on("click", ".answer", function(){
    stopTimer();
    if ($(this).val() === questions[index].correctAnswer){
        correct++;
        clearQuestion();
        var revealedAnswer = $("<p id='revealAnswer'>").text("Correct! The answer is: " + questions[index].correctAnswer);
        $(".container").append(revealedAnswer);
        index++;
        if(index === questions.length){
            setTimeout(restartGame, 4000);
        }
        else{
            setTimeout(startRound, 4000);
        }
        
    }
    else {
        incorrect++;
        clearQuestion();
        var revealedAnswer = $("<p id='revealAnswer'>").text("Nope! The correct answer is: " + questions[index].correctAnswer);
        $(".container").append(revealedAnswer);
        index++;
        if(index === questions.length){
            setTimeout(restartGame, 4000);
        }
        else{
            setTimeout(startRound, 4000);
        }
    }
    
})

 
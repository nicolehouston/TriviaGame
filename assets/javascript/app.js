// Create variables
var showTimer;
var time = 20;
var timerRunning = false;
var index = 0;

// Create an array with question objects
var questions = [
    {q:"What is the name of Elrond's daughter?", a:["Eowyn", "Arwen", "Galdriel"], correctAnswer: "Arwen"},
    {q:"How old is Bilbo Baggins turning at the beginning of the 'Fellowship of the Ring'?", a:["111", "121", "185"], correctAnswer: "111"}
];

// Create functions
function displayQuestion(){
    $("#question").text(questions[index].q);
    $("#answer1").val(questions[index].a[0]);
    $("#answer1").text(questions[index].a[0]);
    $("#answer2").val(questions[index].a[1]);
    $("#answer2").text(questions[index].a[1]);
    $("#answer3").val(questions[index].a[2]);
    $("#answer3").text(questions[index].a[2]);
}

function stopTimer(){
    timerRunning = false;
    clearInterval(showTimer);
}

// Function that clears the question and answer choices to reveal the correct answer
function revealAnswer(){
    $("#question").text('');
    $("#answer1").text('');
    $("#answer2").text('');
    $("#answer3").text('');
}

function countDown(){
    $("#timeRemaining").text("Time remaining: " + time + " seconds");
    if(time === 0){
        stopTimer();
        revealAnswer();
        $("#revealAnswer").text("Out of time! The correct answer is: " + answers[index]);
        index++;
        setTimeout(startRound, 3000);
    }
    time--;
}
// Create a function that begins each round with a new question and starts the timer over again
function startRound(){
    displayQuestion();
    time = 20;
    $("#timeRemaining").text("Time remaining: " + time + " seconds");
    if (!timerRunning){
        showTimer = setInterval(countDown, 1000);
        timerRunning = true;   
    }

}

$(".answers").click(function(){
    stopTimer();
    if ($(this).val() === questions[index].correctAnswer){
        alert("hello");
    }
    
})

// Function that begins the game when the user hits the start button
//========================================================================================================
$("#startButton").click(function(){
    $(".start").empty();
    startRound();
})
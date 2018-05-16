// Create variables
var counter = 0;
var showQuestion;
var time = 30;
var timerRunning = false;

// Create an array with question objects
var questions = [
    {q:"What is the name of Elrond's daughter?", a:["Eowyn", "Arwen", "Galdriel"]},
    {q:"How old is Bilbo Baggins turning at the beginning of the 'Fellowship of the Ring'?", a:["111", "100", "185"]}
];

// Create an array with the correct answers
var answers = ["Arwen", "111"];


// Function that begins the game when the user hits the start button
$("#startButton").click(function(){
    $(".start").empty();
    startRound();
})

function nextQuestion(){
    

}

function countDown(){
    time--;
    $("#timeRemaining").text("Time remaining: " + time + "seconds");
}

function startRound(){
    if (!timerRunning){
        showQuestion = setInterval(countDown, 1000);
        timerRunning = true;
    }

}

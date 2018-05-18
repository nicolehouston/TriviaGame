// Create variables
var showTimer;
var time = 20;
var timerRunning = false;
var index = 0;
var correct = 0;
var incorrect = 0;
var unanswered = 0;

// Create an array with question objects
var questions = [
    {q:"How many members are there in the fellowship of the ring?", a:["Eight", "Twelve", "Nine"], correctAnswer: "Nine", pic:"http://ahscribbles.com/wp-content/uploads/2016/08/fellowship8.jpg"},
    {q:"What is the name of Elrond's daughter?", a:["Eowyn", "Arwen", "Galadriel"], correctAnswer: "Arwen", pic:"https://i.pinimg.com/originals/d1/e4/29/d1e429c9f3735dcb26561ca7dfba8d6e.jpg"},
    {q:"How old is Bilbo Baggins turning at the beginning of the 'Fellowship of the Ring'?", a:["111", "121", "185"], correctAnswer: "111", pic:"https://i.pinimg.com/736x/5b/2e/09/5b2e096c775038df617375ae862d8280.jpg"},
    {q:"Which of the following characters was NOT a member of the fellowship of the ring?", a:["Borimir", "Farimir", "Gimli"], correctAnswer: "Farimir", pic:"http://img3.wikia.nocookie.net/__cb20111222200551/lucerne/images/9/9a/Faramir-faramir-9716911-1024-768.jpg"},
    {q:"What is the name of the 'White City'?", a:["Gondor", "Minas Tirith", "Rohan"], correctAnswer: "Minas Tirith", pic:"https://vignette.wikia.nocookie.net/lotr/images/e/e4/Minas_Tirith.jpg/revision/latest?cb=20141228214636"},
    {q:"How many rings of power were given to the elves?", a:["Five", "Seven", "Three"], correctAnswer: "Three", pic:"https://vignette.wikia.nocookie.net/lotr/images/3/30/Los_Tres_Portadores.jpg/revision/latest?cb=20120615214351"},
    {q:"What is the name of the wizard who joins Sauron?", a:["Gandalf", "Radagast", "Saruman"], correctAnswer: "Saruman", pic:"https://vignette.wikia.nocookie.net/tolkien-films/images/8/84/SarumanTheLOTR.jpg/revision/latest?cb=20170324200825"},
    {q:"What was the secret word used to enter the Mines of Moria?", a:["Mellon", "Tomo", "Dwarf"], correctAnswer: "Mellon", pic:"https://i2.wp.com/www.simplyaharvester.com/wp-content/uploads/2017/05/door-mines-of-moria.jpg?resize=634%2C269"},
    {q:"What was it that made Gandalf fall from the bridge of Khazad Dum?", a:["A Goblin", "An Orc", "A Balrog"], correctAnswer: "A Balrog", pic:"http://img.picturequotes.com/2/294/293718/you-shall-not-pass-quote-1.jpg"},
    {q:"Where did the people of Rohan flee to in order to escape Saruman's army?", a:["Minas Tirith", "Rivendell", "Helm's Deep"], correctAnswer: "Helm's Deep", pic:"https://www.walldevil.com/wallpapers/a49/wallpapers-ancient-pixel-pictures-city-large.jpg"}
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
        unanswered++;
        clearQuestion();
        var revealedAnswer = $("<p id='revealAnswer'>").text("Out of time! The correct answer is: " + questions[index].correctAnswer);
        $(".container").append(revealedAnswer);
        var image = $("<img id='answerImage'>").attr("src", questions[index].pic);
        $(".container").append(image);
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

// Function to restart game and set everything back to zero
function restartGame(){
    $("#answerImage").remove();
    $("#revealAnswer").text("Want to play again?");
    $("#timeRemaining").text("Total Correct: " + correct + "     " + "Total Incorrect: " + incorrect + "      " + "Total Unanswered: " + unanswered);
    clearQuestion();
    var startOver = $("<button id='startOver'>").text("Replay");
    $(".container").append(startOver); 
    $("#startOver").click(function(){
        timerRunning = false;
        index = 0;
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        startRound();
    }) 
}

// Create a function that begins each round with a new question and starts the timer over again
function startRound(){
    $("#startOver").remove("button");
    $("#revealAnswer").remove();
    $("#answerImage").remove();
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
        var image = $("<img id='answerImage'>").attr("src", questions[index].pic);
        $(".container").append(image);
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
        var image = $("<img id='answerImage'>").attr("src", questions[index].pic);
        $(".container").append(image);
        index++;
        if(index === questions.length){
            setTimeout(restartGame, 4000);
        }
        else{
            setTimeout(startRound, 4000);
        }
    }
    
})

 
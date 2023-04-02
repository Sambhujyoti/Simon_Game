// Defining sequence of colours.
var buttonColours = ["red", "blue", "green", "yellow"];

// Defining default level.
var level = 0;

// Defining initial state of variable to recognize first key pressed or not.
var started = false;

// Defining empty array to include element later.
var gamePattern = [];
var userClickedPattern = [];

// Defining fuction for first time pressing a key.
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }   
});

// Creating loop for mouse click event.
$(".btn").click(function() {

// Capturing button ids and assigning a variable.
    var userChosenColour = $(this).attr('id');

// Inserting user chosen colour ids into the empty array.   
    userClickedPattern.push(userChosenColour);

// Calling function to play colour specific sound.
    playSound(userChosenColour);

// Calling function to animate the button upon pressing.
    animatePress(userChosenColour);

//Calling checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
});

// Verifying the user actions against game pattern.
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// Defining function to paly the next sequence sound after user selected button.
function nextSequence() {
    userClickedPattern = [];

// Increamenting level count by 1.
    level++;

// Change the h1 title with level.
    $("#level-title").text("Level " + level);

// Generate random numbers from 0 to 3.
    var randomNumber = Math.floor(Math.random() * 4);
    
// Capturing button colours (button ids) and assigning to a variable.    
    var randomChosenColour = buttonColours[randomNumber];
    
// Inserting random chosen colour into the ampty array.   
    gamePattern.push(randomChosenColour);

// Providing Fade in and out effect of the button.
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

// Calling function to play colour specific sound.
   playSound(randomChosenColour);

}

// Defining fuction to play sound.
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Defining fuction to add, remove and delay a class while pressing a button.
function animatePress(currentColour) {
    $('#' + currentColour).addClass("pressed");
    setTimeout(function() {
        $('#' + currentColour).removeClass("pressed");
    }, 100);  
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

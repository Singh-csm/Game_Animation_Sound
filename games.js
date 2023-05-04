var level=0;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[];
var started=false;
var randomNumber;
var randomChosenColour;


$(document).keypress(function(){
    if(!started)
    {
    $("#level-title").text("Level " + level);
    nextSequence();
    started=true;
    }
});

$(".btn").click(function(event){
var userChosenColour=event.target.id;
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatepress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{

    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        var wrong=new Audio("sounds/wrong.mp3")
        wrong.play();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}
    function nextSequence() {
         userClickedPattern=[];
        $("#level-title").text("Level "+level);
        level=level+1;
        randomNumber = Math.floor(Math.random() * 4);
        randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
      
      }
      function animatepress(currentColor){
        $("#"+currentColor).addClass("pressed");
        setTimeout(function(){
            $("#"+currentColor).removeClass("pressed");
        }, 100);
}
function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function startOver()
{
    level=0;
    userClickedPattern=[];
    gamePattern=[];
    started=false;
}

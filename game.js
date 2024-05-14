var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
}

$(".btn").click(function(){
   var userChosenColour=$(this).attr("id");
   userClickedPattern.push(userChosenColour);
   //console.log(userClickedPattern);
   playsound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
})

function playsound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();   
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed")
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
    },100)
}

$(document).keypress(function(){
    if(!started){
        nextSequence();
        $("#level-title").text("Level "+level);
        started=true;
    }
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        // console.log("success");
        console.log(gamePattern,userClickedPattern);
        if(gamePattern.length==userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }
    else{
        console.log("wrong");
        playsound("wrong");
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        $("#level-title").text("Game over ,press any key to restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}
/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.


/* **** Guessing Game Functions **** */

// Generate the Winning Number
$(document).ready(function(){
var playersGuess;
var winningNumber = generateWinningNumber();
var guesses=[];
var guessCount = 0;



function generateWinningNumber(){
	return Math.ceil(Math.random() * 100);
}

// Fetch the Players Guess

function playersGuessSubmission(){
	playersGuess = +$('#numerical-guess').val()
  guessCount++;
  $('#numerical-guess').val('');
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
      if(playersGuess > winningNumber){
        return 'high';
      }
      else{
        return "low";
      }
}


function guessMessage(){
  var distance = Math.abs(playersGuess - winningNumber);
  if(distance > 20){
    $('#result').text('Way too ' + lowerOrHigher() + '.');
  }
  else{
      $('#result').text('SO close! A little ' + lowerOrHigher() + ', but within 20 digits.');
  }
}


//winner function
function winner(){
  $('header').hide();
  $('#result').hide();
  $('#numerical-guess').hide();
  $('.guess-btn').hide();
  $('.hint').hide();
  $('.hintMessage').hide();
  //$('.container').animate({ 'display': 'block' })
  $('.winner').show()
}



// Check if the Player's Guess is the winning number 

function checkGuess(){
	if(playersGuess === winningNumber){
    //$('#result').text("winner winner chicken dinner!");
    return winner();
  }
  else {
    if(guesses.indexOf(playersGuess) === -1){
      guesses.push(playersGuess);
      guessMessage();
    }
    else{
      $('#result').text("Be more creative with your choices...")
    }  
  }
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	var randNum1 = Math.ceil(Math.random() * 100);
  var randNum2 = Math.ceil(Math.random() * 100);
  var hintArray = [randNum1, randNum2, winningNumber].sort(function() { return .5 - Math.random(); });
  $('.hintMessage').text("Try one of these:   [" + hintArray.join(', ') + "]");
}

// Allow the "Player" to Play Again

function playAgain(event){
  event.preventDefault();
  location.reload();
}



/* **** Event Listeners/Handlers ****  */

  generateWinningNumber();
  $(document).keypress(function(event){
    if(event.which == 13){
      playersGuessSubmission();
      checkGuess();
    }
  });

  $('.guess-btn').on('click', function(event){
    event.preventDefault();
    playersGuessSubmission();
    checkGuess();
    $(playersGuess).remove();
  });
  $('.hint').on('click', function(event){
    event.preventDefault();
    provideHint().fadeToggle();;
  });

  $('.play-again-btn').on('click', playAgain);
});

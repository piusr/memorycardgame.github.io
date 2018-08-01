/*
 * Create a list that holds all of your cards
 */
 const cards = document.querySelectorAll('.card');
//Event delegation to the class deck that nests all the card class

const deck = document.querySelector('.deck');
let toggledCards = [];



//We initialize the variable that will hold our moves
let moves = 0;
let time = 0;
let clockOff = true;
let matched = 0;
let totalMatch = 8;
let clockId;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//Shuffle deck function
function deckShuffle(){ //Node list is not an array, and to sort is as an array we use the array.from()
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));

     //Pass it as an argument in the shuffle function provided to us
     const shuffledCards = shuffle(cardsToShuffle);

      for(card of shuffledCards){
        deck.appendChild(card);
      }
}
deckShuffle();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


 

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


//We add eventlistener to our deck element to play our game
deck.addEventListener("click", function(event) {
    const clickTarget = event.target;
    if (allMatchedCards(clickTarget)) {
        if (clockOff) {
            startClock();
            clockOff = false;
        }

        toggleCard(clickTarget);
        addToggleCard(clickTarget);

        if (toggledCards.length === 2) {
            checkForMatch(clickTarget); //checkForMatch function
            addMove();  //add move function
            checkScore();  //check score function
        } 
            //When all cards have been matched
        if (matched === totalMatch) {
            gameOver();
        }

    }

});

// flip cards function, this will flip the car d to reveal the other side
    function toggleCard(card) {
        card.classList.toggle("open");
        card.classList.toggle("show");
     } 
    
 // - add the card to a listof cards that are open 
     function addToggleCard(clickTarget) {
        toggledCards.push(clickTarget);
        
     };

 // - if the list already has another card, check to see if the two cards match
 //if the cards do match, lock the cards in the open position 
    function checkForMatch() {
    if (
            toggledCards[0].firstElementChild.className 
        === 
            toggledCards[1].firstElementChild.className
        ) {
            toggledCards[0].classList.toggle("match");
            toggledCards[1].classList.toggle("match");
            toggledCards = [];
            matched++;
    //if the cards do not match, remove the cards from the list and return them to their original state
    //We use the setTioneout() for the transition between flipping cards 
        } else {
            setTimeout(function(){
            toggleCard(toggledCards[0]);
            toggleCard(toggledCards[1]);
            toggledCards = [];

         }, 1000);
     } 
 };
   
//this checks to see if a card is added to the array and matched cards don't get altered
    function allMatchedCards(clickTarget) {
        return (
            clickTarget.classList.contains("card") && 
            !clickTarget.classList.contains("match") &&
            toggledCards.length < 2 &&
            !toggledCards.includes(clickTarget)
        );
    }

//Shuffle function

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }


 //    + increments the move counter and displays it on the page 
    function addMove() {
        moves++;
        const movesText = document.querySelector(".moves");
        movesText.innerHTML = moves;
   }

//for removing stars
    function checkScore() {
        if (moves === 16 || moves === 24
     ){    hideStar();

        }
    }
    checkScore();

//hide star function
    function hideStar() {
        const starList = document.querySelectorAll(".stars li");
        for (star of starList) {
              
              star.style.display = "inline";
             if (star.style.display !== "none") {
                star.style.display = "none";
                break;
             } 
        }
    }

     hideStar();
     hideStar();


    function startClock() {
           clockId = setInterval(function() {
            time++;
            displayTime();
           //console.log(time);
        }, 1000);
}
  //startClock();

    function stopClock() {
        clearInterval(clockId);
    }
  

  //We display time and format it to a better understandable format 
  function displayTime() {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            const clock = document.querySelector(".clock");
             // So that we have the initial 0 when we have a single digit
            if (seconds < 10) {
                clock.innerHTML = `${minutes}:0${seconds}`;
            }  else {
                clock.innerHTML = `${minutes}:${seconds}`;
         }  

    }

//Function to toggle the modal open and close when the game omes to an end.
  function toggleModal() {
    const modal = document.querySelector(".modal_background");
    modal.classList.toggle('hide');
  }

  toggleModal() //Open modal
  toggleModal() //Close modal


//we write the statistics of the players performance on the modal after game ends
  function writeModalStats() {
    const timeStat = document.querySelector(".modal_time");
    const clockTime = document.querySelector(".clock").innerHTML;
    const movesStat = document.querySelector(".modal_moves");
    const starsStat = document.querySelector(".modal_stars");
    const stars = getStars();

    timeStat.innerHTML = `Your Time was = ${clockTime}`;
    movesStat.innerHTML = `Total Stars Gotten = ${moves}`;
    starsStat.innerHTML = `Total Moves Made = ${stars}`;
  }

//We get the total number of stars the player gets at the end of the game.
  function getStars() {
    stars = document.querySelectorAll(".stars li");
    starCount = 0;
    for (star of stars) {
        if (star.style.display !== "none") {
            starCount++;
        }
    }

    return starCount;
  }


//Replay Button on the modal
   document.querySelector(".modal_replay").addEventListener("click", function(){
     emptyArray();
     resetGame();
    

  });

//When the reset button is clicked, we want to clear all stored records
  function resetGame() {
    resetClockandTime();
    resetMoves();
    resetStars();
    resetCards();
    deckShuffle(); 
  }

    document.querySelector(".restart").addEventListener("click" , resetGame);

    document.querySelector(".modal_replay").addEventListener("click", resetGame);
   
   function resetClockandTime() {
    stopClock();
    clockOff = true;
    time = 0;
    displayTime();
  }


//Reset Moves to an initial value of 0
   function resetMoves() {
    moves = 0;
    document.querySelector(".moves").innerHTML = moves;
  }

//Reset Stars to an initial value of 0
  function resetStars() {
    stars = 0;
    const starList = document.querySelectorAll(".stars li");
    for (star of starList) {
        star.style.display = "inline";
    }
  }
 resetStars();


//Call some functions when the game comes to an end
 function gameOver() {
    stopClock();
    writeModalStats();
    toggleModal()
  }

//Reseting the cards class
function resetCards(){
    const cards = document.querySelectorAll('.deck li');
    for(let card of cards){
        card.className = 'card';
    }
}

//We empty the array that is hoding the matched cards.
function emptyArray(){
    if ( toggledCards !== []) {
        location.reload();
    }
    
}
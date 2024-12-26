const gameboard = (function () {
  let board = [0,0,0,0,0,0,0,0,0];
  return {board};
})();

function player (boardContent, name, turn){
  let playerTurn = turn;
  let playerBoardContent = boardContent;
  let score = 0;
  let getScore = () => score;
  let increaseScore = () => score++;
  let chooseMove = function (playerBoardContent, index) {
    gameboard.board[index] = playerBoardContent;
  }
  return {playerTurn, playerBoardContent, name, getScore, increaseScore, chooseMove};
}

const player1 = player('X', "player1", true);
const player2 = player('O', "player2", false);

function checkWinner(){
  let currentBoard = gameboard.board;
  if((currentBoard[0] == 'X' && currentBoard[1] == 'X' && currentBoard[2] == 'X') || 
  (currentBoard[3] == 'X' && currentBoard[4] == 'X' && currentBoard[5] == 'X') || 
  (currentBoard[6] == 'X' && currentBoard[7] == 'X' && currentBoard[8] == 'X') || 
  (currentBoard[0] == 'X' && currentBoard[3] == 'X' && currentBoard[6] == 'X') || 
  (currentBoard[1] == 'X' && currentBoard[4] == 'X' && currentBoard[7] == 'X') ||
  (currentBoard[2] == 'X' && currentBoard[5] == 'X' && currentBoard[8] == 'X') ||
  (currentBoard[0] == 'X' && currentBoard[4] == 'X' && currentBoard[8] == 'X') ||
  (currentBoard[2] == 'X' && currentBoard[4] == 'X' && currentBoard[6] == 'X')){
    displayEnd(player1);
    displayScore(player1.getScore(), player2.getScore());
  }
  else if((currentBoard[0] == 'O' && currentBoard[1] == 'O' && currentBoard[2] == 'O') || 
  (currentBoard[3] == 'O' && currentBoard[4] == 'O' && currentBoard[5] == 'O') || 
  (currentBoard[6] == 'O' && currentBoard[7] == 'O' && currentBoard[8] == 'O') || 
  (currentBoard[0] == 'O' && currentBoard[3] == 'O' && currentBoard[6] == 'O') || 
  (currentBoard[1] == 'O' && currentBoard[4] == 'O' && currentBoard[7] == 'O') ||
  (currentBoard[2] == 'O' && currentBoard[5] == 'O' && currentBoard[8] == 'O') ||
  (currentBoard[0] == 'O' && currentBoard[4] == 'O' && currentBoard[8] == 'O') ||
  (currentBoard[2] == 'O' && currentBoard[4] == 'O' && currentBoard[6] == 'O')){
    displayEnd(player2);
    displayScore(player1.getScore(), player2.getScore());
  }
  else if(currentBoard[0] != 0 && currentBoard[1] != 0 && currentBoard[2] != 0 && currentBoard[3] != 0
    && currentBoard[4] != 0 && currentBoard[5] != 0 && currentBoard[6] != 0 && currentBoard[7] != 0 &&
    currentBoard[8] != 0 && currentBoard.length == 9){
    displayEnd("draw");
    displayScore(player1.getScore(), player2.getScore());
  }
}

function displayScore(score1, score2){
  let score = document.querySelector(".score");
  score.textContent = `Score: ${score1} - ${score2}`;
}

function displayTurn(){
  let turn = document.querySelector(".turn");
  if(!document.contains(turn)){
    turn = document.createElement("h3");
    turn.classList.add("turn");
  }
  if(player1.playerTurn == true){
    turn.textContent = `It is currently ${player1.name}'s turn`;
  }
  else{
    turn.textContent = `It is currently ${player2.name}'s turn`;
  }
  let board = document.querySelector(".board");
  let body = document.querySelector("body");
  body.insertBefore(turn, board);
}

function displayContents(){
  let display = document.querySelectorAll(".card");
  let index = 0;
  display.forEach((card) => {
    if(gameboard.board[index] != 0){
      card.textContent = `${gameboard.board[index]}`;
    }
    else{
      card.textContent = "";
    }
    index++;
  })
}

function clickSquare(){
  const buttons = document.querySelectorAll(".card");
  buttons.forEach((button) => {
    button.addEventListener("click", function() {
      if(player1.playerTurn == true && gameboard.board[+button.getAttribute("id") - 1] == 0){
        player1.chooseMove(player1.playerBoardContent, +button.getAttribute("id") - 1);
        player2.playerTurn = true;
        player1.playerTurn = false;
        displayTurn();
      }
      else if(player2.playerTurn == true && gameboard.board[+button.getAttribute("id") - 1] == 0){
        player2.chooseMove(player2.playerBoardContent, +button.getAttribute("id") - 1);
        player1.playerTurn = true;
        player2.playerTurn = false;
        displayTurn();
      }
      displayContents();
      checkWinner();
    });
  });
}

function startGame(){
  const dialog = document.querySelector("#pop-up");
  window.addEventListener("load", () => {
    dialog.showModal();
  })
  const form = document.querySelector("#form");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    const data = new FormData(form);
    const player1Name = data.get("playerName1");
    const player2Name = data.get("playerName2");
    player1.name = player1Name;
    player2.name = player2Name;
    dialog.close();
    displayTurn();
    clickSquare();
  })
}
function displayEnd(player){
  const dialog = document.querySelector("#end");
  const result = document.querySelector("#result");
  dialog.removeAttribute("hidden");
  dialog.showModal();
  if(player == "draw"){
    result.textContent = "This game is a draw!";
  }
  else{
    result.textContent = `${player.name} has won!`;
    player.increaseScore();
  }
  restartGame();
  
}

function restartGame(){
  const restart = document.querySelector("#restart");
  restart.addEventListener("click", () => {
    for(let i = 0; i < 9; i++){
      gameboard.board[i] = 0;
      player1.playerTurn = true;
      player2.playerTurn = false;
      const dialog = document.querySelector("#end");
      dialog.close();
      displayTurn();
      displayContents();
    }
  })
}

startGame();








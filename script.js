var players = ['X','O'];
var turn = 0;
var gameWon = false;

var winningConditions = [[1,2,3], // rows
                         [4,5,6],
                         [7,8,9],
                         [1,4,7], // columns
                         [2,5,8],
                         [3,6,9],
                         [1,5,9], // diagonals
                         [3,5,7]];

$(function () { // when the document is ready

  $('#player').text(players[turn] + "'s turn"); // show the player's turn

  $('td').on('click', function () { // when the player clicks on a square
    if ($(this).text() === '') { // if it's empty
      setValue(this); // set its value
      checkForWinner(); // check for a winner
      if (gameWon === false) updateTurn(); // if no winner, change turns
    }
  });
});

var setValue = function (square) {

  $(square).text(players[turn]); // set the square's value to the player whose turn it is
};

var updateTurn = function () {

  if (turn === players.length-1) { // update to the next player's turn
    turn = 0;
  } else {
    turn += 1;
  }
  $('#player').text(players[turn] + "'s turn"); // update the player's turn on screen
};

var checkForWinner = function () {

  for (var i = 0; i < winningConditions.length; i++) { // for each set of win conditions
    var values = [];
    var positions = winningConditions[i];
    for (var j = 0; j < positions.length; j++) { // for each position of the current set
      values.push( $('#' + positions[j]).text() ); // save that square's value
    }

    if (winner(values)) { // check for a winner
      displayWin(values); // display the result if one is found
      gameWon = true;
    }
  }
};

var winner = function (values) {

  if (values.indexOf('') > -1) return false; // if any squares are empty there's no winner in this set
  for (var i = 0; i < values.length; i++) { // otherwise compare each value to see if they match
    if (i > 0 && values[i] != values[i-1]) return false; // if they don't there's no winner
  }
  return true; // if they all do a winner was found
};

var displayWin = function (values) {
  $('#player').text(values[0] + ' wins!'); // display the player who won
  $('td').unbind('click'); // make the squares no longer clickable
};

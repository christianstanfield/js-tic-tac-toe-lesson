var players = ['X','O'];
var turn = 0;

var winningConditions = [[1,2,3], // rows
                         [4,5,6],
                         [7,8,9],
                         [1,4,7], // columns
                         [2,5,8],
                         [3,6,9],
                         [1,5,9], // diagonals
                         [3,5,7]];

$(function () { // when the document is ready

  $('td').on('click', function () { // when we click on a square
    if ($(this).text() === '') setValue(this); // if it's empty set its value
  });
});

var setValue = function (square) {

  $(square).text(players[turn]); // set the square's value to the player whose turn it is

  if (turn === players.length-1) { // change each player's turn
    turn = 0;
  } else {
    turn += 1;
  }

  checkForWinner(); // check for a winner
};

var checkForWinner = function () {

  for (var i = 0; i < winningConditions.length; i++) { // for each set of win conditions
    var values = [];
    var positions = winningConditions[i];
    for (var j = 0; j < positions.length; j++) { // for each position of the current set
      values.push( $('#' + positions[j]).text() ); // save that square's value
    }

    if (winner(values)) displayWin(values); // check for a winner and display the result if one is found
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
  $('h1').append('<br>' + values[0] + ' wins!'); // display the player who won
  $('td').unbind('click'); // make the squares no longer clickable
};

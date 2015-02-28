var players = ['X','O'];
var turn = 0;

var winningConditions = [[1,2,3],
                         [4,5,6],
                         [7,8,9],
                         [1,4,7],
                         [2,5,8],
                         [3,6,9],
                         [1,5,9],
                         [3,5,7]];

$(function () {

  $('td').on('click', function () {
    if ($(this).text() === '') setValue(this);
  });
});

var setValue = function (square) {

  $(square).text(players[turn]);

  if (turn === players.length-1) {
    turn = 0;
  } else {
    turn += 1;
  }
  
  checkForWinner();
};

var checkForWinner = function () {

  for (var i = 0; i < winningConditions.length; i++) {
    var values = [];
    var positions = winningConditions[i];
    for (var j = 0; j < positions.length; j++) {
      values.push( $('#' + positions[j]).text() );
    }

    if (winner(values)) displayWin(values);
  }
};

var winner = function (values) {

  if (values.indexOf('') > -1) return false;
  for (var i = 0; i < values.length; i++) {
    if (i > 0 && values[i] != values[i-1]) return false;
  }
  return true;
};

var displayWin = function (values) {
  $('h1').append('<br>' + values[0] + ' wins!');
  $('td').unbind('click');
};

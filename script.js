$(function () {
  var players = ['X','O'];
  var turn = 0;

  $('td').on('click', function () {
    $(this).text(players[turn]);
    if (turn === players.length-1) {
      turn = 0;
    } else {
      turn += 1;
    }
    checkForWinner();
  });
});

var checkForWinner = function () {

  checkRows();

};

var checkRows = function () {

  $('tr').each(function () {
    var values = [];
    $(this).find('td').each(function () {
      var value = $(this).text();
      values.push(value);
    });
    if (winner(values)) displayWin(values);
  });
};

var winner = function (values) {

  if (values.indexOf('') > -1) return false;
  for (i = 0; i < values.length; i++) {
    if (i > 0 && values[i] != values[i-1]) return false;
  }
  return true;
};

var displayWin = function (values) {
  $('h1').append('<br>' + values[0] + ' wins!');
  $('td').unbind('click');
};

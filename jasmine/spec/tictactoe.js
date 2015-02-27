describe('winner', function() {

  it('checks each value in an array for consecutive non-empty strings', function() {
    var values = ['X', '', ''];

    expect(winner(values)).toBe(false);
  });
});

describe("find winner", function(){
  var player1Cards = [
    new Card(14,1),
    new Card(10,1),
    new Card(12,1),
    new Card(13,1),
    new Card(11,1),
  ];
  var player2Cards = [
    new Card(4,1),
    new Card(7,4),
    new Card(6,1),
    new Card(3,2),
    new Card(5,3),
  ];

  var hand1 = pullHand(player1Cards);
  var hand2 = pullHand(player2Cards);

  it("should prefer royal flush against the straight", function(){
    expect(findWinners([hand1,hand2])).toHaveSameItems([hand1]);
  });
});
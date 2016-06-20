describe("PokerHand",function(){
  var fullHouseHand = [
    new Card(7,1),
    new Card(10,4),
    new Card(13,2),
    new Card(10,2),
    new Card(7,4),
    new Card(13,3),
    new Card(10,1)
  ];

  var straightFlushHand = [
    new Card(10,1),
    new Card(12,1),
    new Card(11,1),
    new Card(5,4),
    new Card(14,1),
    new Card(9,1),
    new Card(13,1)
  ];

  it("should detect a high card", function(){
    var card = pokerHand.highCard(fullHouseHand);
    expect(card[0].value).toEqual(13);
  });

  it("should detect three of a kind", function(){
    var triple = pokerHand.threeOfAKind(fullHouseHand);
    expect(triple.length).toEqual(3);
    expect(triple[0].value).toEqual(10);
  });

  it("should detect two pairs", function(){
    var pairs = pokerHand.twoPair(fullHouseHand);
    expect(pairs).toHaveSameItems([fullHouseHand[1],fullHouseHand[2],fullHouseHand[3],fullHouseHand[5]],true);
  });

  it("should detect the right pair", function(){
    var pair = pokerHand.onePair(fullHouseHand);
    expect(pair[0].value).toEqual(13);
  });

  it("should detect a fullhouse", function(){
    var fullHouse = pokerHand.fullHouse(fullHouseHand);
    expect(fullHouse).toBeTruthy();
    expect(fullHouse).toHaveSameItems([fullHouseHand[1],fullHouseHand[2],fullHouseHand[3],fullHouseHand[5],fullHouseHand[6]],true);
  });

  it("should detect a straight", function(){
    var straight = pokerHand.straight(straightFlushHand);
    expect(straight).toBeTruthy();
    expect(straight).toHaveSameItems([straightFlushHand[0],straightFlushHand[1],straightFlushHand[2],straightFlushHand[4],straightFlushHand[6]],true);
  });

  it("should detect a flush", function(){
    var flush = pokerHand.flush(straightFlushHand);
    expect(flush).toBeTruthy();
    expect(flush).toHaveSameItems([0,1,2,4,6].map(function(k){return straightFlushHand[k];}),true);
  });

  it("should detect a straight flush", function(){
    var straightFlush = pokerHand.straightFlush(straightFlushHand);
    expect(straightFlush).toBeTruthy();
    expect(straightFlush).toHaveSameItems([0,1,2,4,6].map(function(k){return straightFlushHand[k];}),true);
  });
});
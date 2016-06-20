function fullHand(players,communityCards){
  console.log("Players", players);
  console.log("Community Cards", communityCards);
  var hands = [];
  for (var c = 0; c < players.length; c++){
    var player = players[c];
    player.combo = player.originalHand.concat(communityCards);

    hands.push(pullHand(player.combo,c));
  }
  console.log("Hands",hands);
  var winners = findWinners(hands);

  console.log("Winners",winners);

  console.log("Winners",winners);

  console.log("Winner is Player " + winners[0].player + " With the best hand of " + winners[0].type);

  for (var i = 0; i < winners[0].cards.length; i++){
    switch (winners[0].cards[i].suit){
      case 1:
        console.log(winners[0].cards[i].value + " diamonds");
        break;
      case 2:
        console.log(winners[0].cards[i].value + " clovers");
        break;
      case 3:
        console.log(winners[0].cards[i].value + " hearts");
        break;
      case 4:
        console.log(winners[0].cards[i].value + " spades");
        break;
    }
  }
}


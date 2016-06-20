function fullHand(players,communityCards){
  var hands = [];
  for (var c = 0; c < players.length; c++){
    var player = players[c];
    player.combo = player.originalHand.concat(communityCards);

    hands.push(pullHand(player.combo,c));
  }

  var winners = findWinners(hands);

  var winnerHeaderElement = document.createElement("h4");
  var winnerText = document.createTextNode("Winner is Player " + (winners[0].player + 1) + " With the best hand of " + winners[0].type);
  document.getElementById("winnerContainer").appendChild(winnerHeaderElement).setAttribute("id", "winnerHeader");
  document.getElementById("winnerHeader").appendChild(winnerText);
}


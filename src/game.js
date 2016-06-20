var game = {
  players: [],
  community:[],
  start: function(){ 
    promptPlayers();
   },
  deal: function(){
    var deck = new Deck(this);
    deck.dispenseCommunity();
    deck.dispensePlayer();
    fullHand(this.players, this.community);
  }
}

window.onload = function(){
  document.getElementById("playGame").onclick = function(){
    game.start();
  }
}

function promptPlayers(){
  var playerCount = document.getElementById("numOfPlayer").value;

  if (playerCount === "" || playerCount === null || playerCount === undefined){
    alert("Cannot leave this blank");
  } else if (isNaN(playerCount) || playerCount < 2 || playerCount > 12){
    alert(playerCount + " is not a valid entry. [2-12 Players]");
  } else {
    alert("Game started");
    createPlayers(playerCount);
    game.deal(); 
  }
}

function createPlayers(playerCount){
  for (var i=0; i < playerCount; i++){
    game.players.push(new Player());
  }
  console.log(game.players);
}

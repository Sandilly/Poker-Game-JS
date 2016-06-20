function Deck(game){ 
  this.cards = [];
  this.game = game;
  
  var values = [2,3,4,5,6,7,8,9,10,11,12,13,14];
  var suits = [1,2,3,4];

  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < suits.length; j++){
      var card = new Card(values[i], suits[j]);
      this.cards.push(card);
    }
  }
  this.shuffle();
}

Deck.prototype.shuffle = function(){
  var deckCount = this.cards.length;
  var randomIdx;
  var currentCard;

  while(deckCount){
    randomIdx = Math.floor(Math.random() * deckCount--);

    currentCard = this.cards[deckCount];
    this.cards[deckCount] = this.cards[randomIdx];
    this.cards[randomIdx] = currentCard;

  }
  console.log(this.cards);
}

Deck.prototype.dispenseCommunity = function(){
  this.game.community = this.cards.splice(0,5);

  var ccHeader = document.createElement("h4");
  var ccHeaderText = document.createTextNode("Community Cards");
  document.getElementById("communityContainer").appendChild(ccHeader).setAttribute("id","communityCardH4");
  document.getElementById("communityCardH4").appendChild(ccHeaderText);

  for (var i = 0; i < this.game.community.length; i++){
    var card = document.createElement("div");
    var value = this.game.community[i].value;
    var suit = this.game.community[i].suit;

    switch (value){
      case 14:
        value = "A";
        break;
      case 13:
        value = "K";
        break;
      case 12:
        value = "Q";
        break;
      case 11:
        value = "J";
        break;
      case 1:
        value = "A";
        break;
    }

    if (suit == 2 || suit == 4){
      card.classList.add("redCard");
      if (suit == 2){
        suit = "♥";
      } else {
        suit = "♦";
      }
    } else {
      card.classList.add("blackCard");
      if (suit == 1){
        suit = "♠";
      } else {
        suit = "♣";
      }
    }

    card.classList.add("card");
    document.getElementById("communityContainer").appendChild(card).appendChild(document.createTextNode(value + " " +suit));
  }
};

Deck.prototype.dispensePlayer = function(){
  for (var d = 0; d < this.game.players.length; d++){
    var pcHeader = document.createElement("h4");
    var pcHeaderText = document.createTextNode("Player " + (d + 1));
    var playerContainer = document.createElement("div").setAttribute("class", "playerContainer");

    document.getElementById("playersContainer").appendChild(pcHeader).appendChild(pcHeaderText);
    for (var p = 0; p < 2; p++){
      this.game.players[d].originalHand.push(this.cards.splice(0,1)[0]);
      var card = document.createElement("div");
      var value = this.game.players[d].originalHand[p].value;
      var suit = this.game.players[d].originalHand[p].suit;

      switch (value){
      case 14:
        value = "A";
        break;
      case 13:
        value = "K";
        break;
      case 12:
        value = "Q";
        break;
      case 11:
        value = "J";
        break;
      case 1:
        value = "A";
        break;
    }

      if (suit == 2 || suit == 4){
        card.classList.add("redCard");
        if (suit == 2){
          suit = "♥";
        } else {
          suit = "♦";
        }
      } else {
        card.classList.add("blackCard");
        if (suit == 1){
          suit = "♠";
        } else {
          suit = "♣";
        }
      }
      card.classList.add("card");
    document.getElementById("playersContainer").appendChild(card).appendChild(document.createTextNode(value + " " +suit));
    }
  }
  console.log(this.game.players);
};


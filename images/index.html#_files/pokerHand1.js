var comparisons = {
  royalFlush: function() { return 0; },
  straightFlush: compareByHighestCard,
  fourOfAKind: compareByMostFrequent,
  fullHouse: compareByMostFrequent,
  flush: compareByHighestCard,
  straight: compareByHighestCard,
  threeOfAKind: compareByMostFrequent,
  twoPair: compareByMostFrequent,
  onePair: compareByMostFrequent,
  highCard: compareByHighestCard
}

window.pokerHand = {
  royalFlush: function(cards){
    var straightFlush = this.straightFlush(cards);
    if (!straightFlush){
      return false;
    }
    var thereIsAnAce = cards.some(function(card){
      return card.value === 14;
    });

    if(!thereIsAnAce){
      return false;
    }
    return straightFlush;
  },
  straightFlush:function(cards){
    var straight = getStraightCandidates(cards);
    if (!straight){
      return false;
    }
    var straightFlush = this.flush(straight);
    if (!straightFlush){
      return false;
    }
    return straightFlush;
  },
  fourOfAKind:function(cards){
    return nOfAKind(cards, 4);
  },
  fullHouse:function(cards){
    var triple = this.threeOfAKind(cards);

    if (!triple){
      return false;
    }

    cards = cards.filter(function(card){
      return triple.indexOf(card) === -1; 
    });

    var pair = this.onePair(cards);
    if (!pair){
      return false;
    }
    return triple.concat(pair);

  },
  flush:function(cards){
    var groups = groupBySuit(cards);
    var suits = Object.keys(groups).map(function(k) { return parseInt(k); });
    
    var suitsOfFiveValues = suits.filter(function(s){
      var values = groups[s];
      return values.length >= 5; 
    });

    if (!suitsOfFiveValues.length){
      return false;
    }

    var suit = suitsOfFiveValues[0];

    return cards.slice().filter(function(card){ 
      return card.suit === suit;
    }).sort(function(card1, card2) {
      return card2.value - card1.value;
    }).slice(0,5);
  },
  straight:function(cards){
    var candidates = getStraightCandidates(cards);
    if (!candidates){
      return false;
    }

    var final = {};
    for (var i = 0; i < candidates.length; i++) {
      var card = candidates[i];
      final[card.value] = card;
    }
    
    return Object.keys(final).map(function(k) { return final[k]; });
  },
  threeOfAKind:function(cards){
    return nOfAKind(cards, 3);
  },
  twoPair:function(cards){
    var firstPair = this.onePair(cards);
    if(!firstPair){
      return false;
    }
  
    cards = cards.filter(function(card){
      return firstPair.indexOf(card) === -1; 
    });

    var secondPair = this.onePair(cards);
    if(!secondPair){
      return false;
    }
    
    return firstPair.concat(secondPair);
  },
  onePair:function(cards){
    return nOfAKind(cards, 2);
  },
  highCard:function(cards){
    var groups = groupByValue(cards);
    var values = Object.keys(groups).map(function(k) { return parseInt(k); });
    var maxValue = Math.max.apply(null,values);
    return [cards.find(function(card){
      return card.value === maxValue;
    })];
  }
}

function nOfAKind(cards, n) {
  var groups = groupByValue(cards);
  var values = Object.keys(groups).map(function(k) { return parseInt(k); });

  var tuples = values.filter(function(v){
    return groups[v].length >= n;
  });
  if (!tuples.length){
    return false;
  }
  var maxTuple = Math.max.apply(null, tuples);

  return cards.filter(function(card){
    return card.value === maxTuple;
  }).slice(0,n);
}

function getStraightCandidates(cards) {
  var groups = groupByValue(cards);
  var values = Object.keys(groups).map(function(k){
    return parseInt(k);
  });

  var runs = findConsecutiveRuns(values.sort());
  var maxValueAtLeastFiveLongRuns = runs.filter(function(r){
    return r.length >= 5;
  }).map(function(run){ 
    return run.sort().reverse(); 
  }).sort(function(run1, run2){
    return run2[0] - run1[0];
  });
  if (!maxValueAtLeastFiveLongRuns.length){
    return false;
  }

  var run = maxValueAtLeastFiveLongRuns[0].slice(0,5); 

  return cards.filter(function(card){
    return run.indexOf(card.value) !== -1;
  });
}

function groupByValue(cards){
  var groups = {};
  for (var i = 0; i < cards.length; i++) {
    var value = cards[i].value;
    if (typeof groups[value] === "undefined") {
      groups[value] = [cards[i].suit];
    } 
    else {
      groups[value].push(cards[i].suit);
    }
  }

  return groups;
}

function groupBySuit(cards){
  var groups = {};
  for (var i = 0; i < cards.length; i++) {
    var suit = cards[i].suit;
    if (typeof groups[suit] === "undefined") {
      groups[suit] = [cards[i].value];
    } 
    else {
      groups[suit].push(cards[i].value);
    }
  }
  return groups;
}

function findConsecutiveRuns(values){
  var first = values[0];
  var runs = [];
  var consecutive = values.slice(1).reduce(function(run, curr) {
    if (curr === run[run.length - 1] + 1) {
      return run.concat([curr]);
    } else {
      runs.push(run);
      return [curr];
    }
  }, [first]);
  runs.push(consecutive);
  return runs;

}

function pullHand(cards,playerIdx) {
  var handTypes = Object.keys(pokerHand);
  
  var bestHandType;
  var bestHand;
  for (var i = 0; i < handTypes.length; i++){
    var f = pokerHand[handTypes[i]].bind(pokerHand);
    bestHand = f(cards);
    if (bestHand){
      bestHandType = handTypes[i];
      break;
    }
  }
  
  cards = cards.filter(function(card){
    return bestHand.indexOf(card) === -1;
  });

  while(bestHand.length < 5){ 
    var highCard = pokerHand.highCard(cards)[0];
    var idx = cards.indexOf(highCard);
    bestHand.push(highCard);
    cards.splice(idx, 1);
  }
 
  return {
    type: bestHandType,
    cards: bestHand,
    player: playerIdx
  };
}

function findWinners(hands) {
  var handTypes = Object.keys(pokerHand);

  var winningHandType = handTypes.find(function(ht) {
    return hands.some(function(h) { return h.type === ht; });
  });
  
  var finalists = hands.filter(function(h) {
    return h.type === winningHandType;
  });
  
  return finalists.sort(function(f1, f2) {
    return compareSimilarHands(f2.cards, f1.cards, winningHandType);
  });

}

function compareSimilarHands(hand1, hand2, type) {
  var compareFunc = comparisons[type];
  return compareFunc(hand1, hand2);
}

function compareByHighestCard(hand1, hand2){
  var diff = 0;
  
  hand1 = hand1.map(function(card) { return card.value; }).sort().reverse();
  hand2 = hand2.map(function(card) { return card.value; }).sort().reverse();
  
  var i = 0;
  while (!diff && i < Math.min(hand1.length, hand2.length)) {
    diff = hand1[i] - hand2[i];
    i++;
  }

  return diff; 
}

function compareByMostFrequent(hand1, hand2) {
  var groups1 = groupByValue(hand1.map(function(card) { return card.value; }));
  var mostFreq1 = Object.keys(groups1).sort(function(k1, k2) {
    return groups1[k2].length - groups1[k1].length;
  })[0];
  
  var groups2 = groupByValue(hand2.map(function(card) { return card.value; }));
  var mostFreq2 = Object.keys(groups2).sort(function(k1, k2) {
    return groups2[k2].length - groups2[k1].length;
  })[0];
  
  var diff = mostFreq1 - mostFreq2;

  return diff;
}


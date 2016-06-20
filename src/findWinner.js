function findWinners(hands) {
  
  var handTypes = Object.keys(pokerHand);
  
  var winningHandType = handTypes.find(function(ht) {
    return hands.any(function(h) { return h.type === ht; });
  });
  
  var finalists = hands.filter(function(h) {
    return h.type === winningHandType;
  });
  
  return finalists.sort(function(f1, f2) {
    return compareSimilarHands(f2.cards, f1.cards, winningHandType);
  });
}

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

function compareSimilarHands(hand1, hand2, type) {
  var compareFunc = comparisons[type];
  return compareFunc(hand1, hand2);
}

function compareByHighestCard(hand1, hand2) 
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
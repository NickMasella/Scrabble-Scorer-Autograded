// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function transform(object) {
   let newPointStructure = {};
   for (const pointValue in object){
      for (let i = 0; i < object[pointValue].length; i++){
         newPointStructure[object[pointValue][i].toLowerCase()] = Number(pointValue);
      }

   }
   return newPointStructure;
}


function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question("Let's play some scrabble! Enter a word: ");
   // while (typeof word != typeof " "){
   //    word = input.question("Please enter a word:");
   // }
   return word;
   
}

function simpleScorer(word){
   word = word.toUpperCase();
	let letterPoints = "";
   let points = 0;
 
	for (let i = 0; i < word.length; i++) {
   letterPoints += `Points for '${word[i]}': 1\n`;
   points++;
	  }
	console.log(letterPoints);
   console.log(`Total points: ${points}`);
	return points;

}

function vowelBonusScorer(word){
   word = word.toUpperCase();
	let letterPoints = "";
   let points = 0;
 
	for (let i = 0; i < word.length; i++) {
      let vowels = ["A", "E", "I", "O", "U"];
      if (vowels.includes(word[i])) {
         points += 3;
         letterPoints += `Points for '${word[i]}': 3\n`;
      } else {
         letterPoints += `Points for '${word[i]}': 1\n`;
         points++;
      }
	  }
   console.log(letterPoints);
   console.log(`Total points: ${points}`);
	return points;

}

function scrabbleScorer(word){
   word = word.toLowerCase();
	let letterPoints = "";
   let points = 0;
   let newPointStructure = transform(oldPointStructure);
	for (let i = 0; i < word.length; i++) {
      
   letterPoints += `Points for '${word[i]}': ${newPointStructure[word[i]]}\n`;
	points += newPointStructure[word[i]];
 
	  }
	console.log(letterPoints);
   console.log(`Total points: ${points}`);
	return points;
}

let simple = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
   };

let vowels = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
   };

let scrabble = {
   description: "The traditional scoring algorithm.",
   name: "Scrabble",
   scorerFunction: scrabbleScorer
   };

const scoringAlgorithms = [simple, vowels, scrabble];

function scorerPrompt() {
   let algorithm = Number(input.question(
   `Which scoring algorithm would you like to use?
   0 - Simple: One point per character
   1 - Vowel Bonus: Vowels are worth 3 points
   2 - Scrabble: Uses scrabble point system\n`));
   let validInputs = [0, 1, 2];
   while (!validInputs.includes(algorithm)){
     algorithm = Number(input.question(`Please choose a valid option(0,1,2)\n`));
   }
   return scoringAlgorithms[algorithm];

}



let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let word = initialPrompt();
   let algorithm = scorerPrompt();
   algorithm.scorerFunction(word);
   
}
// console.log("algorithm name: ", scoringAlgorithms[0].name);
// console.log("scoringFunction result: ", scoringAlgorithms[0].scorerFunction("JavaScript"));



// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

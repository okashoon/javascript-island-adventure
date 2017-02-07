
window.onload = function(){
var map = [
[0, 0, 2, 0, 1, 3],
[1, 0, 0, 2, 0, 1],
[2, 0, 2, 0, 1, 1],
[0, 0, 0, 2, 0, 0],
[2, 0, 0, 1, 0, 2],
[1, 0, 0, 2, 0, 0]
];

var gameObjects = [
[0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 5, 0],
[0, 0, 0, 0, 0, 0],
[4, 0, 0, 0, 0, 0]
];



var stage = document.querySelector("#stage");
var output = document.querySelector("#output");
//constants - map code
var WATER = 0;
var ISLAND = 1;
var PIRATE = 2;
var HOME = 3;
var SHIP = 4;
var MONSTER = 5;
var WRECK = 6;

var SIZE = 70;

var ROWS = map.length;
var COLUMNS = map[0].length;

var shipRow;
var shipColumn;

var monsterRow;
var monsterColumn;

var food = 10;
var gold = 10;
var experience = 0;
var gameMessage = "Use the arrow keys to find your way home.";

for(var i = 0; i < gameObjects.length; i++){
	for(var j = 0; j < gameObjects[0].length; j++){
		if(gameObjects[i][j] === SHIP){
			shipRow = i;
			shipColumn = j;
		}
		if(gameObjects[i][j] === MONSTER){
			monsterRow = i;
			monsterColumn = j;
		}
	}
}

var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;

document.addEventListener("keydown", keydownHandler, false);

render();

function render(){
	console.log("render");
	if(stage.hasChildNodes()){
		for(var i = 0; i< ROWS*COLUMNS;i++){
			stage.removeChild(stage.firstChild);
		}
	}
	for(var row = 0; row < ROWS; row++){
		for(var column = 0; column<COLUMNS; column++){
			
			var cell = document.createElement("img");
			cell.setAttribute("class", "cell");
			cell.style.top = row * (SIZE + 5) +"px";
			cell.style.left = column * (SIZE + 5) + "px";
			stage.appendChild(cell);
			switch(map[row][column])
			{

				case WATER:
				cell.src = "images/water.png";
				break;

				case PIRATE:
				cell.src = "images/pirate.png";
				break;
				
				case ISLAND:
				cell.src ="images/island.png";
				break;

				case HOME:
				cell.src = "images/home.png";
				break;
			}
			if(gameObjects[row][column] === SHIP){
				cell.src = "images/ship.png";
			}
			if(gameObjects[row][column] === MONSTER){
				cell.src = "images/monster.png";
			}
			if(gameObjects[row][column] === WRECK){
				console.log("image wreck");
				cell.src = "images/wreck.png";
			}
			
		}
	}
	output.innerHTML = gameMessage;

	output.innerHTML
	+= "<br>Gold: " + gold + ", Food: "
	+ food + ", Experience: " + experience;
}

function keydownHandler(event){
	switch (event.keyCode) {
		case UP:
		if(shipRow>0){
			gameObjects[shipRow][shipColumn] = 0;
			shipRow--;
			if(gameObjects[shipRow][shipColumn] === MONSTER){
				endGame();
			} else {
			gameObjects[shipRow][shipColumn] = SHIP;
			}
		}
		break;
		case DOWN:
		if(shipRow<ROWS-1){
			gameObjects[shipRow][shipColumn] = 0;
			shipRow++;
			if(gameObjects[shipRow][shipColumn] === MONSTER){
				endGame();
			} else {
			gameObjects[shipRow][shipColumn] = SHIP;
			}
		}
		break;
		case RIGHT:
		if(shipColumn<COLUMNS-1){
			gameObjects[shipRow][shipColumn] = 0;
			shipColumn++;
			if(gameObjects[shipRow][shipColumn] === MONSTER){
				endGame();
			} else {
			gameObjects[shipRow][shipColumn] = SHIP;
			}
		}
		break;
		case LEFT:
		if(shipColumn>0){
			gameObjects[shipRow][shipColumn] = 0;
			shipColumn--;
			if(gameObjects[shipRow][shipColumn] === MONSTER){
				endGame();
			} else {
			gameObjects[shipRow][shipColumn] = SHIP;
			}
		}
		break;

		
	}

	switch(map[shipRow][shipColumn]){
		case ISLAND:
		trade();
		break;

		case PIRATE:
		fight();
		break;

		case WATER:
		gameMessage = "you are sailing";
		break;

		case HOME:
		endGame();
		break;

	}

	food--;
	if(food <= 0 || gold <= 0)
	{
		endGame();
	}

	
	console.log( shipRow + " : " + shipColumn);
	console.log( gameObjects[shipRow][shipColumn] );
	console.log(MONSTER);
	
	

	render();
}

var interval = setInterval(function(){
	moveMonster();
	
	render();

	if(gameObjects[shipRow][shipColumn] === MONSTER){
		
		endGame();
		
	}
}, 500);



function trade(){

	var islandsFood = experience + gold;
	var cost = Math.ceil(Math.random() * islandsFood);

	if(gold > cost){
		food += islandsFood;
		gold -= cost;
		experience += 2;
		gameMessage
		= "You buy " + islandsFood + " coconuts"
		+ " for " + cost + " gold pieces."
	}else{

		experience += 1;
		gameMessage = "You don't have enough gold to buy food."
	}
}

function fight(){
	var shipStrength = Math.ceil((food + gold) / 2);
	var pirateStrength = Math.ceil(Math.random() * shipStrength * 2);
	if(pirateStrength > shipStrength){
		var stolenGold = Math.round(pirateStrength / 2);
		gold -= stolenGold;
		experience += 1;
		gameMessage= "You fight and LOSE " + stolenGold + " gold pieces."
		+ " Ship's strength: " + shipStrength
		+ " Pirate's strength: " + pirateStrength;
	} else {
		var pirateGold = Math.round(pirateStrength / 2);
		gold += pirateGold;
		experience += 2;
		gameMessage = "You fight and WIN " + pirateGold + " gold pieces."
		+ " Ship's strength: " + shipStrength
		+ " Pirate's strength: " + pirateStrength;
	}
}

function moveMonster(){

	var UP = 1;
	var RIGHT = 2;
	var DOWN = 3;
	var LEFT = 4;

	var validDirections = [];
	var direction;

	if(monsterRow > 0){
		var thingAbove = map[monsterRow-1][monsterColumn];
		if(thingAbove === WATER){
			validDirections.push(UP);
		}
	}
	if(monsterRow<ROWS-1){
		var thingBelow = map[monsterRow+1][monsterColumn];
		if(thingBelow === WATER){
			validDirections.push(DOWN);
		}
	}
	if(monsterColumn>0){
		var thingLeft = map[monsterRow][monsterColumn-1];
		if(thingLeft === WATER){
			validDirections.push(LEFT);
		}
	}
	if(monsterColumn<COLUMNS-1){
		var thingRight = map[monsterRow][monsterColumn+1];
		if(thingRight === WATER){
			validDirections.push(RIGHT);
		}
	}

	if(validDirections.length > 0){
		var direction = validDirections[Math.floor(Math.random()*validDirections.length)];
	}

	switch (direction) {
		case UP:
		
			gameObjects[monsterRow][monsterColumn] = 0;
			monsterRow--;
			gameObjects[monsterRow][monsterColumn] = MONSTER;
		
		break;
		case DOWN:
		
			gameObjects[monsterRow][monsterColumn] = 0;
			monsterRow++;
			gameObjects[monsterRow][monsterColumn] = MONSTER;
		
		break;
		case RIGHT:
		
			gameObjects[monsterRow][monsterColumn] = 0;
			monsterColumn++;
			gameObjects[monsterRow][monsterColumn] = MONSTER;
		
		break;
		case LEFT:
		
			gameObjects[monsterRow][monsterColumn] = 0;
			monsterColumn--;
			gameObjects[monsterRow][monsterColumn] = MONSTER;
		
		break;
	}




	


}

function endGame(){
	
	if(map[shipRow][shipColumn] === HOME)	{
		var score = food + gold + experience;
		gameMessage = "You made it home ALIVE! " + "Final Score: " + score;
	} else if(gameObjects[shipRow][shipColumn] === MONSTER){
		console.log("elseif");
		gameObjects[shipRow][shipColumn] = WRECK;
		
		gameMessage = " You've been eaten by Monster"
		render();
		clearInterval(interval);
	}else{
		if(gold <= 0){
			gameMessage += " You've run out of gold!";
		}else{
			gameMessage += " You've run out of food!";
		}
		gameMessage
		+= " Your crew throws you overboard!";
	}
	document.removeEventListener("keydown", keydownHandler, false);
	
}
}

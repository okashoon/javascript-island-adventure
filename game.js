var map = [
[0,0,2,0,1,3],
[1,0,0,2,0,1],
[2,0,2,0,1,1],
[0,0,0,2,0,0],
[2,0,0,1,0,2],
[1,0,0,2,0,0]
];

var gameObjects = [
[0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0],
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

var SIZE = 70;

var ROWS = map.length;
var COLUMNS = map[0].length;

var shipRow;
var shipColumn;

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
	}
}

var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;

document.addEventListener("keydown", keydownHandler, false);

render();

function render(){

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
			gameObjects[shipRow][shipColumn] = SHIP;
		}
		break;
		case DOWN:
		if(shipRow<ROWS-1){
			gameObjects[shipRow][shipColumn] = 0;
			shipRow++;
			gameObjects[shipRow][shipColumn] = SHIP;
		}
		break;
		case RIGHT:
		if(shipColumn<COLUMNS-1){
			gameObjects[shipRow][shipColumn] = 0;
			shipColumn++;
			gameObjects[shipRow][shipColumn] = SHIP;
		}
		break;
		case LEFT:
		if(shipColumn>0){
			gameObjects[shipRow][shipColumn] = 0;
			shipColumn--;
			gameObjects[shipRow][shipColumn] = SHIP;
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





	render();
}

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

function endGame(){
	if(map[shipRow][shipColumn] === HOME)	{
		var score = food + gold + experience;
		gameMessage
		= "You made it home ALIVE! " + "Final Score: " + score;
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


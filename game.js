var map = [
[0,0,2,0,1,3],
[3,0,0,2,0,1],
[3,0,2,0,3,1],
[0,0,0,3,0,0],
[2,0,0,1,0,3],
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

		default:
				// statements_def
				break;
			}
		render();
}


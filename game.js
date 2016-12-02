var map = [
[0,0,2,0,1,3],
[3,0,0,2,0,1],
[3,0,2,0,3,1],
[0,0,0,3,0,0],
[2,0,0,1,0,3],
[1,0,0,2,0,0]
];

var stage = document.querySelector("#stage");
//constants - map code
var WATER = 0;
var ISLAND = 1;
var PIRATE = 2;
var HOME = 3;

var SIZE = 70;

var ROWS = map.length;
var COLUMNS = map[0].length;

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
			stage.appendChild(cell);
		}
	}
}


// GLOBALS
var htmlLink = document.getElementById("link"); // character link's html element
var htmlLinkPositionCSS = []; // links current position;
var screenHeight = 448; // game viewport height
var screenWidth = 512; // game viewport width
var gridAspectRatio = 32; // grid aspect ratio depending on set screen size; currently setting each tile to 32px x 32px 
var htmlGridActive = document.getElementById("ul-screen-grid"); // id attribute value of current active screen grid tiles list
var htmlGridOffScreenNorth = document.getElementById("off-screen-grid-north"); // id attribute value of current off screen grid north tiles list
var htmlGridOffScreenEast = document.getElementById("off-screen-grid-east"); // id attribute value of current off screen grid east tiles list
var htmlGridOffScreenSouth = document.getElementById("off-screen-grid-south"); // id attribute value of current off screen grid south tiles list
var htmlGridOffScreenWest = document.getElementById("off-screen-grid-west"); // id attribute value of current off screen grid west tiles list
var htmlGridActiveID; // data attribute screen-grid-tile value of active current screen grid
var htmlGridActiveIDCol; // active current screen grid's column value, last two digits of active grid id
var htmlGridActiveIDRow; // active current screen grid's row value, first two digits of active grid id
var movementOptionNorth;
var movementOptionEast;
var movementOptionSouth;
var movementOptionWest;
var currentGridTileArray = []; // array of current active screen grid tile values; use to match correlating values in array of tile grid definitions: providing collision detection
var currentGridTileStringBase = "tileGrid";
var gridTileDictionary = {
	"gridTiles": {
		"0": ["tile-stairs", "stairs-brown"], "1": ["tile-rock", "rock-brown"], "2": ["tile-khaki"], "3": ["tile-tree-left-top", "tree-brown"], "4": ["tile-tree-face", "tree-brown"], "5": ["tile-tree-right-top", "tree-brown"], "6": ["tile-stairs", "stairs-green"], "7": ["tile-rock", "rock-green"], "8": ["tile-bush", "bush-grey"], "9": ["tile-tree-left-top", "tree-green"], "0a": ["tile-tree-face", "tree-green"], "0b": ["tile-tree-right-top", "tree-green"], "0c": ["tile-stairs", "stairs-grey"], "0d": ["tile-rock", "rock-grey"], "0e": ["tile-grey"], "0f": ["tile-tree-left-top", "tree-grey"], "10": ["tile-tree-face", "tree-grey"], "11": ["tile-tree-right-top", "tree-grey"], "14": ["tile-ladder", "ladder-brown"], "15": ["tile-bush","bush-brown"], "16": ["tile-armos","armos-brown"], "17": ["tile-tree-left-bottom","tree-brown"], "18": ["tile-black"], "19": ["tile-tree-right-bottom","tree-brown"], "1a": ["tile-ladder","ladder-green"], "1b": ["tile-bush","bush-green"], "1c": ["tile-armos","armos-green"], "1d": ["tile-tree-left-bottom","tree-green"], "1e": ["tile-castle-cyclops","castle-green"], "1f": ["tile-tree-right-bottom","tree-green"], "20": ["tile-ladder","ladder-grey"], "21": ["tile-grave"], "22": ["tile-armos","armos-grey"], "23": ["tile-tree-left-bottom","tree-grey"], "24": ["tile-black"], "25": ["tile-tree-right-bottom","tree-grey"], "28": ["tile-rock-left-top","rock-brown"], "29": ["tile-rock-middle-top","rock-brown"], "2a": ["tile-rock-right-top","rock-brown"], "2b": ["tile-castle-right-top","castle-brown"], "2c": ["tile-castle-face","castle-brown"], "2d": ["tile-castle-left-top","castle-brown"], "2e": ["tile-rock-left-top","rock-green"], "2f": ["tile-rock-middle-top","rock-green"], "30": ["tile-rock-right-top","rock-green"], "31": ["tile-castle-left-top","castle-green"], "32": ["tile-castle-face","castle-green"], "33": ["tile-castle-right-top","castle-green"], "34": ["tile-rock-left-top","rock-grey"], "35": ["tile-rock-middle-top","rock-grey"], "36": ["tile-rock-right-top","rock-grey"], "37": ["tile-castle-left-top","castle-grey"], "38": ["tile-castle-cyclops","castle-grey"], "39": ["tile-castle-right-top","castle-grey"], "3c": ["tile-rock-left-bottom","rock-brown"], "3d": ["tile-rock-middle-bottom","rock-brown"], "3e": ["tile-rock-right-bottom","rock-brown"], "3f": ["tile-castle-left-bottom","castle-brown"], "40": ["tile-sand","sand-brown"], "41": ["tile-castle-right-bottom","castle-brown"], "42": ["tile-rock-left-bottom","rock-green"], "43": ["tile-rock-middle-bottom","rock-green"], "44": ["tile-rock-right-bottom","rock-green"], "45": ["tile-castle-left-bottom","castle-green"], "46": ["tile-waterfall-1"], "47": ["tile-castle-right-bottom","castle-green"], "48": ["tile-rock-left-bottom","rock-grey"], "49": ["tile-rock-middle-bottom","rock-grey"], "4a": ["tile-rock-right-bottom","rock-grey"], "4b": ["tile-castle-left-bottom","castle-grey"], "4c": ["tile-sand","sand-grey"], "4d": ["tile-castle-right-bottom","castle-grey"], "50": ["tile-coast-water-left-top","water-brown"], "51": ["tile-coast-water-middle-top","water-brown"], "52": ["tile-coast-water-right-top","water-brown"], "53": ["tile-coast-sand-left-top","sand-brown"], "54": ["tile-coast-sand-middle-top","sand-brown"], "55": ["tile-coast-sand-right-top","sand-brown"], "56": ["tile-coast-water-left-top","water-green"], "57": ["tile-coast-water-middle-top","water-green"], "58": ["tile-coast-water-right-top","water-green"], "59": ["tile-coast-sand-left-top","sand-green"], "5a": ["tile-coast-sand-middle-top","sand-green"], "5b": ["tile-coast-sand-right-top","sand-green"], "5c": ["tile-coast-water-left-top","water-grey"], "5d": ["tile-coast-water-middle-top","water-grey"], "5e": ["tile-coast-water-right-top","water-grey"], "5f": ["tile-coast-sand-left-top","sand-grey"], "60": ["tile-coast-sand-middle-top","sand-grey"], "61": ["tile-coast-sand-right-top","sand-grey"], "64": ["tile-coast-water-left-middle","water-brown"], "65": ["tile-coast-water-middle-middle","water-brown"], "66": ["tile-coast-water-right-middle","water-brown"], "67": ["tile-coast-sand-left-middle","sand-brown"], "68": ["tile-coast-sand-middle-middle","sand-brown"], "69": ["tile-coast-sand-right-middle","sand-brown"], "6a": ["tile-coast-water-left-middle","water-green"], "6b": ["tile-coast-water-middle-middle","water-green"], "6c": ["tile-coast-water-right-middle","water-green"], "6d": ["tile-coast-sand-left-middle","sand-green"], "6e": ["tile-coast-sand-middle-middle","sand-green"], "6f": ["tile-coast-sand-right-middle","sand-green"], "70": ["tile-coast-water-left-middle","water-grey"], "71": ["tile-coast-water-middle-middle","water-grey"], "72": ["tile-coast-water-bottom-middle","water-grey"], "73": ["tile-coast-sand-left-middle","sand-grey"], "74": ["tile-coast-sand-middle-middle","sand-grey"], "75": ["tile-coast-sand-right-middle","sand-grey"], "78": ["tile-coast-water-left-bottom","water-brown"], "79": ["tile-coast-water-middle-bottom","water-brown"], "7a": ["tile-coast-water-right-bottom","water-brown"], "7b": ["tile-coast-sand-left-bottom","sand-brown"], "7c": ["tile-coast-sand-middle-bottom","sand-brown"], "7d": ["tile-coast-sand-right-bottom","sand-brown"], "7e": ["tile-coast-water-left-bottom","water-green"], "7f": ["tile-coast-water-middle-bottom","water-green"], "80": ["tile-coast-water-right-bottom","water-green"], "81": ["tile-coast-sand-left-bottom","sand-green"], "82": ["tile-coast-sand-middle-bottom","sand-green"], "83": ["tile-coast-sand-right-bottom","sand-green"], "84": ["tile-coast-water-left-bottom","water-grey"], "85": ["tile-coast-water-middle-bottom","water-grey"], "86": ["tile-coast-water-right-bottom","water-grey"], "87": ["tile-coast-water-left-bottom","sand-grey"], "88": ["tile-coast-water-middle-bottom","sand-grey"], "89": ["tile-coast-water-right-bottom","sand-grey"], "8c": ["tile-coast-curve-left-top","water-brown"], "8d": ["tile-coast-curve-right-top","water-brown"], "8e": ["tile-coast-curve-left-bottom","water-brown"], "8f": ["tile-coast-curve-right-bottom","water-brown"], "90": ["tile-waterfall-2"], "91": ["tile-dock","dock-brown"], "92": ["tile-coast-curve-left-top","water-green"], "93": ["tile-coast-curve-right-top","water-green"], "94": ["tile-coast-curve-left-bottom","water-green"], "95": ["tile-coast-curve-right-bottom","water-green"], "96": ["tile-castle-face","castle-grey"], "97": ["tile-dock","dock-green"], "98": ["tile-coast-curve-left-top","water-grey"], "99": ["tile-coast-curve-right-top","water-grey"], "9a": ["tile-coast-curve-left-bottom","water-grey"], "9b": ["tile-coast-curve-right-bottom","water-grey"], "9c": ["tile-castle-cyclops","castle-brown"], "9d": ["tile-dock","dock-grey"]
	}
};
// pretty sure this exists: look above foo:   gridTilesDictionary[gridTiles]


var gridActiveID = function() { // get grid tile id via active current screen grid's data screen-grid-tile attribute value
	htmlGridActiveID = htmlGridActive.dataset.screenGridTile;
	return htmlGridActiveID;
};
var gridActiveIDRow = function() { // get grid tile row id via first two digits of active current screen grid's data screen-grid-tile attribute value
	htmlGridActiveIDRow = htmlGridActiveID.substring(0,2);
	console.log("active id row: " +htmlGridActiveIDRow);
	return htmlGridActiveIDRow;
};
var gridActiveIDCol = function() { // get grid tile col id via first two digits of active current screen grid's data screen-grid-tile attribute value
	htmlGridActiveIDCol = htmlGridActiveID.substring(2,4);
	return htmlGridActiveIDCol;
};
var linkCSSLeft = function() { // get link's current css left property value
	var linkCSSLeftVal = window.getComputedStyle(htmlLink,null).getPropertyValue("left");
	linkCSSLeftVal = parseInt(linkCSSLeftVal,10); //// // // // // // // console.log("Left value: " +linkCSSLeftVal);
	return linkCSSLeftVal;
};
var linkCSSTop = function(){ // get link's current css top property value
	var linkCSSTopVal = window.getComputedStyle(htmlLink,null).getPropertyValue("top");
	linkCSSTopVal = parseInt(linkCSSTopVal,10); //// // // // // // // console.log("top value: " +linkCSSTopVal);
	return linkCSSTopVal;
};

var gridArray = []; // array of current active screen grid tiles; 176 tiles = 16 tiles wide x 11* tiles high; *half of the eleventh row is cut off
var gridArrayTilePosition = []; // array of current active tile values (link is standing on) in current active screen grid array

function linksPosition(){
	let linkCSSTop = window.getComputedStyle(htmlLink,null).getPropertyValue("top");
	let linkCSSLeft = window.getComputedStyle(htmlLink,null).getPropertyValue("left");
	linkCSSTop = parseInt(linkCSSTop,10);
	linkCSSLeft = parseInt(linkCSSLeft,10); //// // // // // // // console.log("top test: " +linkCSSTop+ ", left test: " +linkCSSLeft); //// // // // // // // console.log("top test: " +parseInt(linkCSSTop)+ ", left test: " +parseInt(linkCSSLeft));
	let gridArray = [linkCSSTop, linkCSSLeft]; //// // // // // // // console.log("Grid array: " +gridArray);
	console.log("grid array via links position: ");
	console.log(gridArray);
	return gridArray;
}
gridArray = linksPosition(); // returns array of link's absolutely positioned css values in the active screen grid
function gridPosition(gridArray) {
	gridPositionTop = gridArray[0]/gridAspectRatio;
	gridPositionLeft = gridArray[1]/gridAspectRatio;
	// console.log("gpl: " +gridPositionLeft);
	return [gridPositionTop, gridPositionLeft]
}
gridArrayTilePosition = gridPosition(gridArray);
//console.log("grid array active tile position: " +gridArrayTilePosition);

var screenGrid = [] // array of screen grid coordinates
var screenGridId; // id of element containing hyrule gameplay elements
var screenGridPlot; // data attribute value of element containing hyrule gameplay elements; value is where screen grid is currently on the hyrule grid
var newGridPlot; // grid coordinates obtained from parsing data attribute value

function gridScreenPosition(){ // get screen grid id/coordinates
	screenGridId = document.getElementById("ul-screen-grid"); // get element by id
	screenGridPlot = screenGridId.dataset.screenGridTile; // get data attribute value
	return screenGridPlot;
}
var screenGridArray = [];

function parseGrid(){
	let gIDBase = gridActiveID(); // repeating yourself here....
	console.log("parse grid");
	console.log("grid active id: " +gIDBase);
	let gridID = currentGridTileStringBase + gIDBase; // repeating yourself here....
	console.log("grid id vars, string: " +currentGridTileStringBase + ", g id base: " +gIDBase);
	console.log("grid id: " +gridID);
	
	var screenGridRow1 = tileGrids[gridID].slice(0,16);
	var screenGridRow2 = tileGrids[gridID].slice(16,32);
	var screenGridRow3 = tileGrids[gridID].slice(32,48);
	var screenGridRow4 = tileGrids[gridID].slice(48,64);
	var screenGridRow5 = tileGrids[gridID].slice(64,80);
	var screenGridRow6 = tileGrids[gridID].slice(80,96);
	var screenGridRow7 = tileGrids[gridID].slice(96,112);
	var screenGridRow8 = tileGrids[gridID].slice(112,128);
	var screenGridRow9 = tileGrids[gridID].slice(128,144);
	var screenGridRow10 = tileGrids[gridID].slice(144,160);
	var screenGridRow11 = tileGrids[gridID].slice(160,176);
	screenGridArray = [screenGridRow1, screenGridRow2, screenGridRow3, screenGridRow4, screenGridRow5, screenGridRow6, screenGridRow7, screenGridRow8, screenGridRow9, screenGridRow10, screenGridRow11];
	return screenGridArray
};
var parseGridVar = parseGrid(); // returns active screen grid values
var gridLocationCoords = [];
var gridLocationCoordsX;
var gridLocationCoordsY;
var gridLocationTileDefinitionValue;
var gridLocationTileDefinition;
var gridLocationOptionDefinitions = [];
var gridLocationOptionNorthX;
var gridLocationOptionNorthY;
var gridLocationOptionsNorth = [];
var gridLocationOptionSouthX;
var gridLocationOptionSouthY;
var gridLocationOptionsSouth = [];
var gridLocationOptionEastX;
var gridLocationOptionEastY;
var gridLocationOptionsEast = [];
var gridLocationOptionWestX;
var gridLocationOptionWestY;
var gridLocationOptionsWest = [];

gridLocationCoords = gridPosition(gridArray); // location of character on active screen tile

// match character's position on grid with screen grid values, return position grid tile definition
function correlateGridLocations(gridLocationCoords, direction) {
	let xCoordinate = gridLocationCoords[0];
	let yCoordinate = gridLocationCoords[1];
	console.log("correlate grid location coords " +direction+ "; x: " +xCoordinate+ ", y: " +yCoordinate);
	
	// test if direction is active, if so, is the x coordinate above the half row? if yes, do something
	if((direction === "south") && (xCoordinate === 10)){
		console.log("direction is south and xCoordinate is above half row!");
		
	};
	

	//// // // // // console.log("y: " +zzz);
	// // console.log("x: " +xCoordinate+ ", y: " +yCoordinate+ ", direction: " +direction);
/**	
**	
**
**	this is where you stitch together moving from current active grid screen
**	to offscreen grid screen options......
**
**
**/
	// if x axis coordinate exeeds max (11 (11 rows)) or min (0) array values, DO SOMETHING...set to return false for now...
	if(xCoordinate > 11) {
		console.log("Here; false");
		// // console.log("PROBABLY NEED TO SKIP TO MAKE MOVE HERE YO!");
		return false;
	};
	if(xCoordinate < 0) {
		return false;
	};
	// if y axis coordinate exceeds max (15) or min (0) array values, DO SOMETHING...set to return false for now...
	if(yCoordinate > 15) {
		return false;
	};
	// // // // console.log("before the less than zero: " +htmlGridActiveID);
	if(yCoordinate < 0) {
		return false;
	};
	
	console.log("x coord: " + xCoordinate);
	console.log("parse grid var value: " +parseGridVar[xCoordinate]);
	
	gridLocationCoordsX = parseGridVar[xCoordinate];
	// // // // console.log("glcx: " +gridLocationCoordsX);
	gridLocationCoordsY = gridLocationCoordsX[yCoordinate];
	// // // // console.log("glcy: " +gridLocationCoordsY);
	let gIDBase = gridActiveID();
	let gID = currentGridTileStringBase + gIDBase;
	// // // // console.log("THIS VALUE: " +gID); // // // // // console.log("THIS VALUE: " +tileGrids[gID]);
	gridLocationTileDefinitionValue = tileGrids[gID][gridLocationCoordsY]; // // // // // // console.log("grid location tile definition value: " +gridLocationTileDefinitionValue);
	gridLocationTileDefinition = gridTileDictionary.gridTiles[gridLocationCoordsY]; // // // // // // console.log("coords: " +gridLocationCoords+ ", grid location tile Definition: " +gridLocationTileDefinition);
	return gridLocationTileDefinition
}
var correlateGridLocationsVal = correlateGridLocations(gridLocationCoords, "active"); // link object variable

var tileOptionNorth = []; // array of values correlating to tile character could move north on
var tileOptionEast = []; // array of values correlating to tile character could move east on
var tileOptionSouth = []; // array of values correlating to tile character could move south on
var tileOptionWest = []; // array of values correlating to tile character could move west on
var tileOptionsGrid = []; // array of values correlating to tiles character could make moves on (north, east, south, west)

// NNEEEDS TO BE ABLE TO HANDLE OFF GRID OPTIONS!!!!!
function correlateGridOptionLocations(gridLocationCoords){// get north, south, east, and west character movement option values
	gridLocationCoords = gridPosition(gridArray); // location of character on active screen tile.
	// // // console.log("gridLocationCoords: " + gridLocationCoords);
	gridLocationOptionNorthX = gridLocationCoords[0] - 1;
	gridLocationOptionNorthY = gridLocationCoords[1];
	gridLocationOptionsNorth = [gridLocationOptionNorthX, gridLocationOptionNorthY];
	
	// if x south option is 9, the 10th option should be half the height of regular move. so if each move is say, 32x32, this will be 32x16
	gridLocationOptionSouthX = gridLocationCoords[0] + 1;
	console.log("grid location option south x: " + gridLocationOptionSouthX);
	
	gridLocationOptionSouthY = gridLocationCoords[1];
	gridLocationOptionsSouth = [gridLocationOptionSouthX, gridLocationOptionSouthY];
	console.log("grid location option south x: " +gridLocationOptionsSouth+ ", X: " +gridLocationOptionSouthX+ ", Y: " +gridLocationOptionSouthY);
	
	gridLocationOptionEastX = gridLocationCoords[0];
	gridLocationOptionEastY = gridLocationCoords[1] + 1;
	// // // // // console.log("grid location option east y: " +gridLocationOptionEastY);
	

	gridLocationOptionsEast = [gridLocationOptionEastX, gridLocationOptionEastY];
	// // // // // console.log("east options: " +gridLocationOptionsEast);
	gridLocationOptionWestX = gridLocationCoords[0];
	gridLocationOptionWestY = gridLocationCoords[1] - 1;
	gridLocationOptionsWest = [gridLocationOptionWestX, gridLocationOptionWestY];
	// // // // console.log("west 2 options: " +gridLocationOptionsWest);
	northOption = correlateGridLocations(gridLocationOptionsNorth, "north");
	eastOption = correlateGridLocations(gridLocationOptionsEast, "east");
	
	console.log("WHERE THIS ERROR IS OCCURING!!!!");
	
	southOption = correlateGridLocations(gridLocationOptionsSouth, "south");
	westOption = correlateGridLocations(gridLocationOptionsWest, "west");
	// // // // console.log("west 2 option: " +westOption);
	// // // // // console.log("n: " + northOption[0] + ", e: " + eastOption[0] + ", s: " + southOption[0] + ", w: " + westOption[0]);
	gridOptions = [northOption[0], eastOption[0], southOption[0], westOption[0]]; // // // // // console.log("grid options: " + gridOptions);
	return [northOption, eastOption, southOption, westOption]
}

// correlateGridOptionLocations(gridLocationCoords);


// see if optionsTiles variable is listed in gridWalkability list, return if true
function opN(mOption){
	for(var i = 0; i < gridWalkability.length; i++) {
		
		if(mOption == gridWalkability[i]) { // equality operator because values are not of same type; mOption obj, gridWalk str, equality operator converts values before comparing them
			// // // // // // console.log("MATCH MAKER");
			return true;
		}
	};
};

var offScreenOptionNorth = []; // array returned if there is an offscreen tile option north; first value is true, there is an option, second is tile option's id value
var offScreenOptionEast = []; // array returned if there is an offscreen tile option east; first value is true, there is an option, second is tile option's id value
var offScreenOptionSouth = []; // array returned if there is an offscreen tile option south; first value is true, there is an option, second is tile option's id value
var offScreenOptionWest = []; // array returned if there is an offscreen tile option west; first value is true, there is an option, second is tile option's id value
// detect if there is an option north offscreen, return detection
function getOffScreenOptionsNorth(activeRow){ //// // // // // console.log("current n/s option to move off of is: " +activeRow);
	if(activeRow === 0) { // if active row is 0, we are at the top of hyrule and there is no north option
		return false;
	}
	let northOptionRowID = activeRow - 1; //// // // // // console.log("north option is: " +northOptionRowID);
	let northOptionTileID = "0" + northOptionRowID + htmlGridActiveIDCol; //// // // // // console.log("north option tile id: " +northOptionTileID);
	offScreenOptionNorth = [true, northOptionTileID];
	return offScreenOptionNorth;	
};
// detect if there is an option east offscreen, return detection
function getOffScreenOptionsEast(activeCol){ //// // // // // console.log("current n/s option to move off of is: " +activeRow);
	if(activeCol === 16) { // if active col is 16, we are at the eastmost column of hyrule and there is no east option
		return false;
	}
	//// // // // // console.log("east active col: " +activeCol);
	activeCol = parseInt(activeCol);
	//// // // // // console.log("east active col: " +activeCol);
	let eastOptionColID = activeCol + 1;
	//// // // // // console.log("east option is: " +eastOptionColID);
	let eastOptionTileID = htmlGridActiveIDRow + "0" + eastOptionColID;
	//// // // // // console.log("east option tile id: " +eastOptionTileID);
	offScreenOptionEast = [true, eastOptionTileID];
	return offScreenOptionEast;	
};
function getOffScreenOptionsSouth(activeRow) { 
	// // console.log("south option active row id: " +activeRow);
	activeRow = parseInt(activeRow); 
	// console.log("south option active row id post parseint yo: " +activeRow);
	
	
	/**if(activeRow === 9) { // if active row is 11, we are at the southernmost row of hyrule and there is no south option
		// // console.log("active row equals 9!");
		offScreenOptionSouth = false;
		return offScreenOptionSouth;
	};**/
	activeRow = parseInt(activeRow);
	let southOptionRowID = activeRow + 1;
	// // // console.log("south option row id: " +southOptionRowID);
	let southOptionTileID = "0" + southOptionRowID + htmlGridActiveIDCol;
	offScreenOptionSouth = [true, southOptionTileID];
	return offScreenOptionSouth;
};
function getOffScreenOptionsWest(activeCol) { //// // // // console.log("active column: " +activeCol);
	if(activeCol === 0) { // if active col is less than zero, we are at the westmost column of hyrule and there is no west option
		//// // // // console.log("active col is less than zero yo!");
		return false;
	};
	//// // // // console.log("active col pre parseint yo: " +activeCol);
	activeCol = parseInt(activeCol); // // // // // console.log("active col post parseint: " +activeCol);
	let westOptionColID = activeCol - 1; // // // // // console.log("west option col id: " +westOptionColID);
	let westOptionTileID = htmlGridActiveIDRow + "0" + westOptionColID; // // // // // console.log("west option tile id: " +westOptionTileID);
	offScreenOptionWest = [true, westOptionTileID]; // // // // // console.log("off screen option west: " +offScreenOptionWest);
	
	return offScreenOptionWest;
};


function getOffScreenGrids(gridDirection){
	// // // // // console.log("inside get off screen grids: ");
	// // // // // console.log(htmlGridActiveID);
	gridActiveIDRow();
	// // console.log("current grid row id: " +htmlGridActiveIDRow);
	gridActiveIDCol();
	//// // console.log(gridActiveIDCol());
	// // console.log("current grid col id: " +htmlGridActiveIDCol); 	// // // // console.log("grid direction to get: " +gridDirection);
	// detect if off screen tiles are movement options
	if(gridDirection === "north") {
		getOffScreenOptionsNorth(htmlGridActiveIDRow); // // // // // console.log("north options: " +offScreenOptionNorth);
		offScreenGridsOption = offScreenOptionNorth;
		return offScreenGridsOption;
	} else if (gridDirection === "east") {
		getOffScreenOptionsEast(htmlGridActiveIDCol); // // // // // console.log("east options: " +offScreenOptionEast);
		offScreenGridsOption = offScreenOptionEast;
		return offScreenGridsOption;
	} else if (gridDirection === "south") {
		// console.log("south direction, grid active id row: " +htmlGridActiveIDRow);
		// console.log("MAKE FUNCTION HERE THAT SKIPS EXTRA HALF ROW (16px)");
		getOffScreenOptionsSouth(htmlGridActiveIDRow);
		// console.log("south options: " +offScreenOptionSouth);
		offScreenGridsOption = offScreenOptionSouth;
		return offScreenGridsOption;
	} else if (gridDirection === "west") {
		getOffScreenOptionsWest(htmlGridActiveIDCol); // // // // // console.log("west options: " +offScreenOptionWest);
		offScreenGridsOption = offScreenOptionWest;
		return offScreenGridsOption;
	};
};
var getGrids;

// STILL NEED TO CORRELATE NESW WITH movementOptions.variables.....they are not at the moment!
function makeOptionsObject(optionsTiles) {
	var movementOptions = new Object();
	// console.log("XX: " +optionsTiles[0]);
	// console.log("XXX: " +opN(optionsTiles[2]));
	
	movementOptions.north = opN(optionsTiles[0]);
	movementOptions.east = opN(optionsTiles[1]);
	movementOptions.south = opN(optionsTiles[2]);
	movementOptions.west = opN(optionsTiles[3]);
		
	if(typeof movementOptions.north != "undefined") {
	
	} else {
		let gridNorth = "north";
		getGrids = getOffScreenGrids(gridNorth);
	};
	if(typeof movementOptions.east != "undefined") {
		// // // // // console.log("east movement option is defined; move along....east");
	} else {
		// // // // // console.log("east movement is not defined!");
		let gridEast = "east";
		getGrids = getOffScreenGrids(gridEast);
		// // // // // console.log("off screen grid option east: " +offScreenGridsOption);
	};
	if(typeof movementOptions.south != "undefined") {
	
	} else {
		let gridSouth = "south";
		// console.log("typeof: direction: " + gridSouth);
		getGrids = getOffScreenGrids(gridSouth);
		// console.log(getGrids);
	};
	if(typeof movementOptions.west != "undefined") {
	
	} else {
		let gridWest = "west";
		getGrids = getOffScreenGrids(gridWest);
	};
	return movementOptions
};

var tileMovementOptionsObject;

function locateLink() {
	linksPosition();
	gridArray = [linkCSSTop(), linkCSSLeft()]; // get clean values // // // // // console.log("GA: " +gridArray);
	gridScreenArray = gridPosition(gridArray); // get grid values
	// // // // // console.log("grid screen array: " +gridScreenArray); // // // // // console.log("grid location coords: " +gridLocationCoords);
	var thart = correlateGridOptionLocations(gridLocationCoords);
	// console.log("corrleate grid option locations passed grid lcoation coords: " +thart);
	optionsTiles = correlateGridOptionLocations(gridLocationCoords); // possible movement option tiles array
	// console.log("optionstiles array: " +optionsTiles);
	
	tileMovementOptionsObject = makeOptionsObject(optionsTiles);
	// console.log("tmoo: " +makeOptionsObject(optionsTiles[0]));
	// console.log("movement options north: " + tileMovementOptionsObject.north); // // // // // // // // console.log("movement options east: " + tileMovementOptionsObject.east); // // // // // // // // console.log("movement options south: " + tileMovementOptionsObject.south); // // // // // // // // console.log("movement options west: " + tileMovementOptionsObject.west);
	return tileMovementOptionsObject;
}


// EDIT THESE TO BE DYNAMIC FUCKOH!!!!!!!
var positionLeftNew; // value of left property, repositioning current character position via moveCharacter function
var positionTopNew; // value of top property, repositioning current character position via moveCharacter function
var positionMove = []; // array of top/left property values for repositioning current character position via moveCharacter function

//var positionLeftCurrent = 40; // value of character's current position; this is for dev only....DO NOT USE THIS MOVING FORWARD!!!!
//var positionTopCurrent = 256;

var positionCharacterCurrent; // current characters location on active screen grid
var positionCharacterMove; // location of character after most recent move on active screen grid; location after position move action....

var positionLeftCurrentCSS;
var positionTopCurrentCSS;
var positionCharacterCurrentCSS;
var positionCharacterMoveCSS;
var positionCharacterCurrentCSSValue;

var gridsToDelete = [];

function gridMoveDirectionNorth(grid, gridActive, gridEast, gridSouth, gridWest, gridActiveDiv, gridActiveUl) {
	//// // // // console.log("link: " +link[0]); YOU SHOULD USE THIS!!!!!
	let linkMoveNorth = document.getElementById("link");
	grid.classList.remove("screen-grid-tile-north");
	//gridActive.id = "grid-south";
	gridActive.classList.add("screen-grid-tile-south");
	gridActiveDiv.classList.add("grid-option-south");
	gridActiveDiv.classList.add("loz-game-offgrid");
	gridActiveDiv.id = "";
	gridActiveUl.id = "off-screen-grid-south";
	let gridUl = document.getElementById("off-screen-grid-north");
	gridUl.id = "ul-screen-grid";
	linkMoveNorth.style.setProperty("top", "304px"); // 304 (336-32 = 304) is last position in array at 32px aspect ratio scale
	gridUl.append(linkMoveNorth);
	gridUl.classList.remove("off-screen-grid");
	let gridDiv = gridUl.parentElement;
	gridDiv.classList.remove("loz-game-offgrid");
	gridDiv.classList.remove("grid-option-north");
	gridDiv.id = "loz-game";
	
	
	gridEast.classList.remove("screen-grid-tile-east");
	gridSouth.classList.remove("screen-grid-tile-south");
	gridWest.classList.remove("screen-grid-tile-west");
	gridActive.remove();
	gridEast.remove();
	gridSouth.remove();
	gridWest.remove();
};
function gridMoveDirectionEast(grid, gridActive, gridNorth, gridSouth, gridWest, gridActiveDiv, gridActiveUl) {
	grid.classList.remove("screen-grid-tile-east");
	gridActive.classList.add("screen-grid-tile-west");
	gridNorth.classList.remove("screen-grid-tile-north");
	gridSouth.classList.remove("screen-grid-tile-south");
	gridWest.classList.remove("screen-grid-tile-west");
	gridNorth.remove();
	gridSouth.remove();
	gridWest.remove();
};
function gridMoveDirectionSouth(grid, gridActive, gridNorth, gridEast, gridWest, gridActiveDiv, gridActiveUl) {
	grid.classList.remove("screen-grid-tile-south");
	gridActive.classList.add("screen-grid-tile-north");
	gridNorth.classList.remove("screen-grid-tile-north");
	gridEast.classList.remove("screen-grid-tile-east");
	gridWest.classList.remove("screen-grid-tile-west");
	gridNorth.remove();
	gridEast.remove();
	gridWest.remove();
};
function gridMoveDirectionWest(grid, gridActive, gridNorth, gridEast, gridSouth, gridActiveDiv, gridActiveUl) {
	grid.classList.remove("screen-grid-tile-west");
	gridActive.classList.add("screen-grid-tile-east");
	gridNorth.classList.remove("screen-grid-tile-north");
	gridEast.classList.remove("screen-grid-tile-east");
	gridSouth.classList.remove("screen-grid-tile-south");
	gridNorth.remove();
	gridEast.remove();
	gridSouth.remove();
};

function gridMoveUpdate(grid,direction){ // accept value of grid being moved to, and direction of grid and said move.
	// // // // console.log("grid move! grid: " +grid+ ", direction to move in: " +direction);
	// north/south require moving Link
	
	let gridNorth = document.getElementById("grid-north");
	let gridEast = document.getElementById("grid-east");
	let gridSouth = document.getElementById("grid-south");
	let gridWest = document.getElementById("grid-west");
	let gridActive = document.getElementById("grid-active"); // grab active grid element
	gridActive.id = ""; // update active grid element's id attribute
	grid.id = "grid-active"; // update to be moved grid's id attribute, making it the active grid
	gridActive.classList.remove("screen-grid-tile-active"); // remove previously active grid's css grid area denoted by class attribute
	grid.classList.add("screen-grid-tile-active"); // add active grid's class attribute activating css grid
	
	let gridActiveDiv = document.getElementById("loz-game");
	let gridActiveUl = document.getElementById("ul-screen-grid");

	//let gridActiveDiv // add "screen-grid-XXX" for whatever tile grid they are moving into, per function....
	
	if(direction === "north") {
		gridMoveDirectionNorth(grid, gridActive, gridEast, gridSouth, gridWest, gridActiveDiv, gridActiveUl);
	};
	if(direction === "east") {
		gridMoveDirectionEast(grid, gridActive, gridNorth, gridSouth, gridWest, gridActiveDiv, gridActiveUl);
	};
	if(direction === "south") {
		gridMoveDirectionSouth(grid, gridActive, gridNorth, gridEast, gridWest, gridActiveDiv, gridActiveUl);
	};
	if(direction === "west") {
		gridMoveDirectionWest(grid, gridActive, gridNorth, gridEast, gridSouth, gridActiveDiv, gridActiveUl);
	};


};
function moveCharacterEast(){
	positionCharacterCurrent = gridPosition(gridArray); // get current characters grid position in array
	positionLeftCurrent = parseInt(positionCharacterCurrent[1]); // get characters current left position value, convert to integer
	positionCharacterMove = positionLeftCurrent + 1; // update character left position value
	positionCharacterCurrent[1] = positionCharacterMove; // update character position array
	positionCharacterCurrentCSS = linksPosition();
	positionLeftCurrentCSS = parseInt(positionCharacterCurrentCSS[1]);
	positionCharacterMoveCSS = positionLeftCurrentCSS + 32;
	positionCharacterMoveCSSValue = positionCharacterMoveCSS + "px";
	htmlLink.style.setProperty("left", positionCharacterMoveCSSValue);
	positionCharacterCurrentCSS[1] = positionCharacterMoveCSS;	
	gridArray[1] = positionCharacterMoveCSS;
	gridScreenArray = gridPosition(gridArray); // // // // // console.log("east grid screen array: " + gridScreenArray);

	let eastGridVal = gridScreenArray[1];
	if(eastGridVal === 15) { // if we are on the array's 15th value, we are at its end. check if there is an option tile; is of, go east. if not, do nothing.
		let eastScreenGrid = document.getElementById("grid-east");
		let gridMoveDirection = "east";
		gridMoveUpdate(eastScreenGrid, gridMoveDirection);	
	};

	optionsTiles = correlateGridOptionLocations(gridLocationCoords);
	tileMovementOptionsObject = makeOptionsObject(optionsTiles);
/**
**
**
**
**	PUT LOGIC FOR MOVING TILE GRID SCREENS HERE YO!!!!!!!!
**
**
**
**
**
**
**
**
**/

// // // // // console.log("Here: " + tileMovementOptionsObject.east);
// // // // // console.log("movement options east: " + tileMovementOptionsObject.east);
	return positionCharacterCurrent;
};

function moveCharacterNorth(){
	positionCharacterCurrent = gridPosition(gridArray); // get current characters grid position in array
	positionTopCurrent = parseInt(positionCharacterCurrent[0]); // get characters current top position value, convert to integer
	positionCharacterMove = positionTopCurrent - 1; // update character top position value
	positionCharacterCurrent[0] = positionCharacterMove; // update character position array
	positionCharacterCurrentCSS = linksPosition();
	positionTopCurrentCSS = parseInt(positionCharacterCurrentCSS[0]);
	positionCharacterMoveCSS = positionTopCurrentCSS - 32;
	positionCharacterMoveCSSValue = positionCharacterMoveCSS + "px";
	htmlLink.style.setProperty("top", positionCharacterMoveCSSValue);
	positionCharacterCurrentCSS[0] = positionCharacterMoveCSS;
	gridArray[0] = positionCharacterMoveCSS;
	gridScreenArray = gridPosition(gridArray);
	
	let northGridVal = gridScreenArray[0];
	if(northGridVal === 0) { // if we are on the north/south array's first value, we are at its top, and there is no option north.
		//// // // // console.log("DO SOMETHING HERE!!!! TO TRIGGER POSSIBLE NORTH MOVEMENT OPTION IF THAT IS AVAILABLE!!!");
		let northScreenGrid = document.getElementById("grid-north");
		let gridMoveDirection = "north";
		gridMoveUpdate(northScreenGrid, gridMoveDirection);	
	};

	optionsTiles = correlateGridOptionLocations(gridLocationCoords);
	tileMovementOptionsObject = makeOptionsObject(optionsTiles);
	// // // // // console.log("movement options north: " + tileMovementOptionsObject.north);
	return positionCharacterCurrent;
};
function moveCharacterSouth(){
	positionCharacterCurrent = gridPosition(gridArray); // get current characters grid position in array
	// console.log("Current south position: " +positionCharacterCurrent);
	positionTopCurrent = parseInt(positionCharacterCurrent[0]); // get characters current top position value, convert to integer
	// // console.log("current south position: " +positionCharacterCurrent+ ", position top current: " +positionTopCurrent);
	
	positionCharacterMove = positionTopCurrent + 1; // update character top position value
	positionCharacterCurrent[0] = positionCharacterMove; // update character position array
	positionCharacterCurrentCSS = linksPosition();
	// // // console.log("xyxy: " +positionCharacterCurrentCSS);
	positionTopCurrentCSS = parseInt(positionCharacterCurrentCSS[0]);
	
	
	if(positionTopCurrent === 9) {
		// console.log("Current position HIT: " +positionTopCurrent);
		positionCharacterMoveCSS = positionTopCurrentCSS + 16;
	} else {
		positionCharacterMoveCSS = positionTopCurrentCSS + 32;
	};
	//positionCharacterMoveCSS = positionTopCurrentCSS + 32;
	positionCharacterMoveCSSValue = positionCharacterMoveCSS + "px";
	htmlLink.style.setProperty("top", positionCharacterMoveCSSValue);
	positionCharacterCurrentCSS[0] = positionCharacterMoveCSS;
	gridArray[0] = positionCharacterMoveCSS;
	// console.log("grid array zero: " +gridArray[0]);
	
	if(positionTopCurrent === 9){
		// console.log("position top current is triple equals nine: " +positionTopCurrent);
		// console.log(gridArray);
		//gridScreenArray = gridPosition(gridArray);
	};
	
	
	let southGridVal = gridScreenArray[0];
	// console.log("South grid value yo: " +southGridVal);
	
	if(southGridVal === 10) { // if we are on the north/south array's 11 (last) value, we are at its southernmost point, and there is no option south.
		// console.log("South grid value matches south grid val son!!!");
		
		// // // console.log("south is equal to level: " +southGridVal);
		let southScreenGrid = document.getElementById("grid-south");
		let gridMoveDirection = "south";
		gridMoveUpdate(southScreenGrid, gridMoveDirection);	
	};

	optionsTiles = correlateGridOptionLocations(gridLocationCoords);
	tileMovementOptionsObject = makeOptionsObject(optionsTiles);
	// // // console.log("movement options south: " + tileMovementOptionsObject.south);
	return positionCharacterCurrent;
};

function moveCharacterWest(){
	//update array
	positionCharacterCurrent = gridPosition(gridArray); // get current characters grid position in array
	positionLeftCurrent = parseInt(positionCharacterCurrent[1]); // get characters current left position value, convert to integer
	positionCharacterMove = positionLeftCurrent - 1; // update character left position value
	positionCharacterCurrent[1] = positionCharacterMove; // update character position array
	// update css positioning values
	positionCharacterCurrentCSS = linksPosition();
	// positionCharacterCurrentCSS = htmlLinkPosition;
	// // // // console.log("HERE: " +positionCharacterCurrentCSS);
	
	positionLeftCurrentCSS = parseInt(positionCharacterCurrentCSS[1]);
	positionCharacterMoveCSS = positionLeftCurrentCSS - 32;
	positionCharacterMoveCSSValue = positionCharacterMoveCSS + "px";
	htmlLink.style.setProperty("left", positionCharacterMoveCSSValue);
	positionCharacterCurrentCSS[1] = positionCharacterMoveCSS;
	gridArray[1] = positionCharacterMoveCSS;
	// this is repeated verbatim in linksPosition(); - port to a smaller function for both!!!!!!
	gridScreenArray = gridPosition(gridArray); // get grid values
	
	let westGridVal = gridScreenArray[1]; //// // // // console.log("HERE TOO: " +westGridVal);
	
	if(westGridVal === 0) { // if we are on the east/west array's 0 (first) value, we are at its westernmost point, and there is no option west.
		// // // // console.log("DO SOMETHING HERE!!!! TO TRIGGER POSSIBLE NORTH MOVEMENT OPTION IF THAT IS AVAILABLE!!!");
		let westScreenGrid = document.getElementById("grid-west");
		let gridMoveDirection = "west";
		gridMoveUpdate(westScreenGrid, gridMoveDirection);	
	};

	optionsTiles = correlateGridOptionLocations(gridLocationCoords); // possible movement option tiles array
// // // // // console.log("west optionstiles: " + optionsTiles);
	tileMovementOptionsObject = makeOptionsObject(optionsTiles);
// // // // // console.log("movement options west: " + tileMovementOptionsObject.west);
	return positionCharacterCurrent;
};










function moveCharacter(eventKey, optionDirection){ // // // // // console.log(eventKey);
	if(eventKey == "ArrowLeft") {
		positionMove = moveCharacterWest();
		// // // // console.log(positionCharacterCurrent);
		// // // // console.log("position move! move character left! updated active screen grid position: " + positionMove);
		return positionMove;
	} else if (eventKey == "ArrowUp") {
		positionMove = moveCharacterNorth();
		// // // // // // console.log(positionCharacterCurrent); // // // // // console.log("position move! move character up! updated active screen grid position: " + positionMove);
		return positionMove;
	} else if (eventKey == "ArrowRight") {
		positionMove = moveCharacterEast();
		// // // // // // console.log(positionCharacterCurrent); // // // // // console.log("position move! move character right! updated active screen grid position: " + positionMove);
		return positionMove;
	} else if (eventKey == "ArrowDown") {
		 // // console.log("arrow down: " +positionCharacterCurrent);
		positionMove = moveCharacterSouth();
		// // console.log(positionCharacterCurrent); // // // // // console.log("position move! move character down! updated active screen grid position: " + positionMove);
		return positionMove;
	};
};

var optionDirection; // tells moveCharacter function which direction to move character; passed into moveCharacter function from keydown event listener

// update character grid array position after movement
function updateCharacter(){};

function moveCharacter(eventKey, optionDirection){ // // // // // console.log(eventKey);
	if(eventKey == "ArrowLeft") {
		positionMove = moveCharacterWest();
		// // // // // // console.log(positionCharacterCurrent); // // // // // console.log("position move! move character left! updated active screen grid position: " + positionMove);
		return positionMove;
	} else if (eventKey == "ArrowUp") {
		positionMove = moveCharacterNorth();
		// // // // // // console.log(positionCharacterCurrent); // // // // // console.log("position move! move character up! updated active screen grid position: " + positionMove);
		return positionMove;
	} else if (eventKey == "ArrowRight") {
		positionMove = moveCharacterEast();
		// // // // // // console.log(positionCharacterCurrent); // // // // // console.log("position move! move character right! updated active screen grid position: " + positionMove);
		return positionMove;
	} else if (eventKey == "ArrowDown") {
		positionMove = moveCharacterSouth();
		// // console.log(positionCharacterCurrent); // // // // // console.log("position move! move character down! updated active screen grid position: " + positionMove);
		return positionMove;
	};
};

// keyboard arrow event listeners // https://eloquentjavascript.net/15_event.html
function keyDown() {
	window.addEventListener("keydown", event => { // // // // // console.log(tileMovementOptionsObject);
    if ((event.key == "ArrowLeft") && (tileMovementOptionsObject.west === true)) {
    	optionDirection = "west";
    	moveCharacter(event.key, optionDirection);
    } else if ((event.key == "ArrowUp") && (tileMovementOptionsObject.north === true)){
    	optionDirection = "north";
    	moveCharacter(event.key, optionDirection);
    } else if ((event.key == "ArrowRight") && (tileMovementOptionsObject.east === true)){
    	optionDirection = "east";
    	moveCharacter(event.key, optionDirection);
    } else if ((event.key == "ArrowDown") && (tileMovementOptionsObject.south === true)){
    	optionDirection = "south";
    	moveCharacter(event.key, optionDirection);
    }
  });
};

function keyUp() {
  window.addEventListener("keyup", event => {
    if ((event.key == "ArrowLeft") && (tileMovementOptionsObject.west === true)) {
    	//document.body.style.background = "";
    } else if ((event.key == "ArrowUp") && (tileMovementOptionsObject.north === true)) {
    	//document.body.style.background = "";
    } else if ((event.key == "ArrowRight") && (tileMovementOptionsObject.east === true)) {
    	//document.body.style.background = "";
    } else if ((event.key == "ArrowDown") && (tileMovementOptionsObject.south === true)) {
    	//document.body.style.background = "";
    }
    // // // // // console.log("keyup!");
  });
};



// create link character object 
var link = {
	//position: [cssTop, cssLeft], // current position of link
	// healthScore:
	// linkType:
	// swordType:
	// shieldType:
	// inventory:
	// money
	//onKeyUp: onKeyUp(),
	//onKeyDown: onKeyDown(),
	//onPause: onPause(),
	//onEnter: onEnter(),
	//gridOffScreenNorthID: gridOffScreenNorthID(),
	//gridOffScreenEastID: gridOffScreenEastID(),
	//gridOffScreenSouthID: gridOffScreenSouthID(),
	//gridOffScreenWestID: gridOffScreenWestID(),
	positionCSS: linksPosition(),
	positionOnActiveGridCurrentTile: correlateGridLocationsVal,
	positionOfOptionTilesGrid: correlateGridOptionLocations(gridLocationCoords),
	onKeyDown: keyDown(),
	onKeyUp: keyUp()
	//gridActiveID: gridActiveID(), // current active grid data attribute id value
	//gridActiveIDRow: gridActiveIDRow(),
	//gridActiveIDCol: gridActiveIDCol(),
	//moveOptions: [moveOptionNorth(), moveOptionEast(), moveOptionSouth(), moveOptionWest()],
	//gridArrayPosition: gridArrayPosition(),
	//gridArrayPositionPercentage: gridArrayPositionPercentage(),
	//gridArrayCurrent: gridArrayCurrent(),
	//gridArrayOptions: gridArrayOptions()
	//gridArrayOptionsTiles: gridArrayOptionsTiles()
	//gridArrayOptionTiles: getCurrentGridTileOptions()
	//moveOptionNorth: moveOptionNorth()
	//gridOffScreenIDs: [gridOffScreenIDNorth, gridOffScreenIDEast, gridOffScreenIDSouth, gridOffScreenIDWest] // current offscreen grid options/movements
};
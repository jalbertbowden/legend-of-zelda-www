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
	return htmlGridActiveIDRow;
};
var gridActiveIDCol = function() { // get grid tile col id via first two digits of active current screen grid's data screen-grid-tile attribute value
	htmlGridActiveIDCol = htmlGridActiveID.substring(2,4);
	return htmlGridActiveIDCol;
};
var linkCSSLeft = function() { // get link's current css left property value
	var linkCSSLeftVal = window.getComputedStyle(htmlLink,null).getPropertyValue("left");
	linkCSSLeftVal = parseInt(linkCSSLeftVal,10); //// // // console.log("Left value: " +linkCSSLeftVal);
	return linkCSSLeftVal;
};
var linkCSSTop = function(){ // get link's current css top property value
	var linkCSSTopVal = window.getComputedStyle(htmlLink,null).getPropertyValue("top");
	linkCSSTopVal = parseInt(linkCSSTopVal,10); //// // // console.log("top value: " +linkCSSTopVal);
	return linkCSSTopVal;
};

var gridArray = []; // array of current active screen grid tiles; 176 tiles = 16 tiles wide x 11* tiles high; *half of the eleventh row is cut off
var gridArrayTilePosition = []; // array of current active tile values (link is standing on) in current active screen grid array

function linksPosition(){
	let linkCSSTop = window.getComputedStyle(htmlLink,null).getPropertyValue("top");
	let linkCSSLeft = window.getComputedStyle(htmlLink,null).getPropertyValue("left");
	linkCSSTop = parseInt(linkCSSTop,10);
	linkCSSLeft = parseInt(linkCSSLeft,10); //// // // console.log("top test: " +linkCSSTop+ ", left test: " +linkCSSLeft); //// // // console.log("top test: " +parseInt(linkCSSTop)+ ", left test: " +parseInt(linkCSSLeft));
	let gridArray = [linkCSSTop, linkCSSLeft]; //// // // console.log("Grid array: " +gridArray);
	return gridArray;
}
gridArray = linksPosition(); // returns array of link's absolutely positioned css values in the active screen grid
function gridPosition(gridArray) {
	gridPositionTop = gridArray[0]/gridAspectRatio;
	gridPositionLeft = gridArray[1]/gridAspectRatio;
	return [gridPositionTop, gridPositionLeft]
}
gridArrayTilePosition = gridPosition(gridArray); //// // // console.log("grid array active tile position: " +gridArrayTilePosition);

var screenGrid = [] // array of screen grid coordinates
var screenGridId; // id of element containing hyrule gameplay elements
var screenGridPlot; // data attribute value of element containing hyrule gameplay elements; value is where screen grid is currently on the hyrule grid
var newGridPlot; // grid coordinates obtained from parsing data attribute value

function gridScreenPosition(){ // get screen grid id/coordinates
	screenGridId = document.getElementById("ul-screen-grid"); // get element by id
	screenGridPlot = screenGridId.dataset.screenGridTile; // get data attribute value
	return screenGridPlot
}
var screenGridArray = [];
function parseGrid(){
	let gIDBase = gridActiveID(); // repeating yourself here....
	let gridID = currentGridTileStringBase + gIDBase; // repeating yourself here....
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
	//// console.log("y: " +zzz);
	// console.log("x: " +xCoordinate+ ", y: " +yCoordinate+ ", direction: " +direction);
/**	
**	
**
**	this is where you stitch together moving from current active grid screen
**	to offscreen grid screen options......
**
**
**/
	// if x axis coordinate exeeds max (11) or min (0) array values, DO SOMETHING...set to return false for now...
	if(xCoordinate > 11) {
		return false;
	};
	if(xCoordinate < 0) {
		return false;
	};
	// if y axis coordinate exceeds max (15) or min (0) array values, DO SOMETHING...set to return false for now...
	if(yCoordinate > 15) {
		return false;
	};
	if(yCoordinate < 0) {
		return false;
	};
	
	gridLocationCoordsX = parseGridVar[xCoordinate]; // // console.log("glcx: " +gridLocationCoordsX);
	gridLocationCoordsY = gridLocationCoordsX[yCoordinate]; // // console.log("glcy: " +gridLocationCoordsY);
	let gIDBase = gridActiveID();
	let gID = currentGridTileStringBase + gIDBase;
	// console.log("THIS VALUE: " +gID); // console.log("THIS VALUE: " +tileGrids[gID]);
	gridLocationTileDefinitionValue = tileGrids[gID][gridLocationCoordsY]; // // console.log("grid location tile definition value: " +gridLocationTileDefinitionValue);
	gridLocationTileDefinition = gridTileDictionary.gridTiles[gridLocationCoordsY]; // // console.log("coords: " +gridLocationCoords+ ", grid location tile Definition: " +gridLocationTileDefinition);
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
	gridLocationCoords = gridPosition(gridArray); // location of character on active screen tile. // // console.log("gridLocationCoords: " + gridLocationCoords);
	gridLocationOptionNorthX = gridLocationCoords[0] - 1;
	gridLocationOptionNorthY = gridLocationCoords[1];
	gridLocationOptionsNorth = [gridLocationOptionNorthX, gridLocationOptionNorthY];
	gridLocationOptionSouthX = gridLocationCoords[0] + 1;
	gridLocationOptionSouthY = gridLocationCoords[1];
	gridLocationOptionsSouth = [gridLocationOptionSouthX, gridLocationOptionSouthY];
	
	
	gridLocationOptionEastX = gridLocationCoords[0];
	gridLocationOptionEastY = gridLocationCoords[1] + 1;
	// console.log("grid location option east y: " +gridLocationOptionEastY);
	
	if (gridLocationOptionEastY > 15) {
		// console.log("east options array exceeded!");
	}
	gridLocationOptionsEast = [gridLocationOptionEastX, gridLocationOptionEastY];
	// console.log("east options: " +gridLocationOptionsEast);
	gridLocationOptionWestX = gridLocationCoords[0];
	gridLocationOptionWestY = gridLocationCoords[1] - 1;
	gridLocationOptionsWest = [gridLocationOptionWestX, gridLocationOptionWestY];	
	northOption = correlateGridLocations(gridLocationOptionsNorth, "north");
	eastOption = correlateGridLocations(gridLocationOptionsEast, "east");
	// console.log("east option: " +eastOption);
	
	southOption = correlateGridLocations(gridLocationOptionsSouth, "south");
	westOption = correlateGridLocations(gridLocationOptionsWest, "west");
// console.log("n: " + northOption[0] + ", e: " + eastOption[0] + ", s: " + southOption[0] + ", w: " + westOption[0]);
	gridOptions = [northOption[0], eastOption[0], southOption[0], westOption[0]];
// console.log("grid options: " + gridOptions);
	return [northOption, eastOption, southOption, westOption]
}

// correlateGridOptionLocations(gridLocationCoords);


// see if optionsTiles variable is listed in gridWalkability list, return if true
function opN(mOption){
	for(var i = 0; i < gridWalkability.length; i++) {
		//let newmOption = mOption;
		//let gridWalk = gridWalkability[i];
		// // // console.log("HERE: " +newmOption+ ", " +gridWalk);
		
		if(mOption == gridWalkability[i]) { // equality operator because values are not of same type; mOption obj, gridWalk str, equality operator converts values before comparing them
			// // console.log("MATCH MAKER");
			return true;
		}
	};
};

var offScreenOptionNorth = []; // array returned if there is an offscreen tile option north; first value is true, there is an option, second is tile option's id value
var offScreenOptionEast = []; // array returned if there is an offscreen tile option east; first value is true, there is an option, second is tile option's id value
var offScreenOptionSouth = []; // array returned if there is an offscreen tile option south; first value is true, there is an option, second is tile option's id value
var offScreenOptionWest = []; // array returned if there is an offscreen tile option west; first value is true, there is an option, second is tile option's id value
// detect if there is an option north offscreen, return detection
function getOffScreenOptionsNorth(activeRow){ //// console.log("current n/s option to move off of is: " +activeRow);
	if(activeRow === 0) { // if active row is 0, we are at the top of hyrule and there is no north option
		return false;
	}
	let northOptionRowID = activeRow - 1; //// console.log("north option is: " +northOptionRowID);
	let northOptionTileID = "0" + northOptionRowID + htmlGridActiveIDCol; //// console.log("north option tile id: " +northOptionTileID);
	offScreenOptionNorth = [true, northOptionTileID];
	return offScreenOptionNorth;	
};
// detect if there is an option east offscreen, return detection
function getOffScreenOptionsEast(activeCol){ //// console.log("current n/s option to move off of is: " +activeRow);
	if(activeCol === 16) { // if active col is 16, we are at the eastmost column of hyrule and there is no east option
		return false;
	}
	//// console.log("east active col: " +activeCol);
	activeCol = parseInt(activeCol);
	//// console.log("east active col: " +activeCol);
	let eastOptionColID = activeCol + 1;
	//// console.log("east option is: " +eastOptionColID);
	let eastOptionTileID = htmlGridActiveIDRow + "0" + eastOptionColID;
	//// console.log("east option tile id: " +eastOptionTileID);
	offScreenOptionEast = [true, eastOptionTileID];
	return offScreenOptionEast;	
};
function getOffScreenOptionsSouth(activeRow) {
	//// console.log("south option active row id: " +activeRow);
	activeRow = parseInt(activeRow);
	//// console.log("south option active row id post parseint yo: " +activeRow);
	
	
	if(activeRow === 8) { // if active row is 11, we are at the southernmost row of hyrule and there is no south option
		offScreenOptionSouth = false;
		return offScreenOptionSouth;
	};
	activeRow = parseInt(activeRow);
	let southOptionRowID = activeRow + 1;
	//// console.log("south option row id: " +southOptionRowID);
	let southOptionTileID = "0" + southOptionRowID + htmlGridActiveIDCol;
	offScreenOptionSouth = [true, southOptionTileID];
	return offScreenOptionSouth;
};
function getOffScreenOptionsWest(activeCol) {
	if(activeCol < 0) { // if active col is less than zero, we are at the westmost column of hyrule and there is no west option
		return false;
	};
	activeCol = parseInt(activeCol);
	let westOptionColID = activeCol - 1;
	let westOptionTileID = htmlGridActiveIDRow + "0" + westOptionColID;
	offScreenOptionWest = [true, westOptionTileID];
	return offScreenOptionWest;
};





function getOffScreenGrids(gridDirection){
	// console.log("inside get off screen grids: ");
	// console.log(htmlGridActiveID);
	gridActiveIDRow();
	// console.log("current grid row id: " +htmlGridActiveIDRow);
	gridActiveIDCol();
	// console.log("current grid col id: " +htmlGridActiveIDCol);
	// detect if off screen tiles are movement options
	// console.log("grid direction to get: " +gridDirection);
	if(gridDirection === "north") {
		getOffScreenOptionsNorth(htmlGridActiveIDRow);
		// console.log("north options: " +offScreenOptionNorth);
		offScreenGridsOption = offScreenOptionNorth;
		return offScreenGridsOption;
	} else if (gridDirection === "east") {
		getOffScreenOptionsEast(htmlGridActiveIDCol);
		// console.log("east options: " +offScreenOptionEast);
		offScreenGridsOption = offScreenOptionEast;
		return offScreenGridsOption;
	} else if (gridDirection === "south") {
		getOffScreenOptionsSouth(htmlGridActiveIDRow);
		// console.log("south options: " +offScreenOptionSouth);
		offScreenGridsOption = offScreenOptionSouth;
		return offScreenGridsOption;
	} else if (gridDirection === "west") {
		getOffScreenOptionsWest(htmlGridActiveIDCol);
		// console.log("west options: " +offScreenOptionWest);
		offScreenGridsOption = offScreenGridsOptionWest;
		return offScreenGridsOption;
	};
};
var getGrids;

// STILL NEED TO CORRELATE NESW WITH movementOptions.variables.....they are not at the moment!
function makeOptionsObject(optionsTiles) {
	var movementOptions = new Object();
	// // console.log("XX: " +optionsTiles[0]);
	// // console.log("XXX: " +opN(optionsTiles[0]));
	 
	
	movementOptions.north = opN(optionsTiles[0]);
	movementOptions.east = opN(optionsTiles[1]);
	movementOptions.south = opN(optionsTiles[2]);
	movementOptions.west = opN(optionsTiles[3]);
	
	if(typeof movementOptions.east != "undefined") {
		// console.log("east movement option is defined; move along....east");
	} else {
		// console.log("east movement is not defined!");
		let gridEast = "east";
		getGrids = getOffScreenGrids(gridEast);
		// console.log("off screen grid option east: " +offScreenGridsOption);
	};
	// // console.log("moveopt north: " +movementOptions.north);
	// // console.log("moveopt east: " +movementOptions.east);
	// // console.log("moveopt south: " +movementOptions.south);
	// // console.log("moveopt west: " +movementOptions.west);
	// // // // // console.log(movementOptions.north);
	return movementOptions
};
//var optionsTiles = correlateGridOptionLocations(gridLocationCoords); // possible movement option tiles array
//// // // console.log(optionsTiles);

//makeOptionsObject(optionsTiles);

var tileMovementOptionsObject;

function locateLink() {
	// // console.log("Locate Link Triggered!");
	linksPosition();
	//gridArray = stripStrings(linkCSSTop, linkCSSLeft); // get clean values
	gridArray = [linkCSSTop(), linkCSSLeft()];
	// // console.log("GA: " +gridArray);
	gridScreenArray = gridPosition(gridArray); // get grid values
	// // console.log("grid screen array: " +gridScreenArray);
	// // console.log("grid location coords: " +gridLocationCoords);
	var thart = correlateGridOptionLocations(gridLocationCoords);
	// // console.log("corrleate grid option locations passed grid lcoation coords: " +thart);
	optionsTiles = correlateGridOptionLocations(gridLocationCoords); // possible movement option tiles array
	// // console.log("optionstiles array: " +optionsTiles);
	
	tileMovementOptionsObject = makeOptionsObject(optionsTiles);
	// // console.log("tmoo: " +makeOptionsObject(optionsTiles[0]));
	
	// // console.log("movement options north: " + tileMovementOptionsObject.north); // // // // console.log("movement options east: " + tileMovementOptionsObject.east); // // // // console.log("movement options south: " + tileMovementOptionsObject.south); // // // // console.log("movement options west: " + tileMovementOptionsObject.west);
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

function moveCharacterWest(){
	//update array
	positionCharacterCurrent = gridPosition(gridArray); // get current characters grid position in array
	positionLeftCurrent = parseInt(positionCharacterCurrent[1]); // get characters current left position value, convert to integer
	positionCharacterMove = positionLeftCurrent - 1; // update character left position value
	positionCharacterCurrent[1] = positionCharacterMove; // update character position array
	// update css positioning values
	positionCharacterCurrentCSS = linksPosition();
	// positionCharacterCurrentCSS = htmlLinkPosition;
	// // // console.log("HERE: " +positionCharacterCurrentCSS);
	
	positionLeftCurrentCSS = parseInt(positionCharacterCurrentCSS[1]);
	positionCharacterMoveCSS = positionLeftCurrentCSS - 32;
	positionCharacterMoveCSSValue = positionCharacterMoveCSS + "px";
	htmlLink.style.setProperty("left", positionCharacterMoveCSSValue);
	positionCharacterCurrentCSS[1] = positionCharacterMoveCSS;
	gridArray[1] = positionCharacterMoveCSS;
	// this is repeated verbatim in linksPosition(); - port to a smaller function for both!!!!!!
	gridScreenArray = gridPosition(gridArray); // get grid values
	optionsTiles = correlateGridOptionLocations(gridLocationCoords); // possible movement option tiles array
// console.log("west optionstiles: " + optionsTiles);
	tileMovementOptionsObject = makeOptionsObject(optionsTiles);
// console.log("movement options west: " + tileMovementOptionsObject.west);
	return positionCharacterCurrent;
};
function moveCharacterEast(){
	positionCharacterCurrent = gridPosition(gridArray); // get current characters grid position in array
	//// console.log("current values in grid array for east grid position: " +positionCharacterCurrent);
		
		
	positionLeftCurrent = parseInt(positionCharacterCurrent[1]); // get characters current left position value, convert to integer
	positionCharacterMove = positionLeftCurrent + 1; // update character left position value
// console.log("updated location array: " + positionCharacterCurrent); // THIS ACTUALLY DOES NOTHING! NEED TO UPDATE gridPosition(gridArray) YO!!!!
	positionCharacterCurrent[1] = positionCharacterMove; // update character position array
	positionCharacterCurrentCSS = linksPosition();
	positionLeftCurrentCSS = parseInt(positionCharacterCurrentCSS[1]);
	positionCharacterMoveCSS = positionLeftCurrentCSS + 32;
	positionCharacterMoveCSSValue = positionCharacterMoveCSS + "px";
	htmlLink.style.setProperty("left", positionCharacterMoveCSSValue);
	positionCharacterCurrentCSS[1] = positionCharacterMoveCSS;	
	gridArray[1] = positionCharacterMoveCSS;
	gridScreenArray = gridPosition(gridArray);
// console.log("east grid screen array: " + gridScreenArray);
	// console.log("east coordinate: " +gridScreenArray[0]+ ", west coordinate: " +gridScreenArray[1]);
	let eastGridVal = gridScreenArray[1];
	if(eastGridVal === 15) {
		console.log("DO SOMETHING HERE!!!! TO TRIGGER POSSIBLE EAST MOVEMENT OPTION IF THAT IS AVAILABLE!!!");
	}

	optionsTiles = correlateGridOptionLocations(gridLocationCoords);
// console.log("east optionstile: " + optionsTiles);
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

// console.log("Here: " + tileMovementOptionsObject.east);
// console.log("movement options east: " + tileMovementOptionsObject.east);
	return positionCharacterCurrent;
};

function moveCharacterNorth(){
// console.log("move character north function yo!");
	positionCharacterCurrent = gridPosition(gridArray); // get current characters grid position in array
	positionTopCurrent = parseInt(positionCharacterCurrent[0]); // get characters current top position value, convert to integer
// console.log("north position top current: " + positionTopCurrent);
	positionCharacterMove = positionTopCurrent - 1; // update character top position value
// console.log("updated location array: " + positionCharacterCurrent); // THIS ACTUALLY DOES NOTHING! NEED TO UPDATE gridPosition(gridArray) YO!!!!
	positionCharacterCurrent[0] = positionCharacterMove; // update character position array
// console.log("YOYO: " + positionCharacterCurrent[0]);
	positionCharacterCurrentCSS = linksPosition();
// console.log("SOUTH POSITION CHARR CURRENT CSS: " + positionCharacterCurrentCSS);
	
	positionTopCurrentCSS = parseInt(positionCharacterCurrentCSS[0]);
	positionCharacterMoveCSS = positionTopCurrentCSS - 32;
	positionCharacterMoveCSSValue = positionCharacterMoveCSS + "px";
	htmlLink.style.setProperty("top", positionCharacterMoveCSSValue);
	positionCharacterCurrentCSS[0] = positionCharacterMoveCSS;
	//var testy = window.getComputedStyle(link,null).getPropertyValue('top');
// console.log("TESTY: " + testy);
	gridArray[0] = positionCharacterMoveCSS;
	gridScreenArray = gridPosition(gridArray);
	optionsTiles = correlateGridOptionLocations(gridLocationCoords);
	tileMovementOptionsObject = makeOptionsObject(optionsTiles);
	// console.log("movement options north: " + tileMovementOptionsObject.north);
	return positionCharacterCurrent;
};
function moveCharacterSouth(){
	positionCharacterCurrent = gridPosition(gridArray); // get current characters grid position in array
	// // console.log("south position character current: " + positionCharacterCurrent);
	positionTopCurrent = parseInt(positionCharacterCurrent[0]); // get characters current top position value, convert to integer
	// // console.log("south position top current: " + positionTopCurrent);
	positionCharacterMove = positionTopCurrent + 1; // update character top position value
	// // console.log("XXXX " + positionCharacterMove);
	// // console.log("updated location array: " + positionCharacterCurrent); // THIS ACTUALLY DOES NOTHING! NEED TO UPDATE gridPosition(gridArray) YO!!!!
	positionCharacterCurrent[0] = positionCharacterMove; // update character position array
	// // console.log("updated location array: " + positionCharacterCurrent);
	positionCharacterCurrentCSS = linksPosition();
	// // console.log("position character current css move character south: " + positionCharacterCurrentCSS);
	positionTopCurrentCSS = parseInt(positionCharacterCurrentCSS[0]);
	positionCharacterMoveCSS = positionTopCurrentCSS + 32;
	positionCharacterMoveCSSValue = positionCharacterMoveCSS + "px";
	htmlLink.style.setProperty("top", positionCharacterMoveCSSValue);
	positionCharacterCurrentCSS[0] = positionCharacterMoveCSS;
	// console.log("position character current css first: " +positionCharacterCurrentCSS[0]); // console.log(gridArray);
	gridArray[0] = positionCharacterMoveCSS;
	
	
	
	var testy = window.getComputedStyle(htmlLink,null).getPropertyValue('top');
	// // console.log("TESTY: " + testy + ", gridArray: " + gridArray);
	
	
	gridScreenArray = gridPosition(gridArray);
	optionsTiles = correlateGridOptionLocations(gridLocationCoords);
	tileMovementOptionsObject = makeOptionsObject(optionsTiles); // // console.log("movement options south: " + tileMovementOptionsObject.south);
	return positionCharacterCurrent;
};

function moveCharacter(eventKey, optionDirection){ // // console.log(eventKey);
	if(eventKey == "ArrowLeft") {
		positionMove = moveCharacterWest();
		// // console.log(positionCharacterCurrent); // console.log("position move! move character left! updated active screen grid position: " + positionMove);
		return positionMove;
	} else if (eventKey == "ArrowUp") {
		positionMove = moveCharacterNorth();
		// // console.log(positionCharacterCurrent); // console.log("position move! move character up! updated active screen grid position: " + positionMove);
		return positionMove;
	} else if (eventKey == "ArrowRight") {
		positionMove = moveCharacterEast();
		// // console.log(positionCharacterCurrent); // console.log("position move! move character right! updated active screen grid position: " + positionMove);
		return positionMove;
	} else if (eventKey == "ArrowDown") {
		positionMove = moveCharacterSouth();
		// // console.log(positionCharacterCurrent); // console.log("position move! move character down! updated active screen grid position: " + positionMove);
		return positionMove;
	};
};

var optionDirection; // tells moveCharacter function which direction to move character; passed into moveCharacter function from keydown event listener

// update character grid array position after movement
function updateCharacter(){};

function moveCharacter(eventKey, optionDirection){ // // console.log(eventKey);
	if(eventKey == "ArrowLeft") {
		positionMove = moveCharacterWest();
		// // console.log(positionCharacterCurrent); // console.log("position move! move character left! updated active screen grid position: " + positionMove);
		return positionMove;
	} else if (eventKey == "ArrowUp") {
		positionMove = moveCharacterNorth();
		// // console.log(positionCharacterCurrent); // console.log("position move! move character up! updated active screen grid position: " + positionMove);
		return positionMove;
	} else if (eventKey == "ArrowRight") {
		positionMove = moveCharacterEast();
		// // console.log(positionCharacterCurrent); // console.log("position move! move character right! updated active screen grid position: " + positionMove);
		return positionMove;
	} else if (eventKey == "ArrowDown") {
		positionMove = moveCharacterSouth();
		// // console.log(positionCharacterCurrent); // console.log("position move! move character down! updated active screen grid position: " + positionMove);
		return positionMove;
	};
};

// keyboard arrow event listeners
function keyDown() {
	window.addEventListener("keydown", event => {// https://eloquentjavascript.net/15_event.html
	// listen for keypress event on arrow keys; if key is left and left tile option permits movement, do something
	// // console.log(tileMovementOptionsObject);
	
    if ((event.key == "ArrowLeft") && (tileMovementOptionsObject.west === true)) {
    	optionDirection = "west";
    	// console.log("move character west!");
    	document.body.style.background = "violet";
    	moveCharacter(event.key, optionDirection);
    	
    } else if ((event.key == "ArrowUp") && (tileMovementOptionsObject.north === true)){
    	optionDirection = "north";
    	// console.log("move character north!");
    	document.body.style.background = "black";
    	moveCharacter(event.key, optionDirection);
    } else if ((event.key == "ArrowRight") && (tileMovementOptionsObject.east === true)){
    	optionDirection = "east";
    	// console.log("Move character east!");
    	document.body.style.background = "grey";
    	moveCharacter(event.key, optionDirection);
    } else if ((event.key == "ArrowDown") && (tileMovementOptionsObject.south === true)){
    	optionDirection = "south";
    	// console.log("Move character south!");
    	document.body.style.background = "#f00";
    	moveCharacter(event.key, optionDirection);
    }
  });
};

function keyUp() {
  window.addEventListener("keyup", event => {
    if ((event.key == "ArrowLeft") && (tileMovementOptionsObject.west === true)) {
    	document.body.style.background = "";
    } else if ((event.key == "ArrowUp") && (tileMovementOptionsObject.north === true)) {
    	document.body.style.background = "";
    } else if ((event.key == "ArrowRight") && (tileMovementOptionsObject.east === true)) {
    	document.body.style.background = "";
    } else if ((event.key == "ArrowDown") && (tileMovementOptionsObject.south === true)) {
    	document.body.style.background = "";
    }
    //// // // // console.log("keyup!");
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
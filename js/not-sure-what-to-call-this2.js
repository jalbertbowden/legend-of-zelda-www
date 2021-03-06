// GLOBALS
var htmlLink = document.getElementById("link"); // character link's html element
var htmlLinkPositionCSS = []; // links current position;
var screenHeight = 448; // game viewport height
var screenWidth = 512; // game viewport width
var screenAspectRatio = 32; // currently setting each tile to 32px x 32px 
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

// gridTilesDictionary[gridTiles]
// gridDictionary;
// get active screen grid id/coordinates
function gridScreenPosition(){
	console.log(htmlLinkPositionCSS);
	//screenGridId = document.getElementById("screen-grid"); // get element by id
	screenGridId = document.getElementById("ul-screen-grid"); // get screen grid/tiles options grid parent container element by id
	screenGridPlot = screenGridId.dataset.screenGridTile; // get data attribute value
	return screenGridPlot;
}
function parseGrid(){
	let screenGridElementId = currentGridTileStringBase + gridScreenPosition(); // get desired tileGrid array value for active screen grid
	console.log(gridScreenPosition());
	console.log(screenGridElementId);
	
	screenGridRow1 = tileGrids[screenGridElementId].slice(0,16);
	screenGridRow2 = tileGrids[screenGridElementId].slice(16,32);
	screenGridRow3 = tileGrids[screenGridElementId].slice(32,48);
	screenGridRow4 = tileGrids[screenGridElementId].slice(48,64);
	screenGridRow5 = tileGrids[screenGridElementId].slice(64,80);
	screenGridRow6 = tileGrids[screenGridElementId].slice(80,96);
	screenGridRow7 = tileGrids[screenGridElementId].slice(96,112);
	screenGridRow8 = tileGrids[screenGridElementId].slice(112,128);
	screenGridRow9 = tileGrids[screenGridElementId].slice(128,144);
	screenGridRow10 = tileGrids[screenGridElementId].slice(144,160);
	screenGridRow11 = tileGrids[screenGridElementId].slice(160,176);
	screenGridArray = [screenGridRow1, screenGridRow2, screenGridRow3, screenGridRow4, screenGridRow5, screenGridRow6, screenGridRow7, screenGridRow8, screenGridRow9, screenGridRow10, screenGridRow11];
	return screenGridArray
};
var sho = parseGrid();
console.log("FO SHO: " +sho);

/**
var gridArrayOptionsTiles = function(possibleTileOptionsArray) {
	console.log("inside grid array options tiles");
	
	console.log(possibleTileOptionsArray);
};
**/
// get possible movement options of grid array
function possibleTileOptions(currentTileArray) {
	console.log("current tile array: " +currentTileArray);
	
	let currentTileX = currentTileArray[0];
	let currentTileY = currentTileArray[1];
	let possibleOptionXNorth = currentTileArray[0] + 1;
	let possibleOptionYEast = currentTileArray[1] + 1;
	let possibleOptionXSouth = currentTileArray[0] - 1;
	let possibleOptionYWest = currentTileArray[1] - 1;
	
	let possibleOptionNorth = [possibleOptionXNorth,currentTileY];
	let possibleOptionEast = [currentTileX,possibleOptionYEast];
	let possibleOptionSouth = [possibleOptionXSouth,currentTileY];
	let possibleOptionWest = [currentTileX,possibleOptionYWest];
	
	let possibleTileOptionsArray = [possibleOptionNorth,possibleOptionEast,possibleOptionSouth,possibleOptionWest];
	return possibleTileOptionsArray;
	
	
};

function getCurrentGridTileOptionsArrayPosition(value) {
	console.log("Value is: " +value);
	//let tileOptionX = value[0] * 16; // 176 possible values per array: 11 rows X 16 columns
	//let tileOptionY = (value[1] - 1) * 11; // full rows x tiles per row gives number of tiles used up to current row
	//let tileOptionX = value[0] + tileOptionY; // current row position + number of tiles used up to current row equals current array position
	let tileOptionX = value[0]/512;
	let tileOptionY = value[1]/448;
	console.log("toX: " +tileOptionX+ ", toY: " +tileOptionY);
	
	console.log("Value of tile option x is: " +tileOptionX+ ", y value is: " +tileOptionY);
	//let tileOptionArrayValue = 
	let currentGridTileOptionsArray = getCurrentGridArray();
	console.log("current tile array: " +currentGridTileOptionsArray);
	let currentGridTileArrayPosition = currentGridTileOptionsArray[tileOptionX];
	console.log("current tile: " +tileOptionX);
	return 
};
function getCurrentGridTileOptions(){ // get possible movement option values for comparisons in collision detection
	let currentGridTileOptionsArray = getCurrentGridArray(); // console.log("current grid tile options array: " +currentGridTileOptionsArray);
	// get current tile movement options array from currentGridTileOptionsArray; four possible options: n, e, s, w
	console.log("current tile options array length: " +currentGridTileOptionsArray.length);
	let currentGridTileActive = htmlLinkPositionCSS;
	console.log("Current grid tile active array: " +htmlLinkPositionCSS);
	let y1 = htmlLinkPositionCSS[0]/512;
	let y2 = htmlLinkPositionCSS[1]/448;
	console.log("YYYY: " +y1+ ", y2: " +y2);
	let currentGridTileActiveX = htmlLinkPositionCSS[0]/16;
	let currentGridTileActiveY = htmlLinkPositionCSS[1]/11;
	let currentGridTileArray = [currentGridTileActiveX,currentGridTileActiveY];
	let possibleGridTileArray = possibleTileOptions(currentGridTileArray);
	
	
	console.log("cgtaX: " +currentGridTileActiveX+ ", cgtaY: " +currentGridTileActiveY);
	
	return possibleGridTileArray;
};
var gridTileOptionsArray = [];
var gridArrayOptions = function() {
	let currentOptionGridTiles = getCurrentGridTileOptions();
	console.log("current grid tile options; match these to tile definitions: " +currentOptionGridTiles);
	for(var i = 0; i < currentOptionGridTiles.length; i++){
		console.log(currentOptionGridTiles[i]);
		var tileOptionArrayValue = getCurrentGridTileOptionsArrayPosition(currentOptionGridTiles[i]);
		console.log("this tiles array position value is: " +tileOptionArrayValue);
		gridTileOptionsArray.push(currentOptionGridTiles[i]);
		
	};
	//return something;
	return gridTileOptionsArray;
};
function getCurrentGridArray(){
	let currentTileGridArrayKey = currentGridTileStringBase + htmlGridActiveID; // 176 length of each grid tile array
	let currentTileGridArrayValues = tileGrids[currentTileGridArrayKey]; // console.log("current active screen grid array values amilli, son: " +currentTileGridArrayValues);
	return currentTileGridArrayValues;
};
var gridArrayCurrent = function() {
	var testy = getCurrentGridArray();
	return testy;
};
function cssPositionToGrid(array) {
	let xAxis = array[0]/16;
	let yAxis = array[1]/16; //console.log("position values in an array! x value: " +xAxis+ ", y value: " +yAxis);
	let xyAxes = [xAxis,yAxis];
	return xyAxes;
};
var gridArrayPosition = function() {
	let movementOptionsBase = cssPositionToGrid(htmlLinkPositionCSS); //console.log("MOBPosition: " + movementOptionsBase);
	return movementOptionsBase;
};
function cssPositionToGridPercentage(array) { // convert current css left and top position values to 8bit 512 grid array values: columns
	let xAxisPercentage = array[0]/512;
	let yAxisPercentage = array[1]/512;
	let xyAxesPercentage = [xAxisPercentage, yAxisPercentage]; //console.log(xyAxesPercentage);
	return xyAxesPercentage;
};

var gridArrayPositionPercentage = function() {
	let movementOptionsBaseXPercentage = cssPositionToGridPercentage(htmlLinkPositionCSS); //console.log("MOBXPercentage value son: " +movementOptionsBaseXPercentage);
	return movementOptionsBaseXPercentage;
};

// get movement option tiles....
var moveOptionNorth = function() {
	let movementOptionsBaseX = htmlLinkPositionCSS[0];
	let movementOptionsBaseY = htmlLinkPositionCSS[1]; //console.log("X: " +movementOptionsBaseX+ ", Y: " +movementOptionsBaseY);
	if(movementOptionsBaseX != -1) { // eight columns, 0 is first; if current top value is not equal to negative zero, ie: it exists and therefore is a positive integer, provide it as an option
		console.log("north option is an option");
		return true;
	} else {
		console.log("north option is not an option!");
		return false;
	};
};
var moveOptionEast = function() {
	let movementOptionsBaseX = htmlLinkPositionCSS[0];
	let movementOptionsBaseY = htmlLinkPositionCSS[1];
	console.log("current left: " +movementOptionsBaseY);
	if(movementOptionsBaseY < 16) { // 16 grid tile cells in a row
		console.log("east option is an option");
		return true;
	} else {
		console.log("east option is not an option!");
		return false;
	};
};



//var moveOptionEast = function() {};
var moveOptionSouth = function() {};
var moveOptionWest = function() {};


var gridOffScreenNorthID = function() { // get offscreen north grid id
	if(htmlGridOffScreenNorth === null) {
		console.log("North value is null, therefore north is not an option here!");
		return false;
	} else {
		htmlGridOffScreenNorthID = htmlGridOffScreenNorth.dataset.screenGridTile;
		console.log("north option data screen-grid-tile attribute value: " + htmlGridOffScreenNorthID);
		return htmlGridOffScreenNorthID;
	};
};
var gridOffScreenEastID = function() {
	if(htmlGridOffScreenEast === null) {
		console.log("East value is null, therefore east is not an option here!");
	} else {
		htmlGridOffScreenEastID = htmlGridOffScreenEast.dataset.screenGridTile;
		return htmlGridOffScreenEastID;
	};
};
var gridOffScreenSouthID = function() {
	if(htmlGridOffScreenSouth === null) {
		console.log("South value is null, therefore south is not an option here!");
		return false;
	} else {
		htmlGridOffScreenSouthID = htmlGridOffScreenSouth.dataset.screenGridTile;
		return htmlGridOffScreenSouthID;
	}
};
var gridOffScreenWestID = function() {
	if(htmlGridOffScreenWest === null) {
		console.log("West value is null, therefore west is not an option here!");
		return false;
	} else {
		htmlGridOffScreenWestID = htmlGridOffScreenWest.dataset.screenGridTile;
		return htmlGridOffScreenWestID;
	};
};




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
	linkCSSLeftVal = parseInt(linkCSSLeftVal,10);
	console.log("Left value: " +linkCSSLeftVal);
	return linkCSSLeftVal;
};
var linkCSSTop = function(){ // get link's current css top property value
	var linkCSSTopVal = window.getComputedStyle(htmlLink,null).getPropertyValue("top");
	linkCSSTopVal = parseInt(linkCSSTopVal,10);
	console.log("top value: " +linkCSSTopVal);
	return linkCSSTopVal;
};
var htmlLinkPosition = function (){ // get link's html element's current css left and top values in an array
	htmlLinkPositionCSS = [linkCSSTop(), linkCSSLeft()];
	console.log("inside html link position css: " +htmlLinkPositionCSS);
	//htmlLinkPositionPercentageTop = htmlLinkPositionPercentage[0]/screenHeight;
	//htmlLinkPositionPercentageLeft = htmlLinkPositionPercentage[0]/screenWidth;
	//console.log("top: " +htmlLinkPositionPercentageTop+ ", left: " +htmlLinkPositionPercentageLeft);
	//htmlLinkPositionPercentage = [htmlLinkPositionPercentageTop, htmlLinkPositionPercentageLeft];
	return htmlLinkPositionCSS;
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
	gridOffScreenNorthID: gridOffScreenNorthID(),
	gridOffScreenEastID: gridOffScreenEastID(),
	gridOffScreenSouthID: gridOffScreenSouthID(),
	gridOffScreenWestID: gridOffScreenWestID(),
	positionCSS: htmlLinkPosition(),
	gridActiveID: gridActiveID(), // current active grid data attribute id value
	gridActiveIDRow: gridActiveIDRow(),
	gridActiveIDCol: gridActiveIDCol(),
	moveOptions: [moveOptionNorth(), moveOptionEast(), moveOptionSouth(), moveOptionWest()],
	gridArrayPosition: gridArrayPosition(),
	gridArrayPositionPercentage: gridArrayPositionPercentage(),
	gridArrayCurrent: gridArrayCurrent(),
	gridArrayOptions: gridArrayOptions()
	//gridArrayOptionsTiles: gridArrayOptionsTiles()
	//gridArrayOptionTiles: getCurrentGridTileOptions()
	//moveOptionNorth: moveOptionNorth()
	//gridOffScreenIDs: [gridOffScreenIDNorth, gridOffScreenIDEast, gridOffScreenIDSouth, gridOffScreenIDWest] // current offscreen grid options/movements
};
//console.log(link);
function locateLink() {
	console.log(link.positionCSS);
	console.log(htmlLinkPositionCSS);
	console.log(link);
	//var positionCurrent = link.position[1]; console.log("link's current position in object literal notation!: " +link.position);
};
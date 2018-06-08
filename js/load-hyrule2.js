// load hyrule screen grid tile options that bordering currently active screen grid after page load.

var currentGridScreenPositionID; // active screen grid data attribute value containing tile id
var currentGridScreenPositionColID;
var currentGridScreenPositionRowID;
var currentGridScreenPositionColIDEast;
var currentGridScreenPositionColIDWest;
var currentGridScreenPositionRowIDNorth;
var currentGridScreenPositionRowIDSouth;
var currentGridScreenTileOptionEast;
var currentGridScreenTileOptionWest;
var colIDFormat;
var rowIDFormat;
var currentGridScreenTileOptions = [];

function gridScreenColIDFormat(currentGridScreenPositionColID, colID) {
	colIDFormat = 0 + currentGridScreenPositionColID;
	colID = colID.toString();
	colID = 0 + colID;
	colIDFormat = colID + colIDFormat
	//console.log("colid is: " + colIDFormat);
	return colIDFormat;
};
// format north/south screen grid tile option data attributes
function gridScreenRowIDFormat(currentGridScreenPositionRowID, rowID) {
	rowIDFormat = 0 + currentGridScreenPositionRowID;
	rowID = rowID.toString();
	rowID = 0 + rowID;
	rowIDFormat = rowIDFormat + rowID;
	return rowIDFormat;
};

function gridScreenTileIDPrevious() {};


function currentGridScreenPositionTileOptionsCol(colID){
	currentGridScreenPositionColIDEast = (colID + 1).toString();
	currentGridScreenPositionColIDWest = (colID - 1).toString();
	currentGridScreenTileOptionEast = gridScreenColIDFormat(currentGridScreenPositionColIDEast, colID);
	currentGridScreenTileOptionWest = gridScreenColIDFormat(currentGridScreenPositionColIDWest, colID);

	// HANDLE MAX/MIN - negative values and values above 16 (p) !!!!!
	if(currentGridScreenPositionColIDWest < 0) {
		//console.log("colID is less than zero: " + colID);
		currentGridScreenTileOptionWest = "noption";
	} else if(currentGridScreenPositionColIDEast > 16) {
		//console.log("colID is greater than 8: " + colID);
		currentGridScreenTileOptionEast = "noption";
	};
	//console.log("west: " + currentGridScreenPositionColIDWest + ", active: " + colID + ", east: " + currentGridScreenPositionColIDEast);
	//console.log("ids: west: " + currentGridScreenTileOptionWest + ", active: " + colID + ", east: " + currentGridScreenTileOptionEast);
	return currentGridScreenTileOptionWest, currentGridScreenTileOptionEast;
};

function currentGridScreenPositionTileOptionsRow(rowID) {
	currentGridScreenPositionRowIDNorth = (rowID - 1).toString();
	currentGridScreenPositionRowIDSouth = (rowID + 1).toString();
	currentGridScreenTileOptionNorth = gridScreenRowIDFormat(currentGridScreenPositionRowIDNorth, rowID);
	currentGridScreenTileOptionSouth = gridScreenRowIDFormat(currentGridScreenPositionRowIDSouth, rowID);
	// HANDLE MAX/MIN - negative values and values above 16 (p) !!!!!
	if(currentGridScreenPositionRowIDNorth < 0) {
		//console.log("rowID is less than zero: " + rowID);
		currentGridScreenTileOptionNorth = "noption";
	} else if(currentGridScreenPositionRowIDSouth > 8) {
		//console.log("rowID is greater than 8: " + rowID);
		currentGridScreenTileOptionSouth = "noption";
	};
	console.log("south: " + currentGridScreenPositionRowIDSouth + ", active: " + rowID + ", north: " + currentGridScreenPositionRowIDNorth);
	console.log("ids: south: " + currentGridScreenTileOptionSouth + ", active: " + rowID + ", north: " + currentGridScreenTileOptionNorth);
	return currentGridScreenTileOptionSouth, currentGridScreenTileOptionNorth;
};

var genTileNorth;
var genTileEast;
var genTileSouth;
var genTileWest;
var genTileOptionIDPrepend = "tileGrid";
var genTileOptionData;
var genTileScreenGridArray = [];
var genTileOptionData1;
var genTileOptionData2;
var genTileOptionData3;
var genTileOptionData4;
var genTileOptionData5;
var genTileOptionData6;
var genTileOptionData7;
var genTileOptionData8;
var genTileOptionData9;
var genTileOptionData10;
var genTileOptionData11;


function actuallyGenerateOptionTile(genTileDataAttribute){
	console.log("here there be option tiles generating!");
	console.log(genTileDataAttribute);
	genTileOptionData = tileGrids[genTileDataAttribute];
	
	genTileOptionData1 = genTileOptionData.slice(0,16);
	genTileOptionData2 = genTileOptionData.slice(16,32);
	genTileOptionData3 = genTileOptionData.slice(32,48);
	genTileOptionData4 = genTileOptionData.slice(48,64);
	genTileOptionData5 = genTileOptionData.slice(64,80);
	genTileOptionData6 = genTileOptionData.slice(80,96);
	genTileOptionData7 = genTileOptionData.slice(96,112);
	genTileOptionData8 = genTileOptionData.slice(112,128);
	genTileOptionData9 = genTileOptionData.slice(128,144);
	genTileOptionData10 = genTileOptionData.slice(144,160);
	genTileOptionData11 = genTileOptionData.slice(160,176);
	genTileScreenGridArray = [genTileOptionData1, genTileOptionData2, genTileOptionData3, genTileOptionData4, genTileOptionData5, genTileOptionData6, genTileOptionData7, genTileOptionData8, genTileOptionData9, genTileOptionData10, genTileOptionData11];
	//console.log("generated tiles screen grid array: " + genTileScreenGridArray);
	return genTileScreenGridArray;
	// console.log(gridScreenPositionOptions());
};


var genTileOptionArray = []; // array of arrays of generated tile option values for movement options correlated to currently active screen grid
var genTileOptionArrayNorth = []; // array of generated tile option values for north movement options correlated to currently active screen grid
var genTileOptionArrayEast = []; // array of generated tile option values for north movement options correlated to currently active screen grid
var genTileOptionArraySouth = []; // array of generated tile option values for north movement options correlated to currently active screen grid
var genTileOptionArrayWest = []; // array of generated tile option values for north movement options correlated to currently active screen grid


// WHERE TO PICK UP!!!! CREATE MOVEMENT TILE OPTION GRID SCREENS!!!!!
function generateTileOptions(currentGridScreenTileOptions){
	//console.log(currentGridScreenTileOptions[2]);
	var notAnOption = "noption";
	
	if(currentGridScreenTileOptions[0] != "noption") {
		genTileNorth = genTileOptionIDPrepend + currentGridScreenTileOptions[0];
		//console.log("genTileNorth is not false; use to grab north tile screen grid data!: " + genTileNorth);
		genTileNorth = actuallyGenerateOptionTile(genTileNorth);
		//console.log("genTileNorth reset yo!: " + genTileNorth);
	};
	if(currentGridScreenTileOptions[1] != "noption") {
		genTileEast = genTileOptionIDPrepend + currentGridScreenTileOptions[1];
		//console.log("genTileEast is not false; use to grab north tile screen grid data!: " + genTileEast);
		genTileEast = actuallyGenerateOptionTile(genTileEast);
	};
	if(currentGridScreenTileOptions[2] != "noption") {
		genTileSouth = genTileOptionIDPrepend + currentGridScreenTileOptions[2];
		//console.log("genTileSouth is not false; use to grab north tile screen grid data!: " + genTileSouth);
		genTileSouth = actuallyGenerateOptionTile(genTileSouth);
	};
	if(currentGridScreenTileOptions[3] != "noption") {
		genTileWest = genTileOptionIDPrepend + currentGridScreenTileOptions[3];
		//console.log("genTileWest is not false; use to grab north tile screen grid data!: " + genTileWest);
		genTileWest = actuallyGenerateOptionTile(genTileWest);
	};
	
	genTileOptionArray = [genTileNorth, genTileEast, genTileSouth, genTileWest];
	console.log("something gentileoptionarray: " + genTileOptionArray[0]);
	console.log("something gentileoptionarray: " + genTileOptionArray[1]);
	console.log("something gentileoptionarray: " + genTileOptionArray[2]);
	console.log("something gentileoptionarray: " + genTileOptionArray[3]);
	return genTileOptionArray;
};

function generateTileOptionsHTML(){
	var toNorth = genTileOptionArray[0];
	var toEast = genTileOptionArray[1];
	var toSouth = genTileOptionArray[2];
	var toWest = genTileOptionArray[3];
	console.log("dic: " + gridTileDictionary.gridTiles);
	console.log("to north array length: " + toNorth.length);
	
	for(var i = 0; i < toNorth.length; i++){
		console.log("dic: " + gridTileDictionary.gridTiles[i]);
	};
	
	
	var tileOptionNorthOutput = "<div id=\"loz-game-tile-north\">"
		+ "<div class=\"game-legend\"></div>"
		+ "<ul id=\"ul-screen-grid-north\" class=\"ul-screen-grid\" data-screen-grid-tile=\"\">";  // <!-- 0708 -->
		console.log("outputNorht: " + tileOptionNorthOutput);
};




function currentGridScreenPositionTileOptions(currentGridScreenPositionID){
	//console.log(currentGridScreenPositionID);
	currentGridScreenPositionColID = parseInt(currentGridScreenPositionID.slice(0, 2));
	//console.log(currentGridScreenPositionColID);
	currentGridScreenPositionTileOptionsCol(currentGridScreenPositionColID);
	currentGridScreenPositionRowID = parseInt(currentGridScreenPositionID.slice(2, 4));
	//console.log(currentGridScreenPositionRowID);
	currentGridScreenPositionTileOptionsRow(currentGridScreenPositionRowID);
	//console.log("current row: " + currentGridScreenPositionRowID);
	//console.log("s: " + currentGridScreenPositionRowIDSouth + ", n: " + currentGridScreenPositionRowIDNorth + ", e: " + currentGridScreenPositionColIDEast + ", w: " + currentGridScreenPositionColIDWest);
	
	currentGridScreenTileOptions = [currentGridScreenTileOptionNorth, currentGridScreenTileOptionEast, currentGridScreenTileOptionSouth, currentGridScreenTileOptionWest]
	//console.log("tiles to build!!!: " + currentGridScreenTileOptions);
	
	
	
	generateTileOptions(currentGridScreenTileOptions);
	generateTileOptionsHTML(genTileOptionArray);
	//console.log("YTY - yty: " + genTileOptionArray);
	
	//currentGridScreenPositionID = parseInt(currentGridScreenPositionID);
	//console.log(currentGridScreenPositionID);
};



function loadHyruleTiles(){
	//console.log("load hyrule tiles function");
	currentGridScreenPositionID = gridScreenPosition();
	currentGridScreenPositionTileOptions(currentGridScreenPositionID);
	
	//console.log("EXTERNAL: current grid screen position: " + currentGridScreenPositionID);
	//var currentGridScreenPositionTileOptions = gridScreenPositionOptions();
	// console.log("Current grid screen position tile options: " + currentGridScreenPositionTileOptions);
};
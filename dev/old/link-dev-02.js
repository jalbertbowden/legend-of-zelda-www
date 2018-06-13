/**
** global variables
**/

// globals
var htmlLink = document.getElementById("link");
var htmlLinkCSSTopValue; // ex: top:120px; -> 120px
var htmlLinkCSSLeftValue; // ex: left:220px; -> 220px
var htmlLinkCSSPositionValues = []; // array of css top/left position values, in that order: [120px,220px]
var htmlLinkCSSTop; // integer value of css top position after stripping off value type "px": 120px -> 120
var htmlLinkCSSLeft; // integer value of css left position after stripping off value type "px": 220px -> 220
var htmlLinkCSSPositions = []; // array of css top/left (in that order) position values after stripping off value type "px": [120,220]
var gridAspectRatio = 32;
var htmlLinkScreenGridPositions = [];
var htmlScreenGrid = document.getElementById("ul-screen-grid");
var htmlScreenGridTileID; // value of htmlScreenGrid's data screen-grid-tile attribute
var hyruleGridColumn; // column value position of current active screen tile on hyrule grid; y axis
var hyruleGridRow; // row value position of current active screen tile on hyrule grid; x axis
var hyruleGridPosition = []; // position of active screen tile on hyrule grid; array of [hyruleGridRow, hyruleGridColumn]
var hyruleGridTilePrepend = "hyruleGridTile";
var tileGridID; // hyruleGridTilePrepend + data attribute value for correlating active screen grid array of tiles
var tileGridValues; // current active screen grid array of tile values
var tileOptions = []; // array of adjacent tile grid id values; north, east, south, west (in that order) tile grids providing possible movement action options in gameplay.

// dev only
var outputHTML;
  
function getCSSPositionValues(el){
  htmlLinkCSSTopValue = window.getComputedStyle(el,null).getPropertyValue("top");
  htmlLinkCSSLeftValue = window.getComputedStyle(el,null).getPropertyValue("left");
  htmlLinkCSSPositionValues = [htmlLinkCSSTopValue, htmlLinkCSSLeftValue];
  return htmlLinkCSSPositionValues;
}
function getCSSPositionArrayValues(array){ // strip off "px" characters on css position top/left values
  htmlLinkCSSTop = parseInt(array[0], 10);
  htmlLinkCSSLeft = parseInt(array[1], 10);
  htmlLinkCSSPositions = [htmlLinkCSSTop, htmlLinkCSSLeft];
  return htmlLinkCSSPositions;
}
function getPositionScreenGridValues(array){ // convert css position value integers into correlating screen grid array values by dividing by grid aspect ratio
  htmlLinkScreenGridPositions[0] = array[0] / gridAspectRatio;
  htmlLinkScreenGridPositions[1] = array[1] / gridAspectRatio;
  return htmlLinkScreenGridPositions;
}
function getHTMLDataAttributeValue(el) {
  htmlScreenGridTileID = el.dataset.screenGridTile;
  return htmlScreenGridTileID;
}
function getHyruleGridPositions(string) {
  hyruleGridRow = string.substring(0,2);
  hyruleGridColumn = string.substring(2,4);
  hyruleGridPositions = [hyruleGridRow, hyruleGridColumn];
  return hyruleGridPositions;
}
function getScreenGridTiles() { // get array of tile values making up tile grid of current active screen grid
  tileGridID = hyruleGridTilePrepend + htmlScreenGridTileID;
  tileGridValues = hyruleGridTiles[tileGridID]; // array of 176 values correlating to tile definitions
  return tileGridValues;
}
var optionNorthX; //  north option value for north hyrule grid tile and link character's current north move action
var optionEastY;  // east option value for east hyrule grid tile and link character's current east move action
var optionSouthX; // south option value for south hyrule grid tile and link character's current south move action
var optionWestY; // west option value for west hyrule grid tile and link character's current west move action
var tileOptionNorth = []; // array value of hyrule grid tile option north from link's current position
var tileOptionEast = []; // array value of hyrule grid tile option east from link's current position
var tileOptionSouth = []; // array value of hyrule grid tile option south from link's current position
var tileOptionWest = []; // array value of hyrule grid tile option west from links' current position

function getOptionNorth(){
  optionNorthX = (parseInt(hyruleGridRow) - 1).toString();
  return optionNorthX;
}
function getOptionEast(){
  optionEastY = (parseInt(hyruleGridColumn) + 1).toString();
  return optionEastY;
}
function getOptionSouth(){
  optionSouthX = (parseInt(hyruleGridRow) + 1).toString();
  return optionSouthX;
}
function getOptionWest(){
  optionWestY = (parseInt(hyruleGridColumn) - 1).toString();
  return optionWestY;
}
function getAdjacentHyruleTiles() { // get n, e, s, w hyrule tile grids adjacent to current active tile grid gameplay is on
  getOptionNorth(); // console.log("tile option north x: " +tileNorthOptionX);
  getOptionEast();
  getOptionSouth();
  getOptionWest();
  let zeroOptionNorthX = 0 + optionNorthX;
  let zeroOptionEastY = 0 + optionEastY;
  let zeroOptionSouthX = 0 + optionSouthX;
  let zeroOptionWestY = 0 + optionWestY;
  tileOptionNorth = [zeroOptionNorthX, hyruleGridColumn];
  tileOptionEast = [hyruleGridRow, zeroOptionEastY];
  tileOptionSouth = [zeroOptionSouthX, hyruleGridColumn];
  tileOptionWest = [hyruleGridRow, zeroOptionWestY];
  tileOptions = [tileOptionNorth, tileOptionEast, tileOptionSouth, tileOptionWest];
  return tileOptions;
}
var movementOptionNorth = []; // array value of link's current movement option north
var movementOptionEast = []; // array value of link's current movement option east
var movementOptionSouth = []; // array value of link's current movement option south
var movementOptionWest = []; // array value of link's current movement option west
var movementOptions = []; // array of array values consisting of link's current movement north, east, south, and west movement options. and in that order!!!

function getMovementOptions(array){ // get north, south, east and west current active screen grid array values for link's current possible movement options
  let currentGridColumn = parseInt(hyruleGridColumn); // console.log("current grid column: " +currentGridColumn);
  let currentGridRow = parseInt(hyruleGridRow);
  getOptionNorth();
  getOptionEast();
  getOptionSouth();
  getOptionWest();
  let movementOptionNorth = [optionNorthX, currentGridColumn];
  let movementOptionEast = [currentGridRow, optionEastY];
  let movementOptionSouth = [optionSouthX, currentGridColumn];
  let movementOptionWest = [currentGridRow, optionWestY];
  movementOptions = [movementOptionNorth, movementOptionEast, movementOptionSouth, movementOptionWest]; // console.log(movementOptionNorth);
  return movementOptions;
}

// arrays of current active screen grid values; each array has 16 values (length of columns in active screen grid), 11 arrays of columm (16) values correlates to 11 rows in active screen grid.
var screenGridRow1 = [];
var screenGridRow2 = [];
var screenGridRow3 = [];
var screenGridRow4 = [];
var screenGridRow5 = [];
var screenGridRow6 = [];
var screenGridRow7 = [];
var screenGridRow8 = [];
var screenGridRow9 = [];
var screenGridRow10 = [];
var screenGridRow11 = [];
var screenGridArray = []; // array of active screen grid row array values

function parseGrid(){ // parse current active screen grid array into row arrays; return array of 11 row arrays.
  screenGridRow1 = tileGridValues.slice(0,16);
  screenGridRow2 = tileGridValues.slice(16,32);
  screenGridRow3 = tileGridValues.slice(32,48);
  screenGridRow4 = tileGridValues.slice(48,64);
  screenGridRow5 = tileGridValues.slice(64,80);
  screenGridRow6 = tileGridValues.slice(80,96);
  screenGridRow7 = tileGridValues.slice(96,112);
  screenGridRow8 = tileGridValues.slice(112,128);
  screenGridRow9 = tileGridValues.slice(128,144);
  screenGridRow10 = tileGridValues.slice(144,160);
  screenGridRow11 = tileGridValues.slice(160,176);
  screenGridArray = [screenGridRow1, screenGridRow2, screenGridRow3, screenGridRow4, screenGridRow5, screenGridRow6, screenGridRow7, screenGridRow8, screenGridRow9, screenGridRow10, screenGridRow11];
  // console.log(screenGridArray);
  return screenGridArray;
}
var optNorthArrayPosition;
var optEastArrayPosition;
var optSouthArrayPosition;
var optWestArrayPosition;
var optionTileValues = [];

function getOptionGridValues() { // convert movement options to tile definitions for defining walkability, aka pseudo collision detection
  let optNorthX = htmlLinkScreenGridPositions[0] - 1;
  let optNorthY = htmlLinkScreenGridPositions[1];
  optNorthArrayPosition = (optNorthX * 16) + optNorthY;
  optNorthArrayPosition = (optNorthX * 16) + optNorthY; // console.log(optNorthArrayPosition);
  let optEastX = htmlLinkScreenGridPositions[0];
  let optEastY = htmlLinkScreenGridPositions[1] + 1;
  optEastArrayPosition = (optEastX * 16) + optEastY; // console.log(optEastArrayPosition);
  let optSouthX = htmlLinkScreenGridPositions[0] + 1;
  let optSouthY = htmlLinkScreenGridPositions[1];
  optSouthArrayPosition = (optSouthX * 16) + optSouthY; // console.log("south array position: " +optSouthArrayPosition);
  let optWestX = htmlLinkScreenGridPositions[0];
  let optWestY = htmlLinkScreenGridPositions[1] - 1;
  optWestArrayPosition = (optWestX * 16) + optWestY; // console.log(optWestArrayPosition);
  return optionTileValues = [optNorthArrayPosition, optEastArrayPosition, optSouthArrayPosition, optWestArrayPosition];
}
var optionTileValues = []; // array of values defined in hyrule grid, correlating to possible move options from current position
var optionTileDefinitions = []; // array of tile values converted into tile definitions

function convertOptionsToTileValues(array) {
  // console.log("array of tile option values to be converted to definitions: " + array);
  let northOptionTileDefinition = tileGridValues[array[0]];
  let eastOptionTileDefinition = tileGridValues[array[1]];
  let southOptionTileDefinition = tileGridValues[array[2]];
  let westOptionTileDefinition = tileGridValues[array[3]];
  optionTileValues = [northOptionTileDefinition, eastOptionTileDefinition, southOptionTileDefinition, westOptionTileDefinition];
  return optionTileValues;
}
function convertTileValuesToTileDefinitions(array){ // take array of n,e,s,w movement option tile values and convert tile values into tile definitions
  // console.log("array of tile values to be converted to tile definitions: " +array); // console.log(gridTilesDictionary.gridTiles);
  let northTile = array[0];
  let northTileDefinition = gridTilesDictionary.gridTiles[northTile]; // console.log("tile definition north: " +northTileDefinition);
  let eastTile = array[1];
  let eastTileDefinition = gridTilesDictionary.gridTiles[eastTile]; // console.log("tile definition east: " +eastTileDefinition);
  let southTile = array[2];
  let southTileDefinition = gridTilesDictionary.gridTiles[southTile]; // console.log("tile definition south: " +southTileDefinition);
  let westTile = array[3];
  let westTileDefinition = gridTilesDictionary.gridTiles[westTile]; // console.log("tile definition west: " +westTileDefinition);
  optionTileDefinitions = [northTileDefinition, eastTileDefinition, southTileDefinition, westTileDefinition];
  return optionTileDefinitions;
}



function walkabilityMatch(string) { // match tile value to tile definition; if match, return true, signalling movement is an option. if no match is found, return false, signalling that movement is not an option.
  for(var i = 0; i < gridWalkability.length; i++) { // console.log("string: " +string+ ", walkability definition: " +gridWalkability[i]);
    if(string == gridWalkability[i]) { // equality operator because values are not of same type; mOption obj, gridWalk str, equality operator converts values before comparing them
      return true;
    }
  };
  return false;
}
var walkabilityOptions = []; // array of true/false values correlating to link character's north, east, south, and west movement options...
var walkabilityOption; // true/false value returned stating whether or not a move option tile is in fact an option for link to move upon...
function getWalkabilityScore(array){ // see if optionsTiles variable is listed in gridWalkability list, return if true
  //console.log("definitions to test for walkability: " +optionTileDefinitions);
  //console.log("walkability scores to test definitions against: " +gridWalkability);
  for(var j = 0; j < array.length; j++) {
    //console.log("tile value to define " +j+ ", " +array[j]);
    walkabilityOption = walkabilityMatch(array[j]);
    walkabilityOptions.push(walkabilityOption);
  } // console.log("walkability options: " +walkabilityOptions);
  return walkabilityOptions;
}






/**
**
**
** keyboard events
** keyboard events
**
**
**/
// https://eloquentjavascript.net/15_event.html
function eventListeners(){
  console.log("walkability options: " +walkabilityOptions);
  
  window.addEventListener("keydown", event => {
    console.log("event key down: " + event.key + ", event key down event.which: " + event.which);	
    
    if ((event.key == "ArrowUp") && (walkabilityOptions[0] == true)) {
      console.log("north walkability option: " +walkabilityOptions[0]);

  	  
  	  
      document.body.style.background = "violet";
    } else if ((event.key == "ArrowRight") && (walkabilityOptions[1] == true)) {
      console.log("east walkability option: " +walkabilityOptions[1]);
      
      
      document.body.style.background = "#ccc";
    } else if ((event.key == "ArrowDown") && (walkabilityOptions[2] == true)) {
      console.log("south walkability option: " +walkabilityOptions[2]);
      
      
      
      document.body.style.background = "#eee";
    } else if ((event.key == "ArrowLeft") && (walkabilityOptions[3] == true)) {
      console.log("west walkability option: " +walkabilityOptions[3]);
      
      
      
      document.body.style.background = "#aaa";
    } else if (event.key == "Enter") {
      console.log("enter key pressed!");
      document.body.style.background = "#ff0";
    } else if (event.key == "Shift") {
      console.log("shift key pressed!");
      document.body.style.background = "#00f";
    } else if (event.key == "z") {
      console.log("z key pressed!");
      document.body.style.background = "#ff0";
    } else if (event.key == "x") {
      console.log("x key pressed!");
      document.body.style.background = "#c0c0c0";
    }
  });
  window.addEventListener("keyup", event => {
    if (event.key == "ArrowUp") {
      document.body.style.background = "";
    } else if (event.key == "ArrowRight") {
      console.log("arrow right key up!");
      document.body.style.background = "";
    } else if (event.key == "ArrowDown") {
      console.log("arrow down key up!");
      document.body.style.background = "";
    } else if (event.key == "ArrowLeft") {
      console.log("arrow left key up!");
      document.body.style.background = "";
    } else if (event.key == "Enter") {
      console.log("enter key up!");
      document.body.style.background = "";
    } else if (event.key == "Shift") {
      console.log("shift key up!");
      document.body.style.background = "";
    } else if (event.key == "z") {
      console.log("z key up!");
      document.body.style.background = "";
    } else if (event.key == "x") {
      console.log("x key up!");
      document.body.style.background = "";
    }
  });
}










/** **/
/** link character core **/
/** **/
var link = {};
function updateLink() { // called from locateLink function, passing all of the variable's that are vital to link's functionality, to the link character object
  link = {
    cssPositionValues: htmlLinkCSSPositionValues,
    cssPositionArrayValues: htmlLinkCSSPositions,
    positionScreenGridValues: htmlLinkScreenGridPositions,
    tileGrid: htmlScreenGridTileID,
    hyruleGridPositions: hyruleGridPositions,
    moveOptions: movementOptions,
    hyruleAdjacentTiles: tileOptions
  }
}
function locateLink(){ // locateLink function is center for link's functionality. all functions go through here.
  getCSSPositionValues(htmlLink); // get link's current css top/left position values
  // console.log(htmlLinkCSSPositionValues);
  getCSSPositionArrayValues(htmlLinkCSSPositionValues); // convert current css position values into integers, aka deleting "px" from string
  // console.log(htmlLinkCSSPositions);
  getPositionScreenGridValues(htmlLinkCSSPositions); // convert css position integers into correlating screen grid array values dividing by grid aspect ratio
  // console.log(htmlLinkScreenGridPositions);
  getHTMLDataAttributeValue(htmlScreenGrid); // get screen grid data attribute value
  // console.log(htmlScreenGridTileID);
  getHyruleGridPositions(htmlScreenGridTileID);
  // console.log(hyruleGridPositions);
  getScreenGridTiles(hyruleGridPositions);
  // console.log(tileGridValues);
  
  parseGrid(); // get current active screen grid array slices, for finding current tile option move values
  
  getMovementOptions(htmlLinkScreenGridPositions); // get current active screen grid movement options/tiles
  // console.log("movement options: " + movementOptions);
  
  getAdjacentHyruleTiles(); // get current active screen grid's surrounding tile options on hyrule grid
  // console.log("tile options: " +tileOptions);
  
  getOptionGridValues(); // get option grid values to be converted into tile definitions for defining movement options
  // console.log(optionTileValues);
  convertOptionsToTileValues(optionTileValues); // convert movement options to hyrule grid values
  //console.log("option tile values: " +optionTileValues);
  
  convertTileValuesToTileDefinitions(optionTileValues); // convert movement options hyrule grid values into tile definitions
  // console.log("option tile value definitions: " +optionTileDefinitions);
  
  getWalkabilityScore(optionTileDefinitions); // look up tile definitions for their defined walkability score; walkable is true, unwalkable is false
  // console.log("walkability option: " +walkabilityOptions);
  
  
  
  // eventListeners();
  updateLink(); // fires off to update link character object with current variables that are vital to link character's functionality
  
  
  // console.log("Link object: " +link);
  // console.log("link object css positions values: " +link.cssPositionValues);
  
  
  /**
  ** dev only!!
  **
  **
  **
  **
  **
  **/
  
  var outputList = document.createElement("ul");
  outputHTML = "<li>CSS Position Values: <strong>" +htmlLinkCSSPositionValues+ "</strong></li>";
  outputHTML += "<li>CSS Positions: <strong>" +htmlLinkCSSPositions+ "</strong></li>";
  outputHTML += "<li>Screen Grid Positions: <strong>" +htmlLinkScreenGridPositions+ "</strong></li>";
  outputHTML += "<li>Screen Grid Tile ID: <strong>" +htmlScreenGridTileID+ "</strong></li>";
  outputHTML += "<li>Hyrule Grid Position: <strong>" +hyruleGridPositions+ "</strong></li>";
  outputHTML += "<li>Screen Grid Tile Array: <strong class=\"overflow-scroll\">" +tileGridValues+ "</strong></li>";
  outputHTML += "<li>Hyrule Grid Tile Options: <strong class=\"block\">n: " +tileOptions[0]+ "</strong> <strong class=\"block\">e: " +tileOptions[1]+ "</strong> <strong class=\"block\">s: " +tileOptions[2]+ "</strong> <strong class=\"block\">w: " +tileOptions[3]+ "</strong></li>";
  outputHTML += "<li>Current Move Options: n: [<strong>" +movementOptions[0]+ "</strong>] e: [<strong>" +movementOptions[1]+ "</strong>] s: [<strong>" +movementOptions[2]+ "</strong>] w: [<strong>" +movementOptions[3]+ "</strong>]</li>";
  outputHTML += "<li>Current move option tile values: n: <strong>" +optionTileValues[0]+ "</strong>, e: <strong>" +optionTileValues[1]+ "</strong>, s: <strong>" +optionTileValues[2]+ "</strong>, w: <strong>" +optionTileValues[3]+ "</strong></li>";
  outputHTML += "<li>Current move option tile definitions: n: <strong>" +optionTileDefinitions[0]+ "</strong>, e: <strong>" +optionTileDefinitions[1]+ "</strong>, s: <strong>" +optionTileDefinitions[2]+ "</strong>, w: <strong>" +optionTileDefinitions[3]+ "</strong></li>";
  outputHTML += "<li>Tile Definitions Walkability Score: n: <strong>" +walkabilityOptions[0]+ "</strong>, e: <strong>" +walkabilityOptions[1]+ "</strong>, s: <strong>" +walkabilityOptions[2]+ "</strong>, w: <strong>" +walkabilityOptions[3]+ "</strong></li>";
  outputList.innerHTML = outputHTML;
  let outputVariables = document.getElementById("console-log");
  outputVariables.appendChild(outputList);






}



// create link character object 
var link = {
	//positionCSS: linksPosition(),
	//positionOnActiveGridCurrentTile: correlateGridLocationsVal,
	//positionOfOptionTilesGrid: correlateGridOptionLocations(gridLocationCoords),
	//onKeyDown: keyDown(),
	//onKeyUp: keyUp()
};
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
  htmlLinkScreenGridPositions[1] = array[1] / gridAspectRatio; // console.log("screen grid positions from function: " +htmlLinkScreenGridPositions);
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
function getHiddenScreenGridTiles(){
  
}
var tileGridOptionsID;
var tileGridOptionsValues = [];
// compare arrays helper function https://gomakethings.com/check-if-two-arrays-or-objects-are-equal-with-javascript/
var isEqual = function (value, other) {
  // get the value type
  var type = Object.prototype.toString.call(value);
  // if the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(other)) return false;
  // if the two items are not an object or array, return false
  if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;
  // compare the length of the two items
  var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
  var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
  if (valueLen !== otherLen) return false;
  // compare two items
  var compare = function (item1, item2) {
    // get item object type
    var itemType = Object.prototype.toString.call(item1);
    // if object or array, compare recursively
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
	  if (!isEqual(item1, item2)) return false;
    }
    // if not object or array, do simple comparison
    else {
	  // if the two items are not the same type, return false
	  if (itemType !== Object.prototype.toString.call(item2)) return false;
	  // else if it's a function, convert to a string and compare
	  // else compare the two
	  if (itemType === '[object Function]') {
        if (item1.toString() !== item2.toString()) return false;
	  } else {
	  	if (item1 !== item2) return false;
	  }
    }
  };
  // compare properties
  if (type === '[object Array]') {
	for (var i = 0; i < valueLen; i++) {
	  if (compare(value[i], other[i]) === false) return false;
	}
  } else {
	for (var key in value) {
	  if (value.hasOwnProperty(key)) {
	    if (compare(value[key], other[key]) === false) return false;
      }
    }
  }
  // return true if there are no failures
  return true;
};

function getScreenGridOptions(){ // get array of option values for current active screen grid
  //console.log("YO!: " +hyruleGridOptionTiles.hyruleGridTileOptions0808["door01"]);
  tileGridOptionsID = hyruleGridTilePrepend+ "Options" +htmlScreenGridTileID;
  //console.log('tile grid options id: ' +tileGridOptionsID);
  tileGridOptionsValues = hyruleGridOptionTiles[tileGridOptionsID];
  // console.log("tile grid options values array: " +tileGridOptionsValues.door01.gridPosition);
  // console.log("tile grid options values array: " +tileGridOptionsValues.door.gridPosition+ ", " +tileGridOptionsValues.door.entranceTo);
  return tileGridOptionsValues;
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
  optionNorthX = htmlLinkScreenGridPositions[0] - 1; // console.log("new option north x value: " +optionNorthX);
  return optionNorthX;
}
function getOptionEast(){
  optionEastY = htmlLinkScreenGridPositions[1] + 1; // console.log("option east val: " +optionEastY);
  return optionEastY;
}
function getOptionSouth(){
  optionSouthX = htmlLinkScreenGridPositions[0] + 1;
  return optionSouthX;
}
function getOptionWest(){
  optionWestY = (parseInt(hyruleGridColumn) - 1).toString();
  optionWestY = htmlLinkScreenGridPositions[1] - 1; // console.log("option west y: " +optionWestY);
  return optionWestY;
}
function getAdjacentHyruleTiles() { // get n, e, s, w hyrule tile grids adjacent to current active tile grid gameplay is on
  getOptionNorth(); // // console.log("tile option north x: " +tileNorthOptionX);
  getOptionEast();
  getOptionSouth();
  getOptionWest();

  let zeroOptionNorthX = parseInt(hyruleGridRow) - 1;
  zeroOptionNorthX = 0 + zeroOptionNorthX.toString();
  let fakeHyruleGridColumn = hyruleGridColumn;
  let zeroOptionEastY = parseInt(hyruleGridColumn) + 1;
  
  if(fakeHyruleGridColumn < 9) {
    zeroOptionEastY = 0 + zeroOptionEastY.toString(); // console.log("zero option east y : " +zeroOptionEastY);
  } else {
    zeroOptionEastY = zeroOptionEastY.toString();
  }
  let zeroOptionSouthX = parseInt(hyruleGridRow) + 1;
  zeroOptionSouthX = 0 + zeroOptionSouthX.toString(); // console.log("zero option south x: " +zeroOptionSouthX);
  
  let zeroOptionWestY = parseInt(hyruleGridColumn) - 1; // console.log("zero option west y: " +zeroOptionWestY);
  let fakeHyruleGridColumnWest = hyruleGridColumn; // console.log("fake column west: " +fakeHyruleGridColumnWest);
  if(fakeHyruleGridColumnWest < 11) { // wtf is going on here? ha?
    zeroOptionWestY = 0 + zeroOptionWestY.toString(); // console.log("zero option west y deuce: " +zeroOptionWestY);
  } else {
    zeroOptionWestY = zeroOptionWestY.toString(); // console.log("zero option west y value if greater than 9!");
  }
  tileOptionNorth = [zeroOptionNorthX, hyruleGridColumn]; // console.log("tile option north: " +tileOptionNorth);
  tileOptionEast = [hyruleGridRow, zeroOptionEastY]; // console.log("toe: " +tileOptionEast+ ", toe0: " +hyruleGridRow+ ", toe1: " +zeroOptionEastY);
  tileOptionSouth = [zeroOptionSouthX, hyruleGridColumn];
  tileOptionWest = [hyruleGridRow, zeroOptionWestY];
  tileOptions = [tileOptionNorth, tileOptionEast, tileOptionSouth, tileOptionWest]; // console.log("tile options: " +tileOptions);
  
  return tileOptions;
}
var movementOptionNorth = []; // array value of link's current movement option north
var movementOptionEast = []; // array value of link's current movement option east
var movementOptionSouth = []; // array value of link's current movement option south
var movementOptionWest = []; // array value of link's current movement option west
var movementOptions = []; // array of array values consisting of link's current movement north, east, south, and west movement options. and in that order!!!

function getMovementOptions(array){ // get north, south, east and west current active screen grid array values for link's current possible movement options
  let currentGridColumn = parseInt(hyruleGridColumn);
  let currentGridRow = parseInt(hyruleGridRow); // console.log("current grid row: " +currentGridRow+ ", current grid column: " +currentGridColumn);
 
  getOptionNorth();
  getOptionEast();
  getOptionSouth();
  getOptionWest();
 
  let movementOptionNorth = [optionNorthX, htmlLinkScreenGridPositions[1]]; // console.log("north values: x: " +optionNorthX+ ", y: " +htmlLinkScreenGridPositions[1]);
  let movementOptionEast = [htmlLinkScreenGridPositions[0], optionEastY]; // console.log("east values: x: "+htmlLinkScreenGridPositions[0]+ ", y: " +optionEastY);
  let movementOptionSouth = [optionSouthX, htmlLinkScreenGridPositions[1]]; // console.log("opt south x: " +optionSouthX+", html link screen grid positions 1: "+htmlLinkScreenGridPositions[1]);
  let movementOptionWest = [htmlLinkScreenGridPositions[0], optionWestY]; // console.log("movement option west: " +movementOptionWest);
  movementOptions = [movementOptionNorth, movementOptionEast, movementOptionSouth, movementOptionWest];
  return movementOptions;
}
var movementOptionsHidden = [];
/**
function getMovementOptionsHidden(movementOptions) {
  console.log("movement options: " +movementOptions+ ", first array: " +movementOptions[0]);
  console.log("tile grid options values: " +tileGridOptionsValues.door.gridPosition);
  var hiddenNorth = isEqual(movementOptions[0],tileGridOptionsValues.door.gridPosition);
  var hiddenEast = isEqual(movementOptions[1],tileGridOptionsValues.door.gridPosition);
  var hiddenSouth = isEqual(movementOptions[2],tileGridOptionsValues.door.gridPosition);
  var hiddenWest = isEqual(movementOptions[3],tileGridOptionsValues.door.gridPosition);
  
  console.log("option north is: " +hiddenNorth);
  console.log("option east is: " +hiddenEast);
  console.log("option south is: " +hiddenSouth);
  console.log("option west is: " +hiddenWest);
  movementOptionsHidden = [hiddenNorth, hiddenEast, hiddenSouth, hiddenWest];
  return movementOptionsHidden;
}**/

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
  screenGridArray = [screenGridRow1, screenGridRow2, screenGridRow3, screenGridRow4, screenGridRow5, screenGridRow6, screenGridRow7, screenGridRow8, screenGridRow9, screenGridRow10, screenGridRow11]; // console.log(screenGridArray);
  return screenGridArray;
}
var optNorthArrayPosition;
var optEastArrayPosition;
var optSouthArrayPosition;
var optWestArrayPosition;
var optionTilePositionValues = [];

function getOptionGridValues() { // convert movement options to tile definitions for defining walkability, aka pseudo collision detection
  let optNorthX = htmlLinkScreenGridPositions[0] - 1;
  let optNorthY = htmlLinkScreenGridPositions[1];
  optNorthArrayPosition = (optNorthX * 16) + optNorthY; // console.log(optNorthArrayPosition);
  let optEastX = htmlLinkScreenGridPositions[0]; // console.log("opt east x: " +optEastX);
  let optEastY = htmlLinkScreenGridPositions[1] + 1; // console.log("opt east y: " +optEastY);
  
  
  
  // is this needed???
  if(optEastY > 15) { // console.log("opt east y is greater than screen grid value!");
    optEastY === false;
  }
  // is this needed???
  
  optEastArrayPosition = (optEastX * 16) + optEastY; // console.log("opt east array position: " +optEastArrayPosition);
  let optSouthX = htmlLinkScreenGridPositions[0] + 1;
  let optSouthY = htmlLinkScreenGridPositions[1]; // console.log("opt south array values: x: " +optSouthX+", y: "+optSouthY);
  optSouthArrayPosition = (optSouthX * 16) + optSouthY; // console.log("south array position: " +optSouthArrayPosition);
  let optWestX = htmlLinkScreenGridPositions[0];
  let optWestY = htmlLinkScreenGridPositions[1] - 1;
  optWestArrayPosition = (optWestX * 16) + optWestY; // console.log(optWestArrayPosition);
  return optionTilePositionValues = [optNorthArrayPosition, optEastArrayPosition, optSouthArrayPosition, optWestArrayPosition];
}
var optionTileValues = []; // array of values defined in hyrule grid, correlating to possible move options from current position
var optionTileDefinitions = []; // array of tile values converted into tile definitions

function convertOptionsToTileValues(array) { // console.log("array of tile option values to be converted to definitions: " + array);
  let northOptionTileDefinition = tileGridValues[array[0]]; // console.log("north option tile grid value to be defined: " +tileGridValues[array[0]]);
  let eastOptionTileDefinition = tileGridValues[array[1]]; // console.log("east option tile grid value to be defined: " +tileGridValues[array[1]]);
  let southOptionTileDefinition = tileGridValues[array[2]]; // console.log("west option tile grid value to be defined: " +tileGridValues[array[2]]);
  let westOptionTileDefinition = tileGridValues[array[3]]; // console.log("west option tile definition: " + westOptionTileDefinition);
  optionTileValues = [northOptionTileDefinition, eastOptionTileDefinition, southOptionTileDefinition, westOptionTileDefinition]; // console.log("option tile definitions. n: " +northOptionTileDefinition+ ", e: " +eastOptionTileDefinition+ ", s: " +southOptionTileDefinition+ ", w: " +westOptionTileDefinition);
  
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
  for(var i = 0; i < gridWalkability.length; i++) {
  	// console.log("string: " +string+ ", str type: " +typeof string+ ", walkability definition: " +gridWalkability[i]+ ", walkability type: " +typeof gridWalkability[i]);
    
    
  	if(string == gridWalkability[i]) { // equality operator because values are not of same type; mOption obj, gridWalk str, equality operator converts values before comparing them
      console.log("MAAAATCH MAKER!!!!!: string: " +string+ ", walkability definition: " +gridWalkability[i]);
      
      if(string == "tile-black") {
        console.log("door tile located!");
        console.log("screen grid position: " + htmlLinkScreenGridPositions);
      }
  	  return true;
    }
  };
  return false;
}
var walkabilityOptions = []; // array of true/false values correlating to link character's north, east, south, and west movement options...
var walkabilityOption; // true/false value returned stating whether or not a move option tile is in fact an option for link to move upon...
function getWalkabilityScore(array){ // see if optionsTiles variable is listed in gridWalkability list, return if true
  walkabilityOptions = []; // reset variable after each call...probably not ideal/because you're using globals and/or not setting equality correctly
  // console.log("definitions to test for walkability: " +optionTileDefinitions); // console.log("walkability scores to test definitions against: " +gridWalkability);
  for(var j = 0; j < array.length; j++) {
  	// console.log("tile value to define " +j+ ", " +array[j]);
    walkabilityOption = walkabilityMatch(array[j]);
    walkabilityOptions.push(walkabilityOption);
  } console.log("walkability options: " +walkabilityOptions);
  return walkabilityOptions;
}

var directionClasses = ["link-north", "link-east", "link-south", "link-west"]; // base level direction style class values for link character
var directionClassCurrent; // class attribute value defining link's directional style

function testClassForMatch(string) {
  for(var j = 0; j < directionClasses.length; j++) {
  	// console.log("string: " +string+ ", class: " +directionClasses[j]);
    if(string === directionClasses[j]) {
      console.log("test class for match: MATCH! string: " +string+ ", class: " +directionClasses[j]);
      
      directionClassCurrent = string;
      return directionClassCurrent;
    }
  }
}
function currentDirection(){
  let htmlLinkCSSCurrentClasses = htmlLink.classList;
  for(var i = 0; i < htmlLinkCSSCurrentClasses.length; i++) {
  	// console.log("class: " +htmlLinkCSSCurrentClasses[i]);
    testClassForMatch(htmlLinkCSSCurrentClasses[i]);
    return directionClassCurrent;
  }
}
/**
**
** movement actions
**
**/
function linkDirectionalCSSClasses(string){ // string passed in defines directional action link is taking; add that direction's class/remove all others.
  // console.log("link directional css classes: " +string); // console.log(htmlLink.classList);
  // remove all directional classes....there's is most likely a much more efficient manner of going about this...
  htmlLink.classList.remove("link-north", "link-east", "link-south", "link-west");
  htmlLink.classList.add(string); // add directional css class of movement
  if(string === "link-north"){
  	// console.log("class is link north!");
  	
    htmlLink.classList.add("link-green-north-action");
  } else if(string === "link-east") {
    htmlLink.classList.add("link-green-east-action");
  } else if(string === "link-south") {
    htmlLink.classList.add("link-green-south-action");
  } else if(string === "link-west") {
    htmlLink.classList.add("link-green-west-action");
  } 
}

function moveLinkNorth(){
  // console.log("move link north function action son! current css top position value: " +htmlLinkCSSPositions[0]);
  let directionalClass = "link-north"; // console.log("direction class" +directionClass);
  
  let newHTMLLinkCSSTopPosition = htmlLinkCSSPositions[0] - 32; // console.log("move north css top position value: " +newHTMLLinkCSSTopPosition);
  let newHTMLLinkCSSTopPositionValue = newHTMLLinkCSSTopPosition + "px"; // console.log("new css top value: " +newHTMLLinkCSSTopPositionValue);
  htmlLink.style.top = newHTMLLinkCSSTopPositionValue;
  linkDirectionalCSSClasses(directionalClass);
  
  // add audio for action
  
  
  locateLink();
}
function moveLinkEast(){ // console.log("move link east function action son!");
  let directionalClass = "link-east";
  let newHTMLLinkCSSLeftPosition = htmlLinkCSSPositions[1] + 32; // console.log("new left position value to move to: " +newHTMLLinkCSSLeftPosition);
  let newHTMLLinkCSSLeftPositionValue = newHTMLLinkCSSLeftPosition + "px";
  htmlLink.style.left = newHTMLLinkCSSLeftPositionValue;
  linkDirectionalCSSClasses(directionalClass);
  locateLink();
}
function moveLinkSouth(){ // console.log("move link south function action son!");
  let directionalClass = "link-south";
  let newHTMLLinkCSSTopPosition = htmlLinkCSSPositions[0] + 32; // console.log("new top position value to move to: " +newHTMLLinkCSSTopPosition);
  let newHTMLLinkCSSTopPositionValue = newHTMLLinkCSSTopPosition + "px"; // console.log("new top position value to set: " +newHTMLLinkCSSTopPosition);  
  htmlLink.style.top = newHTMLLinkCSSTopPositionValue;
  linkDirectionalCSSClasses(directionalClass);
  locateLink();
}
function moveLinkWest(){ // console.log("move link west function action son!");
  let directionalClass = "link-west";
  let newHTMLLinkCSSLeftPosition = htmlLinkCSSPositions[1] - 32;
  let newHTMLLinkCSSLeftPositionValue = newHTMLLinkCSSLeftPosition + "px";
  htmlLink.style.left = newHTMLLinkCSSLeftPositionValue; // console.log("new left position value to move to: " +newHTMLLinkCSSLeftPosition+ ", current direction class: " +directionClassCurrent);  
  linkDirectionalCSSClasses(directionalClass);
  locateLink();
}

var tileN; // defines direction moveLinkAndTileXXXXXX(){} go, where XXXXXXX is one of the four directions...
var tileE;
var tileS;
var tileW;
var tileWildCard; // gets defined in the function, as it should!

function populateGridTileScreen(jsonObj, direction) { // populate gameplay grid tile screen with movement option tile's html, remove grid tile leaving behind

	
  var htmlLink = document.getElementById("link");
  var oldTile = document.getElementById("ul-screen-grid");
  oldTile.parentNode.removeChild(oldTile);
  
  var outputDiv = document.getElementById("screen-grid-box"); // console.log("JSON OBJ: " +jsonObj);
  
  outputDiv.innerHTML = jsonObj["gridTile"];
  
  var newGridTileList = document.getElementById("ul-screen-grid");
  newGridTileList.appendChild(htmlLink);
  
  // redo all of this!!!
  // functional code AND adaptive styles
  if(direction === "north") {
  	htmlLink.style.setProperty("top", "320px");
  	linkDirectionalCSSClasses("link-north");
  } else if (direction === "east") {
    htmlLink.style.setProperty("left", "0px");
    linkDirectionalCSSClasses("link-east");
  } else if (direction === "south") {
    htmlLink.style.setProperty("top", "0px");
    linkDirectionalCSSClasses("link-south");
  } else if (direction === "west") {
    htmlLink.style.setProperty("left", "480px");
    linkDirectionalCSSClasses("link-west");
  }
  updateLink();
}
function moveLinkTileJSON(string, direction){ // accepts tile option string of calling direction; ajax call is made for screen grid JSON of tile moving into; returns json response of html chunk in ul, representing the selected tile grid; second string parameter provides the direction of the tile move (north, east, south, or west).
  var requestJSONURL = "grid-tiles/"+string+".js"; // console.log("request json url: " +requestJSONURL);
  
  var request = new XMLHttpRequest();
  request.open("GET", requestJSONURL);
  request.responseType = "json";
  request.send();
  
  request.onload = function() {
    var screenGridTile = request.response; 
    populateGridTileScreen(screenGridTile, direction);
  }
}

function linkMovementHidden(str){
  console.log("hidden movement direction: " +str);
  // hidden screen grid tile id to be built
  var screenToGet = tileGridOptionsValues.door01.entranceTo;
  console.log("entrance to: " +tileGridOptionsValues.door01.entranceTo);
  //var screenToGetURL = "grid-tiles/"+screenToGet;
  //console.log("js url: " +screenToGetURL);
  moveLinkTileJSON(screenToGet, str)
  // !!!!! connect screenToGet to list of cave tile screens markup.
  // match screenToGet with value in list
  // return tile screen markup and change the current active tile screen!!!
  
}
function moveLinkAndTileNorth(str){ // move link one current screen grid value north, while simultaneously changing the current screen to the one above (north) of it
  // tileWildCard = "north";
  //console.log("move tile north with str: " +str);
  var northOptionJSONID = tileOptions[0][0]+tileOptions[0][1]; // console.log("north option json id: "+northOptionJSONID);
  moveLinkTileJSON(northOptionJSONID, str);
}
function linkMovementNorth(){ // move north options cycle
  console.log("hidden move north: " +tileGridOptionsValues);
  // tileGridOptionsValues.door01.gridPosition
  var hiddenMoveNorth = isEqual(tileGridOptionsValues.door01.gridPosition, movementOptions[0]);
  console.log("hidden move north: " +hiddenMoveNorth);
  tileWildCard = "north";
  if(hiddenMoveNorth === true) {
    console.log("hidden move north goooooo!" +hiddenMoveNorth);
    linkMovementHidden(tileWildCard);
  }
  
  if(walkabilityOptions[0] == true) { // if north option is walkable
    // NEED TO ACCOUNT FOR HALF HEIGHT BOTTOM ROW OF SCREEN GRID!!!!
    moveLinkNorth(); // move link north
  } else if ((htmlLinkScreenGridPositions[0] === 0) && (hyruleGridRow != "00")){ // else if link's current screen grid x value is 0 and hyrule grid row is not equal to "00" (str)
    moveLinkAndTileNorth(tileWildCard); // move link and tile north functionality!
   }
  // document.body.style.background = "violet";      
}
function moveLinkAndTileEast(){
  tileWildCard = "east";
  var eastOptionJSONID = tileOptions[1][0]+tileOptions[1][1]; // console.log("east option json id: " +eastOptionJSONID+ ", to10: " +tileOptions[1][0]+ ", to11: " +tileOptions[1][1]);
  moveLinkTileJSON(eastOptionJSONID, tileWildCard);
}
function linkMovementEast() {
  //var hiddenMoveEast = isEqual(tileGridOptionsValues.door.gridPosition,movementOptions[1]);
  //console.log("hidden move east: " +hiddenMoveEast);
  
  if ((walkabilityOptions[1] == true) && (htmlLinkScreenGridPositions[1] < 15)) {
  	// console.log("walkability option east is true!");
    moveLinkEast();
  } else if ((htmlLinkScreenGridPositions[1] === 15) && (hyruleGridColumn != "16")) {
    moveLinkAndTileEast();
    // console.log("move tile east functionality!!!!!");
  }
  // document.body.style.background = "#ccc";
}
function moveLinkAndTileSouth(){
  tileWildCard = "south"; // console.log("one: " +tileOptions[2][0]+ ", 2: " +tileOptions[2][1]);
  var southOptionJSONID = tileOptions[2][0]+tileOptions[2][1]; // console.log("north option json id: "+northOptionJSONID); // console.log("south option json id: " +southOptionJSONID);
  moveLinkTileJSON(southOptionJSONID, tileWildCard);
}
function linkMovementSouth(){ // console.log("screen grid position: " +htmlLinkScreenGridPositions[0]+ ", hyrule grid row: " +hyruleGridRow);
  //var hiddenMoveSouth = isEqual(tileGridOptionsValues.door.gridPosition,movementOptions[2]);
  //console.log("hidden move south: " +hiddenMoveSouth);
  
  if(walkabilityOptions[2] == true) {
    moveLinkSouth();
  } else if ((htmlLinkScreenGridPositions[0] === 10) && (hyruleGridRow != "08")) { // console.log("south tile funcationality boiiii!");
    moveLinkAndTileSouth(); // console.log("move tile south functionality!!!!");
  }
  // document.body.style.background = "#eee";
}
function moveLinkAndTileWest(){ // console.log("move link and active current screen grid tile west!");
  tileWildCard = "west";
  var westOptionJSONID = tileOptions[3][0]+tileOptions[3][1]; // console.log("wjsonid: " +westOptionJSONID+ ", to0: " +tileOptions[3][0]+ ", to1: " +tileOptions[3][1]);
  
  moveLinkTileJSON(westOptionJSONID, tileWildCard);
}
function linkMovementWest() { // console.log("walkability west option: " +walkabilityOptions[3]+ ", and html link screen grid positions 1 is: " +htmlLinkScreenGridPositions[1]);
  console.log("inside move west: " +movementOptions[3]);
  //var hiddenMoveWest = isEqual(tileGridOptionsValues.door.gridPosition,movementOptions[3]);
  //console.log("hidden move west: " +hiddenMoveWest);
  if((walkabilityOptions[3] ==  true) && (htmlLinkScreenGridPositions[1] > 0)){
    moveLinkWest();
  } else if ((htmlLinkScreenGridPositions[1] === 0) && (hyruleGridColumn != "00")){ // console.log("move tile west functionality triggered!");
    moveLinkAndTileWest(); // console.log("move tile west functionality!!!!");
  }
  // document.body.style.background = "#aaa";
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
  // console.log("walkability options: " +walkabilityOptions);
  
  window.addEventListener("keydown", event => { // // console.log("event key down: " + event.key + ", event key down event.which: " + event.which);	
    if (event.key == "ArrowUp") {
      linkMovementNorth();
    } else if (event.key == "ArrowRight") {
      linkMovementEast();
    } else if (event.key == "ArrowDown") {
      linkMovementSouth();
    } else if (event.key == "ArrowLeft") {
      linkMovementWest();
    } else if (event.key == "Enter") {
      // console.log("enter key pressed!");
      document.body.style.background = "#ff0";
    } else if (event.key == "Shift") {
      // console.log("shift key pressed!");
      document.body.style.background = "#00f";
    } else if (event.key == "z") {
      // console.log("z key pressed!");
      document.body.style.background = "#ff0";
    } else if (event.key == "x") {
      // console.log("x key pressed!");
      document.body.style.background = "#c0c0c0";
    }
  });
  window.addEventListener("keyup", event => {
    // console.log("key up: update everything son!");
    if (event.key == "ArrowUp") {
      htmlLink.classList.remove("link-green-north-action");
      document.body.style.background = "";
    } else if (event.key == "ArrowRight") {
      // console.log("arrow right key up!");
      htmlLink.classList.remove("link-green-east-action");
      document.body.style.background = "";
    } else if (event.key == "ArrowDown") {
      // console.log("arrow down key up!");
      htmlLink.classList.remove("link-green-south-action");
      document.body.style.background = "";
    } else if (event.key == "ArrowLeft") {
      // console.log("arrow left key up!");
      htmlLink.classList.remove("link-green-west-action");
      document.body.style.background = "";
    } else if (event.key == "Enter") {
      // console.log("enter key up!");
      document.body.style.background = "";
    } else if (event.key == "Shift") {
      // console.log("shift key up!");
      document.body.style.background = "";
    } else if (event.key == "z") {
      // console.log("z key up!");
      document.body.style.background = "";
    } else if (event.key == "x") {
      // console.log("x key up!");
      document.body.style.background = "";
    }
  });
}










/** **/
/** link character core **/
/** **/
/**

// create link character object 
var link = {
	//positionCSS: linksPosition(),
	//positionOnActiveGridCurrentTile: correlateGridLocationsVal,
	//positionOfOptionTilesGrid: correlateGridOptionLocations(gridLocationCoords),
	//onKeyDown: keyDown(),
	//onKeyUp: keyUp()
};
**/
var link = {};
function updateLink() { // called from locateLink function, passing all of the variable's that are vital to link's functionality, to the link character object
  // console.log("alt walkability score: " +walkabilityOptions); // console.log("update link, new tile id: " +tileID);

getCSSPositionValues(htmlLink); // console.log(htmlLinkCSSPositionValues);
getCSSPositionArrayValues(htmlLinkCSSPositionValues); // console.log(htmlLinkCSSPositions);
getPositionScreenGridValues(htmlLinkCSSPositions); // console.log(htmlLinkScreenGridPositions);
htmlScreenGrid = document.getElementById("ul-screen-grid");
getHTMLDataAttributeValue(htmlScreenGrid);
// console.log("update link function; html screen grid tile id: " +htmlScreenGridTileID);
getHyruleGridPositions(htmlScreenGridTileID); // console.log("html screen grid tile id: " +htmlScreenGridTileID); // console.log("hyrule grid positions: " +hyruleGridPositions+ ", 0: " +hyruleGridPositions[0]+ ", 1: " +hyruleGridPositions[1]); // console.log(hyruleGridPositions);
getScreenGridTiles(hyruleGridPositions); // console.log(tileGridValues);
parseGrid();
getMovementOptions(htmlLinkScreenGridPositions); // console.log("movement options: " + movementOptions);
getAdjacentHyruleTiles(); // console.log("tile options: " +tileOptions);  
getOptionGridValues(); // console.log(optionTilePositionValues);
convertOptionsToTileValues(optionTilePositionValues); // console.log("option tile values: " +optionTileValues);  
convertTileValuesToTileDefinitions(optionTileValues); // console.log("option tile value definitions: " +optionTileDefinitions); 
getWalkabilityScore(optionTileDefinitions); // console.log("walkability option: " +walkabilityOptions);
currentDirection();
  
  link = {
    cssPositionValues: htmlLinkCSSPositionValues,
    cssPositionArrayValues: htmlLinkCSSPositions,
    positionScreenGridValues: htmlLinkScreenGridPositions,
    tileGrid: htmlScreenGridTileID,
    hyruleGridPositions: hyruleGridPositions,
    screenGridTileValues: tileGridValues,
    movementOptions: movementOptions,
    hyruleAdjacentTiles: tileOptions,
    optionGridValues: optionTilePositionValues,
    optionTileValues: optionTileValues,
    optionTileDefitions: optionTileDefinitions,
    walkabilityScore: walkabilityOptions,
    currentDirection: directionClassCurrent
  }
  outputDev();
}



function outputDev() { // console.log("alt walkability score: " +walkabilityOptions);
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
  let outputVariables = document.getElementById("console-log-variables");
  outputVariables.innerHTML = "";
  outputVariables.appendChild(outputList);
  //outputVariables.innerHTML = outputList;
}

function locateLink(){ // locateLink function is center for link's functionality. all functions go through here.
  getCSSPositionValues(htmlLink); // get link's current css top/left position values // console.log(htmlLinkCSSPositionValues);
  getCSSPositionArrayValues(htmlLinkCSSPositionValues); // convert current css position values into integers, aka deleting "px" from string
  // console.log(htmlLinkCSSPositions);
  getPositionScreenGridValues(htmlLinkCSSPositions); // convert css position integers into correlating screen grid array values dividing by grid aspect ratio
  // console.log(htmlLinkScreenGridPositions);
  getHTMLDataAttributeValue(htmlScreenGrid); // get screen grid data attribute value
  // console.log(" tile id from locate link function: " +htmlScreenGridTileID);
  getHyruleGridPositions(htmlScreenGridTileID); // console.log(hyruleGridPositions);
  getScreenGridTiles(hyruleGridPositions); // console.log(tileGridValues);
  getScreenGridOptions();
  
  
  parseGrid(); // get current active screen grid array slices, for finding current tile option move values
  getMovementOptions(htmlLinkScreenGridPositions); // get current active screen grid movement options/tiles
  // console.log("movement options: " + movementOptions);
  //getMovementOptionsHidden(movementOptions);
  getAdjacentHyruleTiles(); // get current active screen grid's surrounding tile options on hyrule grid
  // console.log("tile options: " +tileOptions);
  getOptionGridValues(); // get option grid values to be converted into tile definitions for defining movement options
  // console.log(optionTilePositionValues);
  convertOptionsToTileValues(optionTilePositionValues); // convert movement options to hyrule grid values
  // console.log("option tile values: " +optionTileValues);
  convertTileValuesToTileDefinitions(optionTileValues); // convert movement options hyrule grid values into tile definitions
  // console.log("option tile value definitions: " +optionTileDefinitions);
  getWalkabilityScore(optionTileDefinitions); // look up tile definitions for their defined walkability score; walkable is true, unwalkable is false
  // console.log("walkability option: " +walkabilityOptions);
  currentDirection() // loop through link's class attribute values, find current directional setting (ex, "link-south"), pass along into movement action functions
  // console.log(directionClassCurrent);
  link = {
    cssPositionValues: htmlLinkCSSPositionValues,
    cssPositionArrayValues: htmlLinkCSSPositions,
    positionScreenGridValues: htmlLinkScreenGridPositions,
    tileGrid: htmlScreenGridTileID,
    hyruleGridPositions: hyruleGridPositions,
    screenGridTileValues: tileGridValues,
    movementOptions: movementOptions,
    hyruleAdjacentTiles: tileOptions,
    optionGridValues: optionTilePositionValues,
    optionTileValues: optionTileValues,
    optionTileDefitions: optionTileDefinitions,
    walkabilityScore: walkabilityOptions,
    currentDirection: directionClassCurrent
  }
  
  // console.log("Link object: " +link); // console.log("link object css positions values: " +link.cssPositionValues);
  
  
  /**
  ** dev only!!
  **
  **
  **
  **
  **
  **/
outputDev();





}



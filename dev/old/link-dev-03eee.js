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
  //console.log("screen grid positions from function: " +htmlLinkScreenGridPositions);
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
var gridTileHTML0708;




function getOptionNorth(){
  optionNorthX = htmlLinkScreenGridPositions[0] - 1;
  //console.log("new option north x value: " +optionNorthX);
  return optionNorthX;
}
function getOptionEast(){
  //optionEastY = (parseInt(hyruleGridColumn) + 1).toString();
  optionEastY = htmlLinkScreenGridPositions[1] + 1;
  //console.log("option east val: " +optionEastY);
  
  return optionEastY;
}
function getOptionSouth(){
  // optionSouthX = (parseInt(hyruleGridRow) + 1).toString();
  optionSouthX = htmlLinkScreenGridPositions[0] + 1;
  return optionSouthX;
}
function getOptionWest(){
  // optionWestY = (parseInt(hyruleGridColumn) - 1).toString();
  optionWestY = htmlLinkScreenGridPositions[1] - 1;
  //console.log("option west y: " +optionWestY);
  
  return optionWestY;
}


function createHTMLScript(array) {
  console.log("inside create html script function! array of values: " +array);
  console.log("id: " +htmlScreenGridTileID);
  for(var i = 0; i < array.length; i++) {
  	if(array[i]){ // check for truthy value
  	  let htmlScript = document.createElement("script");
    
      htmlScript.src = array[i]; // add tile option grid element's script path to script element's src attribute
      document.body.appendChild(htmlScript); // add scripts to body
      console.log("script : " +htmlScript.src+ " loaded!");
    }
  }
  
}
var tileScripts = []; // array of script src attribute values; utilized when creating tile options, the scripts at these src's contains markup for option tiles.
// var northScriptSrc;

var valIDs = [];
function matchScriptToGridID() {

}
function createTileOptionsHTML(){ // generate and inject script elements with src attribute values correlating to tile option values for current active screen grid. script's content is markup for each tile option.
  console.log("tile options from creat tile options html function: " +tileOptions);
  //console.log(typeof gridTileHTML0707);
  //console.log(gridTileHTML0707);
  // NEED TO ACCOUNT FOR VALUES THAT DO NOT/WILL NEVER EXIST!!!!
  // example: code below, starting from origin tile '0808', returns a south tile option ('0908'), which does not and will not ever exist.
  let northScriptSrc;
  let eastScriptSrc;
  let southScriptSrc;
  let westScriptSrc;
  let northTileIDVar;
  let eastTileIDVar;
  let southTileIDVar;
  let westTileIDVar;
  let tileHTMLArrays = [];
  
  let northScriptX;
  let eastScriptY;
  let southScriptX;
  let westScriptY;
  
  
  northScriptX = tileOptions[0][0];
  if(northScriptX > 0){
    northTileIDVar = "gridTileHTML"+tileOptions[0][0]+tileOptions[0][1];
    // northTileIDVar = "gridTileHTML"+northTileIDVar;
    //console.log("North!!!");
    //console.log(window[northTileIDVar]);
    let htmlNorth = document.getElementById("off-screen-grid-north");
    htmlNorth.innerHTML = window[northTileIDVar];
    htmlNorth.setAttribute("data-screen-grid-tile", tileOptions[0][0]+tileOptions[0][1]); 
  }
  eastScriptY = tileOptions[1][1];
  if(eastScriptY < 14) {
    eastTileIDVar = "gridTileHTML"+tileOptions[1][0]+tileOptions[1][1];
    let htmlEast = document.getElementById("off-screen-grid-east");
    htmlEast.innerHTML = window[eastTileIDVar];
    htmlEast.setAttribute("data-screen-grid-tile", tileOptions[1][0]+tileOptions[1][1]);
  }
  southScriptX = tileOptions[2][0];
  if(southScriptX < 8){
    southTileIDVar = "gridTileHTML"+tileOptions[2][0]+tileOptions[2][1];
    let htmlSouth = document.getElementById("off-screen-grid-south");
    htmlSouth.innerHTML = window[southTileIDVar];
    console.log("south attribute: " +tileOptions[2][0]+tileOptions[2][1]);
    htmlSouth.setAttribute("data-screen-grid-tile", tileOptions[2][0]+tileOptions[2][1]);
  }
  	  
  westScriptY = tileOptions[3][1];
  if(westScriptY > 1){
    westTileIDVar = "gridTileHTML"+tileOptions[3][0]+tileOptions[3][1];
    let htmlWest = document.getElementById("off-screen-grid-west");
    htmlWest.innerHTML = window[westTileIDVar];
    htmlWest.setAttribute("data-screen-grid-tile", tileOptions[3][0]+tileOptions[3][1]);
  }
/**  northTileIDVar = "gridTileHTML"+northTileIDVar;
  console.log("North!!!");
  console.log(window[northTileIDVar]);
  console.log(typeof northTileIDVar); **/
  
  
  
  
  
  /**
  if(northScriptX > 0) {
    northScriptSrc = "grid-tiles/" +tileOptions[0][0]+tileOptions[0][1]+ ".js";
  } else {
    northScriptSrc = "";
  }
  
  let eastScriptY = tileOptions[1][1];
  eastTileIDVar = tileOptions[1][0]+tileOptions[1][1];
  
  if(eastScriptY < 14){
    eastScriptSrc = "grid-tiles/" +tileOptions[1][0]+tileOptions[1][1]+ ".js";
  } else {
    eastScriptSrc = "";
  }

  let southScriptX = tileOptions[2][0];
  southTileIDVar = tileOptions[2][0]+tileOptions[2][1];
  if(southScriptX < 8){
    southScriptSrc = "grid-tiles/" +tileOptions[2][0]+tileOptions[2][1]+ ".js";
  } else {
    southScriptSrc = "";
  }
  
  let westScriptY = tileOptions[3][1];
  westTileIDVar = tileOptions[3][0]+tileOptions[3][1];
  console.log("west: " +westTileIDVar);
  if(westScriptY > 1){
    westScriptSrc = "grid-tiles/" +tileOptions[3][0]+tileOptions[3][1]+ ".js";
  } else {
    westScriptSrc = "";
  }
  
  tileScripts = [northScriptSrc, eastScriptSrc, southScriptSrc, westScriptSrc];
  tileScriptIDs = [northScriptX, eastScriptY, southScriptX, westScriptY];
  console.log("tile scripts array of src attribute values to be loaded! " +tileScripts);
  tileHTMLArrays = [northTileIDVar, eastTileIDVar, southTileIDVar, westTileIDVar];
  console.log(tileHTMLArrays);
  // createHTMLScript(tileScripts); //console.log("inside create html script function! array of values: " +array);
  console.log("id: " +htmlScreenGridTileID);
  for(var i = 0; i < tileScripts.length; i++) {
  	if(tileScripts[i]){ // check for truthy value
      console.log(tileScriptIDs[i]);
  	  console.log(tileHTMLArrays[i]);
  	  let yourDad = "gridTileHTML"+tileHTMLArrays[i];
  	  tileHTMLArrays[i] = "gridTileHTML"+tileHTMLArrays[i];
  	  console.log("what now?: " +tileHTMLArrays[i]);
  	  let whatNow = tileHTMLArrays[i];
  	  let htmlScript = document.createElement("script");
  	  document.body.appendChild(htmlScript); // add scripts to body
  	  htmlScript.src = tileScripts[i]; // add tile option grid element's script path to script element's src attribute
      //document.body.appendChild(htmlScript); // add scripts to body
      
      htmlScript.onload = function(whatNow) {
      	console.log("script : " +htmlScript.src+ " loaded!");
        console.log("script injection onload function innards!");
        console.log("test for variables here i reckon....");
        //console.log("what now?: " this.whatNow);
        console.log(tileScriptIDs[i]);
        console.log(yourDad);
        matchScriptToGridID();
      }
    }
  }
  
  
  
  
  
  
  
  
  let valPrefix = "gridTileHTML";
  let valSuffix = ".js";
  let valIDNorth = valPrefix+tileOptions[0][0]+tileOptions[0][1]+valSuffix;
  let valIDEast = valPrefix+tileOptions[1][0]+tileOptions[1][1]+valSuffix;
  let valIDSouth = valPrefix+tileOptions[2][0]+tileOptions[2][1]+valSuffix;
  let valIDWest = valPrefix+tileOptions[3][0]+tileOptions[3][1]+valSuffix;
  valIDs = [valIDNorth, valIDEast, valIDSouth, valIDWest];
  
  let someTHING = "gridTileHTML"+tileOptions[3][0]+tileOptions[3][1];
  console.log("this thing: " +someTHING+ ", type: " +typeof someTHING);
  // console.log("this thing, alt: " +gridTileHTML0807[]);
  //console.log(gridTileHTML0708);
  console.log("tile scripts id values: " +valIDs+ ", type of first: " +typeof valIDs[0]);
  console.log("tile scripts array values: " +tileScripts);
  return valIDs;
  
**/
}
function getAdjacentHyruleTiles() { // get n, e, s, w hyrule tile grids adjacent to current active tile grid gameplay is on
  getOptionNorth(); // console.log("tile option north x: " +tileNorthOptionX);
  getOptionEast();
  getOptionSouth();
  getOptionWest();
  let zeroOptionNorthX = parseInt(hyruleGridRow) - 1;
  zeroOptionNorthX = 0 + zeroOptionNorthX.toString(); //console.log("zero option north x: " +zeroOptionNorthX);
  let zeroOptionEastY = parseInt(hyruleGridColumn) + 1;
  zeroOptionEastY = 0 + zeroOptionEastY.toString(); //console.log("zero option east y : " +zeroOptionEastY);
  let zeroOptionSouthX = parseInt(hyruleGridRow) + 1;
  zeroOptionSouthX = 0 + zeroOptionSouthX.toString(); //console.log("zero option south x: " +zeroOptionSouthX);
  let zeroOptionWestY = parseInt(hyruleGridColumn) - 1; //console.log("zero option west y: " +zeroOptionWestY);
  zeroOptionWestY = 0 + zeroOptionWestY.toString(); //console.log("zero option west y deuce: " +zeroOptionWestY);
  tileOptionNorth = [zeroOptionNorthX, hyruleGridColumn]; //console.log("tile option north: " +tileOptionNorth);
  tileOptionEast = [hyruleGridRow, zeroOptionEastY];
  tileOptionSouth = [zeroOptionSouthX, hyruleGridColumn];
  tileOptionWest = [hyruleGridRow, zeroOptionWestY]; //console.log("tile option west: " +tileOptionWest);
  tileOptions = [tileOptionNorth, tileOptionEast, tileOptionSouth, tileOptionWest];
  console.log("tile options: " +tileOptions+ ", north tile option: " +tileOptions[0]);
  
  // now that we have the potential tile options for the current active screen grid, fire off each options correlating script, which contains the markup to create the screen grid.
  createTileOptionsHTML();
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
  let movementOptionNorth = [optionNorthX, htmlLinkScreenGridPositions[1]];
  //console.log("north values: x: " +optionNorthX+ ", y: " +currentGridColumn);
  /**console.log("if this value is negative, check for option tile north??? DO SOMETHING HERE!");
  
  if((optionNorthX === -1) && (hyruleGridRow != "00")) {
    console.log("top row of the active screen grid");
    console.log("hyrule grid row: " +hyruleGridRow+ ", type of: " +typeof hyruleGridRow);
    
    
  }**/
  
  //console.log("movement option north: " +movementOptionNorth);
  
  let movementOptionEast = [htmlLinkScreenGridPositions[0], optionEastY];
  let movementOptionSouth = [optionSouthX, htmlLinkScreenGridPositions[1]];
  let movementOptionWest = [htmlLinkScreenGridPositions[0], optionWestY];
  //console.log("movement option west: " +movementOptionWest);
  movementOptions = [movementOptionNorth, movementOptionEast, movementOptionSouth, movementOptionWest];
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
var optionTilePositionValues = [];

function getOptionGridValues() { // convert movement options to tile definitions for defining walkability, aka pseudo collision detection
  let optNorthX = htmlLinkScreenGridPositions[0] - 1;
  let optNorthY = htmlLinkScreenGridPositions[1];
  optNorthArrayPosition = (optNorthX * 16) + optNorthY;
  optNorthArrayPosition = (optNorthX * 16) + optNorthY; // console.log(optNorthArrayPosition);
  let optEastX = htmlLinkScreenGridPositions[0];
  //console.log("opt east x: " +optEastX);
  let optEastY = htmlLinkScreenGridPositions[1] + 1;
  //console.log("opt east y: " +optEastY);
  /**if(optEastY > 15) {
  	console.log("opt east y is greater than screen grid value!");
    optEastY === false;
  }**/
  
  optEastArrayPosition = (optEastX * 16) + optEastY;
  //console.log("opt east array position: " +optEastArrayPosition);
  let optSouthX = htmlLinkScreenGridPositions[0] + 1;
  let optSouthY = htmlLinkScreenGridPositions[1];
  optSouthArrayPosition = (optSouthX * 16) + optSouthY; // console.log("south array position: " +optSouthArrayPosition);
  let optWestX = htmlLinkScreenGridPositions[0];
  let optWestY = htmlLinkScreenGridPositions[1] - 1;
  optWestArrayPosition = (optWestX * 16) + optWestY; // console.log(optWestArrayPosition);
  return optionTilePositionValues = [optNorthArrayPosition, optEastArrayPosition, optSouthArrayPosition, optWestArrayPosition];
}
var optionTileValues = []; // array of values defined in hyrule grid, correlating to possible move options from current position
var optionTileDefinitions = []; // array of tile values converted into tile definitions

function convertOptionsToTileValues(array) {
  //console.log("array of tile option values to be converted to definitions: " + array);
  let northOptionTileDefinition = tileGridValues[array[0]];
  let eastOptionTileDefinition = tileGridValues[array[1]];
  console.log("east option tile grid value to be defined: " +tileGridValues[array[2]]);
  
  let southOptionTileDefinition = tileGridValues[array[2]];
  //console.log("west option tile grid value to be defined: " +tileGridValues[array[3]]);
  let westOptionTileDefinition = tileGridValues[array[3]];
  //console.log("west option tile definition: " + westOptionTileDefinition);
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
  walkabilityOptions = []; // reset variable after each call...probably not ideal/because you're using globals and/or not setting equality correctly
  console.log("definitions to test for walkability: " +optionTileDefinitions);
  //console.log("walkability scores to test definitions against: " +gridWalkability);
  for(var j = 0; j < array.length; j++) { //console.log("tile value to define " +j+ ", " +array[j]);
    walkabilityOption = walkabilityMatch(array[j]);
    walkabilityOptions.push(walkabilityOption);
  } // console.log("walkability options: " +walkabilityOptions);
  return walkabilityOptions;
}




var directionClasses = ["link-north", "link-east", "link-south", "link-west"]; // base level direction style class values for link character
var directionClassCurrent; // class attribute value defining link's directional style


function testClassForMatch(string) {
  for(var j = 0; j < directionClasses.length; j++) { //console.log("string: " +string+ ", class: " +movementClasses[j]);
    if(string === directionClasses[j]) {
      directionClassCurrent = string;
      return directionClassCurrent;
    }
  }
}
function currentDirection(){
  let htmlLinkCSSCurrentClasses = htmlLink.classList;
  for(var i = 0; i < htmlLinkCSSCurrentClasses.length; i++) { //console.log("class: " +currentClasses[i]);
    testClassForMatch(htmlLinkCSSCurrentClasses[i]);
    return directionClassCurrent;
  }
}
/**
**
** movement actions
**
**/
function moveLinkNorth(){
  // console.log("move link north function action son! current css top position value: " +htmlLinkCSSPositions[0]);
  let newHTMLLinkCSSTopPosition = htmlLinkCSSPositions[0] - 32; //console.log("move north css top position value: " +newHTMLLinkCSSTopPosition);
  let newHTMLLinkCSSTopPositionValue = newHTMLLinkCSSTopPosition + "px"; //console.log("new css top value: " +newHTMLLinkCSSTopPositionValue);
  htmlLink.style.top = newHTMLLinkCSSTopPositionValue;
  // console.log(directionClassCurrent);
  //htmlLink.classList.toggle(directionClassCurrent); // remove current link-direction class
  //htmlLink.classList.toggle("link-north"); // add link-north class
  htmlLink.classList.remove("link-east", "link-south", "link-west"); // remove current link-direction class
  htmlLink.classList.add("link-north"); // add link-north direction style class
  htmlLink.classList.add("link-green-north-action"); // add link-north animated class
  // add audio for action
  // console.log("current active grid screen position in move function: " +htmlLinkScreenGridPositions);  
  
  
  
  
  
  updateLink();
  
  
  
  //outputDev();
}
function moveLinkEast(){
  // console.log("move link east function action son!");
  let newHTMLLinkCSSLeftPosition = htmlLinkCSSPositions[1] + 32;
  // console.log("new left position value to move to: " +newHTMLLinkCSSLeftPosition);
  let newHTMLLinkCSSLeftPositionValue = newHTMLLinkCSSLeftPosition + "px";
  htmlLink.style.left = newHTMLLinkCSSLeftPositionValue;
  //htmlLink.classList.toggle(directionClassCurrent); // remove current link-direction class attribute value
  htmlLink.classList.remove("link-north", "link-south", "link-west");
  htmlLink.classList.add("link-east"); // add directional style link-east class value
  htmlLink.classList.add("link-green-east-action"); // add link-east animated class
  
  //locateLink();
  updateLink();
}
function moveLinkSouth(){
  // console.log("move link south function action son!");
  let newHTMLLinkCSSTopPosition = htmlLinkCSSPositions[0] + 32;
  // console.log("new top position value to move to: " +newHTMLLinkCSSTopPosition);
  let newHTMLLinkCSSTopPositionValue = newHTMLLinkCSSTopPosition + "px";
  // console.log("new top position value to set: " +newHTMLLinkCSSTopPosition);  
  htmlLink.style.top = newHTMLLinkCSSTopPositionValue;
  //htmlLink.classList.toggle(directionClassCurrent);
  //htmlLink.classList.toggle("link-south");
  htmlLink.classList.remove("link-north", "link-east", "link-west");
  htmlLink.classList.add("link-south");
  htmlLink.classList.add("link-green-south-action"); // add link-south animated class
  
  updateLink();
}
function moveLinkWest(){
  // console.log("move link west function action son!");
  let newHTMLLinkCSSLeftPosition = htmlLinkCSSPositions[1] - 32;
  // console.log("new left position value to move to: " +newHTMLLinkCSSLeftPosition);
  let newHTMLLinkCSSLeftPositionValue = newHTMLLinkCSSLeftPosition + "px";
  htmlLink.style.left = newHTMLLinkCSSLeftPositionValue;
  // console.log("current direction class: " +directionClassCurrent);
  
  //htmlLink.classList.toggle(directionClassCurrent);
  
  //htmlLink.classList.toggle("link-west");
  htmlLink.classList.remove("link-north", "link-east", "link-south");
  htmlLink.classList.add("link-west");
  //currentDirection()
  //console.log(directionClassCurrent);
  htmlLink.classList.add("link-green-west-action"); // add link-west animated class
  updateLink();
}


function moveLinkAndTileNorth(){ // move link one current screen grid value north, while simultaneously changing the current screen to the one above (north) of it
  // console.log("move link and active current screen grid tile north!");
  let screenGridNorth = document.getElementById("off-screen-grid-north");
  let northContent = screenGridNorth.innerHTML;
  //screenGridNorth.classList.remove("off-screen-grid");
  let screenGridCurrent = document.getElementById("ul-screen-grid");
  
  let linkClone = document.getElementById("link");
  
  screenGridCurrent.innerHTML = northContent;
  screenGridCurrent.appendChild(linkClone);
  htmlLink.style.setProperty("top", "320px"); // 304 (336-32 = 304) is last position in array at 32px aspect ratio scale; 320 takes half height of last row into account
  let newTileIDAttribute = screenGridNorth.dataset.screenGridTile;
  screenGridCurrent.setAttribute("data-screen-grid-tile", newTileIDAttribute);
  // console.log("new tile id attribute: " +newTileIDAttribute);
  // console.log("new css positions: " +htmlLinkCSSPositionValues);
  htmlScreenGridTileID = newTileIDAttribute;
  let newCSSPositionValues = getCSSPositionValues(htmlLink); // get link's current css top/left position values

  updateLink();
}
function linkMovementNorth(){ // move north options cycle
  if(walkabilityOptions[0] == true) { // if north option is walkable
    // NEED TO ACCOUNT FOR HALF HEIGHT BOTTOM ROW OF SCREEN GRID!!!!
    moveLinkNorth(); // move link north
  } else if ((htmlLinkScreenGridPositions[0] === 0) && (hyruleGridRow != "00")){ // else if link's current screen grid x value is 0 and hyrule grid row is not equal to "00" (str)
    moveLinkAndTileNorth(); // move link and tile north functionality!
    // console.log("move tile north functionality!!!!");
   }
  document.body.style.background = "violet";      
}





function moveLinkAndTileEast(){
  let screenGridEast = document.getElementById("off-screen-grid-east");
  let eastContent = screenGridEast.innerHTML;
  let screenGridCurrent = document.getElementById("ul-screen-grid");
  let linkClone = document.getElementById("link");
  screenGridCurrent.innerHTML = eastContent;
  htmlLink.style.setProperty("left", "0");
  let newTileIDAttribute = screenGridEast.dataset.screenGridTile;
  screenGridCurrent.setAttribute("data-screen-grid-tile", newTileIDAttribute);
  htmlScreenGridTileID = newTileIDAttribute;
  let newCSSPositionValues = getCSSPositionValues(htmlLink);
  //console.log("new css position values: " +newCSSPositionValues);
  //console.log("last thing in move link and tile east before update link function fires off!");
  
  updateLink();
}
function linkMovementEast() {
	console.log("link movement east function!");
	console.log("html link screen grid positions 1: " +htmlLinkScreenGridPositions[1]+ ", hyruleGridColumn value: " +hyruleGridColumn);
	console.log("hyrule grid row: " +hyruleGridRow);
	
	
  if ((walkabilityOptions[1] == true) && (htmlLinkScreenGridPositions[1] < 15)) {
  	console.log("walkability option east is true!");
    moveLinkEast();
  } else if ((htmlLinkScreenGridPositions[1] === 15) && (hyruleGridColumn != "15")) {
    moveLinkAndTileEast();
    console.log("move tile east functionality!!!!!");
  }
  document.body.style.background = "#ccc";
}
function moveLinkAndTileSouth(){
  let screenGridSouth = document.getElementById("off-screen-grid-south");
  let southContent = screenGridSouth.innerHTML;
  let screenGridCurrent = document.getElementById("ul-screen-grid");
  let linkClone = document.getElementById("link");
  screenGridCurrent.innerHTML = southContent;
  screenGridCurrent.appendChild(linkClone);
  htmlLink.style.setProperty("top", "0px"); // 0 = top row of screen grid
  console.log("screen grid tile id: " +htmlScreenGridTileID);
  let newTileIDAttribute = screenGridSouth.dataset.screenGridTile;
  console.log("new tile id attribute: " +newTileIDAttribute);
  
  screenGridCurrent.setAttribute("data-screen-grid-tile", newTileIDAttribute);
  htmlScreenGridTileID = newTileIDAttribute;
  let newCSSPositionValues = getCSSPositionValues(htmlLink); // get link's current css top/left position values
  getHTMLDataAttributeValue(htmlScreenGrid);
  updateLink();
}
function linkMovementSouth(){
	console.log("screen grid position: " +htmlLinkScreenGridPositions[0]+ ", hyrule grid row: " +hyruleGridRow+ ", hyrule grid row type: " +typeof hyruleGridRow);
	
  if(walkabilityOptions[2] == true) {
  	  console.log("move link south true!");
    moveLinkSouth();
  } else if ((htmlLinkScreenGridPositions[0] === 10) && (hyruleGridRow != "08")) {
  	  console.log("move tile south functionality first!!!!");
    moveLinkAndTileSouth();
    console.log("move tile south functionality!!!!");
  }
  document.body.style.background = "#eee";
}
function moveLinkAndTileWest(){
  let screenGridWest = document.getElementById("off-screen-grid-west");
  let westContent = screenGridWest.innerHTML;
  let screenGridCurrent = document.getElementById("ul-screen-grid");
  let linkClone = document.getElementById("link");
  screenGridCurrent.innerHTML = westContent;
  htmlLink.style.setProperty("left", "480px");
  let newTileIDAttribute = screenGridWest.dataset.screenGridTile;
  screenGridCurrent.setAttribute("data-screen-grid-tile", newTileIDAttribute);
  htmlScreenGridTileID = newTileIDAttribute;
  let newCSSPositionValues = getCSSPositionValues(htmlLink);
  updateLink();
}
function linkMovementWest() {
  if(walkabilityOptions[3] ==  true) {
    moveLinkWest();
  } else if ((htmlLinkScreenGridPositions[1] === 0) && (hyruleGridColumn != "00")){
    moveLinkAndTileWest();
    console.log("move tile west functionality!!!!");
  }
  document.body.style.background = "#aaa";
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
  
  window.addEventListener("keydown", event => { // console.log("event key down: " + event.key + ", event key down event.which: " + event.which);	
    // console.log(walkabilityOptions[0]);
    //console.log(tileOptions[0]);
    //console.log(parseInt(tileOptions[0]));
    
    
    // need to account for top row of hyrule grid, where there will never be an option to move north
    // same with bottom row of hyrule grid, again, never will be an option to move south
    
    //if(htmlLinkScreenGridPositions[0] === 0) {
      //console.log("position is equal to zero: " +htmlLinkScreenGridPositions[0]+ ", and north tile option is: " +tileOptions[0]);
    //}
    console.log("east walkability option: " +walkabilityOptions[1]);
    //console.log("current active grid screen position: " +htmlLinkScreenGridPositions);
    //if ((event.key == "ArrowUp") && (walkabilityOptions[0] == true)) {
    if (event.key == "ArrowUp") {
      /**if(walkabilityOptions[0] == true) {
      //console.log("north walkability option: " +walkabilityOptions[0]);
      //console.log("current active grid screen position: " +htmlLinkScreenGridPositions);
      

      // if north value is undefined...at top of current active screen grid AND there is a hyrule tile grid north option
      // move north
      // at half grid aspect ratio height to account for half row at bottom of all screen grids
      
        moveLinkNorth();
      } else if ((htmlLinkScreenGridPositions[0] === 0) && (hyruleGridRow != "00")){
        console.log("move tile north functionality!!!!");
        console.log("move tile north functionality!!!!");
        console.log("move tile north functionality!!!!");
        console.log("move tile north functionality!!!!");
        console.log("move tile north functionality!!!!");
      }

  	  
  	  
      document.body.style.background = "violet";
      **/
      linkMovementNorth();
    //} else if ((event.key == "ArrowRight") && (walkabilityOptions[1] == true)) {
    } else if (event.key == "ArrowRight") {
      linkMovementEast();
    } else if (event.key == "ArrowDown") {
      linkMovementSouth();
    } else if (event.key == "ArrowLeft") {
      linkMovementWest();
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
    console.log("key up: update everything son!");
    //locateLink();
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
  // console.log("alt walkability score: " +walkabilityOptions);
  //console.log("update link, new tile id: " +tileID);
  /**
  console.log("screen grid id: " +htmlScreenGridTileID);
  //console.log("new css position values: " +newCSSPositionValues);
  let newCSSPositionValues = getCSSPositionValues(htmlLink); // get link's current css top/left position values
  console.log(" new css position values: " +htmlLinkCSSPositionValues);
  console.log("alt new css position values: " +newCSSPositionValues);
  getCSSPositionArrayValues(htmlLinkCSSPositionValues)
  console.log("new html link css positions: " +htmlLinkCSSPositions);
  getPositionScreenGridValues(htmlLinkCSSPositions);
  console.log("new position csreen grid values: " +htmlLinkScreenGridPositions);
  getHTMLDataAttributeValue(htmlScreenGrid);
  console.log(" tile id from updateLink function: " +htmlScreenGridTileID);
  getHyruleGridPositions(htmlScreenGridTileID);
  console.log(hyruleGridPositions);
  **/
  
  


getCSSPositionValues(htmlLink);
console.log(htmlLinkCSSPositionValues);
getCSSPositionArrayValues(htmlLinkCSSPositionValues);
console.log(htmlLinkCSSPositions);
getPositionScreenGridValues(htmlLinkCSSPositions);
console.log(htmlLinkScreenGridPositions);
htmlScreenGrid = document.getElementById("ul-screen-grid");
getHTMLDataAttributeValue(htmlScreenGrid);
console.log(htmlScreenGridTileID);
getHyruleGridPositions(htmlScreenGridTileID);
console.log("html screen grid tile id: " +htmlScreenGridTileID);
console.log("hyrule grid positions: " +hyruleGridPositions+ ", 0: " +hyruleGridPositions[0]+ ", 1: " +hyruleGridPositions[1]);

console.log(hyruleGridPositions);
getScreenGridTiles(hyruleGridPositions);
console.log(tileGridValues);
parseGrid();
getMovementOptions(htmlLinkScreenGridPositions);
console.log("movement options: " + movementOptions);
getAdjacentHyruleTiles();
console.log("tile options: " +tileOptions);  
getOptionGridValues();
console.log(optionTilePositionValues);
convertOptionsToTileValues(optionTilePositionValues);
console.log("option tile values: " +optionTileValues);  
convertTileValuesToTileDefinitions(optionTileValues);
console.log("option tile value definitions: " +optionTileDefinitions); 
getWalkabilityScore(optionTileDefinitions);
console.log("walkability option: " +walkabilityOptions);
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



function outputDev() {
  //console.log("alt walkability score: " +walkabilityOptions);
  
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
  getCSSPositionValues(htmlLink); // get link's current css top/left position values
  // console.log(htmlLinkCSSPositionValues);
  getCSSPositionArrayValues(htmlLinkCSSPositionValues); // convert current css position values into integers, aka deleting "px" from string
  // console.log(htmlLinkCSSPositions);
  getPositionScreenGridValues(htmlLinkCSSPositions); // convert css position integers into correlating screen grid array values dividing by grid aspect ratio
  // console.log(htmlLinkScreenGridPositions);
  getHTMLDataAttributeValue(htmlScreenGrid); // get screen grid data attribute value
  console.log(" tile id from locate link function: " +htmlScreenGridTileID);
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
  // console.log(optionTilePositionValues);
  convertOptionsToTileValues(optionTilePositionValues); // convert movement options to hyrule grid values
  //console.log("option tile values: " +optionTileValues);
  
  convertTileValuesToTileDefinitions(optionTileValues); // convert movement options hyrule grid values into tile definitions
  // console.log("option tile value definitions: " +optionTileDefinitions);
  
  getWalkabilityScore(optionTileDefinitions); // look up tile definitions for their defined walkability score; walkable is true, unwalkable is false
  // console.log("walkability option: " +walkabilityOptions);
  
  currentDirection() // loop through link's class attribute values, find current directional setting (ex, "link-south"), pass along into movement action functions
  // console.log(directionClassCurrent);
  
  
  
  // eventListeners();
  // updateLink(); // fires off to update link character object with current variables that are vital to link character's functionality
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
outputDev();





}



// dev only
function link() {
	

  function consoleLogHTML(el){
    "use strict";
    let outputHTML = document.createElement("div");
    outputHTML.id = "console-log";
    outputHTML.innerHTML = el;
    document.body.appendChild(outputHTML);
  }
  var outputHTMLContent = "<h1>Console.log</h1>";

  //consoleLogHTML(outputHTMLContent);

/** globals **/
  var linkHTML = document.getElementById("link"); // link character html element
  var linkCSSTop; // link character's css top property value
  var linkCSSLeft; // link character's css left property value
  var linkCSSPositions = []; // link character's css position values, which correlate to positioning on active grid tile
  var linkCSSGridPositions = []; // link character's css position values as integers, on current active grid
  var linkScreenGridPositions = []; // link character's position values converted to grid array points
  var northOptions = [];
  var eastOptions = [];
  var southOptions = [];
  var westOptions = [];
  
  //var htmlDataAttribute;
  var dataAttributeValue; // data attribute value of screen grid
  var activeColumnID; // active column id of current tile on hyrule grid
  var activeRowID; // active row id of current tile on hyrule grid
  var hyruleGridTilePrepend = "hyruleGridTile"; // text prepended to dataAttributeValue, correlates to a hyruleGridTileXXXX definition; an array of all the tiles in the grid.
  var tileGridID; // id value of dataAttributeValue + hyruleGridTilePrepend; correlates to hyruleGridTiles definition; array of tile values making up current grid.
  var tileGridValues = []; // array of tile values making up current active screen grid; 
  var tileGridRows = []; // array of rows of tile values making up current active screen grid;
  var gridAspectRatio = 32; // size of tiles; default is 16x16...512x512
  var tileGridOptions = []; // array of arrays consisting of grid values corresponding to possible tile movement (north, east, south, west) options for link

  function stripCharacters(string) {
  	string = string.replace(/px/,"");
  	return string;
  }
  function linkCSSLeftValue() { // returns value of left css property of link's character
    linkCSSLeft = window.getComputedStyle(linkHTML,null).getPropertyValue("left");
    return linkCSSLeft;
  }
  function linkCSSTopValue() { // returns value of top css property of link's character
    linkCSSTop = window.getComputedStyle(linkHTML,null).getPropertyValue("top");
    return linkCSSTop;
  }
  function linksPosition() { // locate link's css position values (top/left) in current active tile grid; fires off @ game start.
    linkCSSLeft = linkCSSLeftValue(); // get link's current css left property value
    linkCSSTop = linkCSSTopValue(); // get link's current css top property value
    linkCSSPositions = [linkCSSTop, linkCSSLeft]; // create array of link's current css position (top/left) values on active screen grid.
    outputHTMLContent += "<p>CSS position values: top: " +linkCSSPositions[0]+ ", left: " +linkCSSPositions[1]+ "</p>";
    return linkCSSPositions;
  }
  function getLinkCSSGridPositions(linkCSSPositions) { // convert link's css position (top/left) values to numbers that correlate to active screen grid tile
    let linkCSSTopX = stripCharacters(linkCSSPositions[0]); // strip off "px" from css top value string
    let linkCSSTopY = stripCharacters(linkCSSPositions[1]); // strip off "px" from css left value strong
    linkCSSGridPositions = [linkCSSTopX, linkCSSTopY]; // create array of integer values correlating to link's current position on screen
    outputHTMLContent += "<p>CSS position corrdinates: " +linkCSSGridPositions+ "</p>";
    return linkCSSGridPositions;
  }
  function convertLinkCSSPositionsToScreenGridValues(linkCSSGridPositions) { // convert link's css position values that have been stripped into integers, into screen grid coordinate values 
    //console.log(linkCSSGridPositions);
    let cssXCoordinate = linkCSSGridPositions[0]/gridAspectRatio; // convert top css position integer into screen grid array value by dividing by grid aspect ratio value
    let cssYCoordinate = linkCSSGridPositions[1]/gridAspectRatio; // convert left css position integer into screen grid array value by dividing by grid aspect ratio value
    linkScreenGridPositions = [cssXCoordinate, cssYCoordinate]; // create array of screen grid values consisting of converted css position integers
    outputHTMLContent += "<p>screen grid coordinates: " +linkScreenGridPositions+ "</p>";
    return linkScreenGridPositions;
  }
  function getDataAttribute(){ // get value of an element's data attribute;
    htmlDataAttribute = document.getElementById("ul-screen-grid"); // grab parent element of tiles
    dataAttributeValue = htmlDataAttribute.dataset.screenGridTile;  // grab parent element's data-screen-grid-tile attribute value, which consists of two, two character values combined
    outputHTMLContent += "<p>tile grid id: " +dataAttributeValue+ "</p>";
    return dataAttributeValue;
  }
  function getActiveColumnID() { // strip first two characters from string, column id is last two characters
  	activeColumnID = dataAttributeValue.substring(2,4); // pull second two digit value out of data-screen-grid-tile attribute value, correlating to active column of screen grid in hyrule's grid
  	outputHTMLContent += "<p>column id: " +activeColumnID+ "</p>";
  	return activeColumnID;
  }
  function getActiveRowID() { // strip off last two characters from string; first two denote current row on hyrule's grid
    activeRowID = dataAttributeValue.substring(0,2); // pull first two digit value out of data-screen-grid-tile attribute value, correlating to active row of screen grid in hyrule's grid
    outputHTMLContent += "<p>row id: " +activeRowID+ "</p>";
    return activeRowID;
  }
  function getTilesGrid(){ // get array of tile values making up tile grid of current active screen grid
  	tileGridID = hyruleGridTilePrepend + dataAttributeValue; // prepend text to data-screen-grid-tile attribute value, which correlates to grid dictionary definition for active screen grid tile.
    //console.log("get tile grid dictionary: " +hyruleGridTiles[tileGridID]);
    
    
    
    // MAKES MUCH MORE SENSE HERE TO HAVE EACH GRID IN INDIVIDUAL JS FILE, POINT TO THAT URL/LOAD VIA AJAX VS. PULLING IN INTO DICTIONARY AND LOOPING THROUGH IT!!!!!
    tileGridValues = hyruleGridTiles[tileGridID]; // array of 176 values correlating to tile definitions
    //console.log("length: " +tileGridValues.length);
    outputHTMLContent += "<p style=\"overflow:hidden\">tiles grid array: " +tileGridValues+ "</p>";
    return tileGridValues;
  }
  function parseTilesGrid() { // parse tilesGridValues array into arrays of tile grid rows making up the current active screen grid
    // active screen tile: 16 columns x 11 tiles in size; bottom row only shows top half of tiles
    // each screen tile is 256x176;512x352;
    // each tile making up screen tile is 16x16;32x32;64x64;128x128;256x256;512x512
    
    let tileGridRow01 = tileGridValues.splice(0,16);
    let tileGridRow02 = tileGridValues.splice(16,32);
    let tileGridRow03 = tileGridValues.splice(32,48);
    let tileGridRow04 = tileGridValues.splice(48,64);
    let tileGridRow05 = tileGridValues.splice(64,80);
    let tileGridRow06 = tileGridValues.splice(80,96);
    let tileGridRow07 = tileGridValues.splice(96,112);
    let tileGridRow08 = tileGridValues.splice(112,128);
    let tileGridRow09 = tileGridValues.splice(128,144);
    let tileGridRow10 = tileGridValues.splice(144,160);
    let tileGridRow11 = tileGridValues.splice(160,176);
    tileGridRows = [tileGridRow01, tileGridRow02, tileGridRow03, tileGridRow04, tileGridRow05, tileGridRow06, tileGridRow07, tileGridRow08, tileGridRow09, tileGridRow10, tileGridRow11];
    return tileGridRows;
  }  
  function getTilesGridMoveOptionsCoordinates(array) { // pulls in current tile grid array, spits out north, east, south, west options arrays in tileGridOptions array
    northOptions = getTilesGridMoveOptionsNorth(array);
    eastOptions = getTilesGridMoveOptionsEast(array);
    southOptions = getTilesGridMoveOptionsSouth(array);
    westOptions = getTilesGridMoveOptionsWest(array);
    tileGridOptions = [[northOptions], [eastOptions], [southOptions], [westOptions]];
    console.log("tile grid options: " +tileGridOptions);
    return tileGridOptions;
  }
  function getTilesGridMoveOptionsNorth(array) {
    northOptions = [array[0] - 1, array[1]];
    outputHTMLContent += "<p>north options value: " +northOptions+ "</p>";
    return northOptions;
  }
  function getTilesGridMoveOptionsEast(array) {
    eastOptions = [array[0], array[1] + 1];
    outputHTMLContent += "<p>east options value: " +eastOptions+ "</p>";
    return eastOptions;
  }
  function getTilesGridMoveOptionsSouth(array) {
    southOptions = [array[0] + 1, array[1]];
    outputHTMLContent += "<p>south options value: " +southOptions+ "</p>";
    return southOptions;
  }
  function getTilesGridMoveOptionsWest(array) {
    westOptions = [array[0], array[1] - 1];
    outputHTMLContent += "<p>west options value: " +westOptions+ "</p>";
    return westOptions;
  }

  
  function matchOptionToTile(array) {
    console.log("match option to tile array value: " +array);
  }
  
  // match tile definitions to movement options/offscreen options
  function getTilesDefinitions(array) {
  	  console.log(array);
  	  console.log(tileGridOptions);
  	  let northOptionsTiles = tileGridOptions[0];
    //let northOptionsTiles = matchOptionToTile(northOptions);
    console.log("north options tiles: " +northOptionsTiles);
  }
  
/**
The entire overworld is 4096 x 1344 pixels, 16 x 8 rooms, and 256 x 88 tiles in size.
Each room (a single screen) is 16 x 11 tiles in size (the bottom row only shows the top half of the tile).
It is 256 x 176 pixels in size (if you count the bottom half of the bottom row).
Each tile, including Link himself, is 16 x 16 pixels in size.
https://inventwithpython.com/blog/2012/12/10/8-bit-nes-legend-of-zelda-map-data/
**/

// all the functionality in link.js fires here
  function linkInit() {
      var link = { // link character object
        position: linksPosition(), // links position in css values on current active grid tile
        positionGrid: getLinkCSSGridPositions(linkCSSPositions), // links grid position converted from css position values
        positionScreenGrid: convertLinkCSSPositionsToScreenGridValues(linkCSSGridPositions),
        hyruleGrid: getDataAttribute(), // value of data attribute which correlates to position on hyrule's grid
        columnID: getActiveColumnID(), // second set of characters from data attribute, denoting column value of position on hyrule's grid
        rowID: getActiveRowID(), // first set of characters from data attribute of grid parent list (ul), denoting row value of position on hyrule's grid
        tileGrid: getTilesGrid(), // get array of tile grid values corresponding to tiles making up current active screen grid
        tileGridValues: parseTilesGrid(tileGridValues), // get arrays of tile grid rows that make up the current active screen grid
        //moveOptionsNorth: getTilesGridMoveOptionsNorth(linkScreenGridPositions),
        //moveOptionsEast: getTilesGridMoveOptionsEast(linkScreenGridPositions),
        //moveOptionsSouth: getTilesGridMoveOptionsSouth(linkScreenGridPositions),
        //moveOptionsWest: getTilesGridMoveOptionsWest(linkScreenGridPositions)
        moveOptions: getTilesGridMoveOptionsCoordinates(linkScreenGridPositions)
        //moveOptionsGridCoordinates: getTilesGridMoveOptionsCoordinates(northOptions, eastOptions, southOptions, westOptions),
        //moveOptionsTiles: getTilesDefinitions(tileGridOptions) // convert movement option grid values to tile definition values, to be used for discovering walkability
        // get offscreen grid options
        // match move and offscreen grid options with tile definitions?
        // eventlistener for arrow event keys correlating links movements
        // match up approved/walkable grid options with link's movement/offscreen options
        // permit movements?
        // 
        //tileGridMoveOptions: getTilesGridMoveOptions() // get values of tiles (north, east, south, west) that link can make a possible movement option
      };
      outputHTMLContent += "<p>Link Object:</p>";
      outputHTMLContent += "<p>link: " +link.hyruleGrid+ "</p>";

    //getDataAttributeVar;
    // dev
    consoleLogHTML(outputHTMLContent);  // keep this at bottom
  }
  linkInit();
}
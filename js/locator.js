// locator.js - find grid details/values of current screen, including character's/positions, etc..

// variable dump
var gridPositionAspect; // gridPositionAspect is aspect ratio (correct teriminology??) we are using for 8bit gloriness. defualt to 32 for dev...dynamic in production
var gridPositionTop; // link's position top value on the screen grid
var gridPositionLeft; // link's position left value on the screen grid
var link = document.getElementById("link"); // element containing link character
var linkCSSTop; // top property style value on link's absolutely positioned character element
var linkCSSLeft; // left property style value on link's absolutely positioned character element
var gridArray; // array of link's absolutely positioned css properties for converting into grid trackable numbers
var gridScreenArray; // array of grid values tracking link for across screen grid;




// strip "px" from absolute positioning keyword values, convert strings to integers
function stripStrings(cssTop, cssLeft){
	cssTop = parseInt(cssTop.replace("px", ""));
	cssLeft = parseInt(cssLeft.replace("px", ""));
	return [cssTop, cssLeft]
}


// locate link's position on the grid from integers of his absolutely positioned styles
function gridPosition(gridArray) {
	gridPositionAspect = 32;
	gridPositionTop = gridArray[0]/gridPositionAspect;
	//console.log("Grid Position Top: " + gridPositionTop);
	gridPositionLeft = gridArray[1]/gridPositionAspect;
	//console.log("Grid Position Left: " + gridPositionLeft);
	return [gridPositionTop, gridPositionLeft]
}

var screenGrid = [] // array of screen grid coordinates
var screenGridId; // id of element containing hyrule gameplay elements
var screenGridPlot; // data attribute value of element containing hyrule gameplay elements; value is where screen grid is currently on the hyrule grid
var newGridPlot; // grid coordinates obtained from parsing data attribute value



// get screen grid id/coordinates
function gridScreenPosition(){
	screenGridId = document.getElementById("screen-grid"); // get element by id
	screenGridPlot = screenGridId.dataset.screenGridTile; // get data attribute value
	//console.log("data attribute value: " + screenGridPlot);
	//newGridPlot = screenGridPlot.split("-"); // split data attribute value on "-"; first array value is top, second array value is left
	//console.log(newGridPlot[0] + ", " + newGridPlot[1]);
	return screenGridPlot
}


var locationCollisionStart = gridScreenPosition();
//console.log(locationCollisionStart[0]);
//var locationCollisionStartTop = locationCollisionStart[0];
//var locationCollisionStartLeft = locationCollisionStart[1];
// read grid positions into tile grid array
var gridHyrule = [
	{
		"0101": [1,2,3,4,4,5,6,7,7],
		"0102": [3,4,5,35,7,7,8,8,9]
	}

];
console.log(gridHyrule[0]["0101"]);

var arrayRow1 = ["3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "65", "65", "65", "65", "65", "65", "65", "65", "65", "65", "65", "65", "65", "65", "65", "65", "65", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "3d", "65"];
console.log("Number of values in a row in hyrule grid: " + arrayRow1.length);
var tester = "0101"
function gridPositionTiles(locationCollisionStart){
	//var gridHyruleTop = locationCollisionStartTop * 356;
	//var gridHyruleLeft = locationCollisionStartLeft * 512;
	//console.log(gridHyruleTop);
	//console.log(gridHyruleLeft);
	var xxx = gridHyrule[0][tester];
	console.log("array: " + xxx);
	console.log(arrayRow1);
}

gridPositionTiles(locationCollisionStart);

// get grid positions around given grid position
function gridPositionsAround(gridScreenArray) {
	console.log("Grid Positions Around grid: " + gridScreenArray[0] + ", " + gridScreenArray[1]);
}



// !!
// get these coordinates within the screen's grid, so you know where link is and most importantly what is around him!
// !!
// find link on the grid from his absolutely positioned style values
function locateLink() {
	linkCSSTop = window.getComputedStyle(link,null).getPropertyValue("top");
	linkCSSLeft = window.getComputedStyle(link,null).getPropertyValue("left");
	gridArray = stripStrings(linkCSSTop, linkCSSLeft); // get clean values
	gridScreenArray = gridPosition(gridArray); // get grid values
	console.log(gridScreenArray[0]);
	console.log(gridScreenArray[1]);
	gridPositionsAround(gridScreenArray);
}
// what to do on pageload....and maybe game start?????
function onStart() {
	//whichKey();
	locateLink();
}





onStart();
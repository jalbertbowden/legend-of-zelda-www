








// for dev only! visualizing what i'm doing
var characterLocationInGrid;
var liID; // id of list-item tile element that link is currently occupying in active screen grid
var gridListItems; // array of list-item elements making up currently active screen grid



function correlateGridOptionLocationsListItems(gridLocationCoords) {
	console.log("new function: " + gridLocationCoords);
	//gridLocationCoords = [4,11];
	var gridListItems = document.querySelectorAll("#screen-grid li");
	// first coordinate * 16 (length of row) + 2nd coordinate (depth of final row)
	var liID = (gridLocationCoords[0] * 16) + gridLocationCoords[1];
	console.log("List item id: " + liID + ", list item: " + gridListItems[liID]);
	characterLocationInGrid = gridListItems[liID];
	characterLocationInGrid.className += " highlight-less";
}
function correlateGridOptionLocations(gridLocationCoords){
	gridLocationOptionNorthX = gridLocationCoords[0] - 1;
	gridLocationOptionNorthY = gridLocationCoords[1];
	gridLocationOptionsNorth = [gridLocationOptionNorthX, gridLocationOptionNorthY];
	gridLocationOptionSouthX = gridLocationCoords[0] + 1;
	gridLocationOptionSouthY = gridLocationCoords[1];
	gridLocationOptionsSouth = [gridLocationOptionSouthX, gridLocationOptionSouthY];
	gridLocationOptionEastX = gridLocationCoords[0];
	gridLocationOptionEastY = gridLocationCoords[1] + 1;
	gridLocationOptionsEast = [gridLocationOptionEastX, gridLocationOptionEastY];
	gridLocationOptionWestX = gridLocationCoords[0];
	gridLocationOptionWestY = gridLocationCoords[1] - 1;
	gridLocationOptionsWest = [gridLocationOptionWestX, gridLocationOptionWestY];
	optionNorthCoordinates = correlateGridOptionLocationsListItems(gridLocationOptionsNorth);
	optionSouthCoordinates = correlateGridOptionLocationsListItems(gridLocationOptionsSouth);
	optionEastCoordinates = correlateGridOptionLocationsListItems(gridLocationOptionsEast);
	optionWestCoordinates = correlateGridOptionLocationsListItems(gridLocationOptionsWest);
	gridOptions = [northOption, southOption, eastOption, westOption];
	return gridOptions
}
function correlateGridLocationsX(gridLocationCoords) {
	gridLocationCoordsX = parseGridVar[gridLocationCoords[0]];
	gridLocationCoordsY = gridLocationCoordsX[gridLocationCoords[1]];
	gridLocationDefinition = gridDictionary.gridTiles[gridLocationCoordsY];
	console.log("Grid location Definition: " + gridLocationDefinition);
	return gridLocationDefinition
}
function highlightGrid(){
	gridLocationCoords = gridPosition(gridArray);
	gridListItems = document.querySelectorAll("#screen-grid li");
	liID = (gridLocationCoords[0] * 16) + gridLocationCoords[1]; // first coordinate * 16 (length of row) + 2nd coordinate (depth of final row)
	characterLocationInGrid = gridListItems[liID];
	characterLocationInGrid.className += " highlight"; // add class of highlight to currently occupied list-item element in active screen grid
	gridLocationDefinition = correlateGridLocationsX(gridLocationCoords); // get character position values
	gridLocationOptionDefinitions = correlateGridOptionLocations(gridLocationCoords); // get north, south, east, and west possible movement tile options
}
highlightGrid();
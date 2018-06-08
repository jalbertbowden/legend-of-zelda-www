// keyboard-events.js
// left arrow 	37
// up arrow 	38
// right arrow 	39
// down arrow 	40

// event key, event code, event (which)
// ArrowRight, ArrowRight, 39
// ArrowLeft, ArrowLwft, 37
// ArrowDown, ArrowDown, 40
// ArrowUp, ArrowUp, 38


// on key press, get which key was pressed
// see if correlating tile option is an option
// if so, make movement of character to tile option
// if not, do nothing

var keysArrows = [37, 38, 39, 40];

function whichKey() {
	document.addEventListener("keydown", function(event) {
		console.log("Event Key: " + event.key);
		console.log("Event Code: " + event.code);
		console.log("Event (which): " + event.which); // print key in keydown event
		return event.which;
	})
};

// https://eloquentjavascript.net/15_event.html
window.addEventListener("keydown", event => {
	console.log("eventkey: " + event.key + ", event.which: " + event.which);
		
    if (event.key == "ArrowUp") {
      document.body.style.background = "violet";
    }
  });
  window.addEventListener("keyup", event => {
    if (event.key == "ArrowUp") {
      document.body.style.background = "";
    }
  });


// http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/index.html
/**
window.addEventListener('keydown', function(event) {
	switch (event.keyCode) {
	case 37: // left
		Game.player.moveLeft();
	break;
	
	case 38: // up
		Game.player.moveUp();
	break;
	
	case 39: // right
		Game.player.moveRight();
	break;
	
	case 40: // down
		Game.player.moveDown();
	break;
	}
}, false);
**/
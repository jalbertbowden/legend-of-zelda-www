
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










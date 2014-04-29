/******************
******* enum ******
*******************/
// game status
var GAMEINIT = 0;
var GAMESTART = 1;
var GAMEUPDATE = 2;
var GAMESTOP = 3;
var GAMEEXIT = 4;
// game refresh rate
var FPS = 60;



/***********************
******* game loop ******
************************/
// initial status
var status = GAMEINIT;
setInterval(function(){
	switch(parseInt(status)){
		case GAMEINIT:
			// init game
			console.log("Game init");
			Game.init();
			status = GAMESTART;
		break;
		case GAMESTART:
			// start game
			console.log("Game start");
			status = GAMEUPDATE;
		break;
		case GAMEUPDATE:
			// run game
			console.log("Game running");
			Game.run();
		break;
		case GAMESTOP:
			//stop game
			console.log("Game stop");
			Game.stop();
		break;
		default:
			console.log("default");
		break;
	}
},1000/FPS);

/****** *********** ******/
/****** game object ******/
/****** *********** ******/

var Game = {
// game draw, logic, event...
	init: function(){
	// init game
		// create tile
		for (var i = 0; i < 9 ; i++) {
			tiles[i] = new tile(i);
		};
		// add event listener
		window.addEventListener('keydown', this.keyEvent, true);
		// new game, generate puzzle randomly
		thisPuzzle = newPuzzle();
		curPuzzle = thisPuzzle.concat();
	},
	run: function(){
	// run game
		Canvas.drawCanvas();
		this.logic();
	},
	logic: function(){
	// game main logic
	// idastar?
		// change tile's position depending on current status
		for (var i = 0; i < 9 ; i++) {
			var row = Math.floor( i / 3 ) ;
			var col = i % 3;
			tiles[curPuzzle[i]].x = col * tiles[curPuzzle[i]].width;
			tiles[curPuzzle[i]].y = row * tiles[curPuzzle[i]].width;
		};

	},
	keyEvent: function(event){
	// key event
		var dir = "";
		lastMoveDir = "";
		console.log(event.keyCode);
		switch ( event.keyCode ){
			case 65:
			// left
				dir = "left";
				var moves = generateMoves(curPuzzle);
				for ( m in moves ){
					m = moves[m];
					if ( m[1] == dir ){
						console.log(dir);
						makeMove( curPuzzle, m );
						showPic();
						break;
					}
				}
			break;
			case 87:
			// up
				dir = "up";
				var moves = generateMoves(curPuzzle);
				for ( m in moves ){
					m = moves[m];
					if ( m[1] == dir ){
						console.log(dir);
						makeMove( curPuzzle, m );
						showPic();
						break;
					}
				}
			break;
			case 68:
			// right
				dir = "right";
				var moves = generateMoves(curPuzzle);
				for ( m in moves ){
					m = moves[m];
					if ( m[1] == dir ){
						console.log(dir);
						makeMove( curPuzzle, m );
						showPic();
						break;
					}
				}
			break;
			case 83:
			// down
				dir = "down";
				var moves = generateMoves(curPuzzle);
				for ( m in moves ){
					m = moves[m];
					if ( m[1] == dir ){
						console.log(dir);
						makeMove( curPuzzle, m );
						showPic();
						break;
					}
				}
			break;
		}
	},
	stop: function(){
	// stop game
		
	}

};

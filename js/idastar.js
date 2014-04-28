/*
puzzle AI:
1. IDA*
2. Manhattan

Integer <- IterativeDeepening( status )
　　　Threshold <- ManhattanEvaluate( status )
　　　Solution <- NO
　　　While solution == NO do
　　　    If Search( status, 0, threshold ) == YES then
　　　        Break
        Threshold <- IncrementThreshold()
　　　Endwhile
　　　Output <- “Solution found at depth” threshold
　　　Return threshold
end

Boolean <- Search( status, g, threshold )
　　　H <- ManhattanEvaluate( status )
　　　If h == 0 then
　　　    Return TRUE
　　　If g+h > threshold then
　　　    Return FALSE
　　　Movelist <- GenerateMoves( status )
　　　Foreach move on movelist do
　　　    MakeMove( status, move )
　　　    If Search( status, g+1, threshold ) == TRUE then
　　　        Return TRUE
　　　    undoMove( status, move )
　　　Endfor
　　　Return FALSE
end



test status:
[1,2,0,3,6,8,7,5,4]
[1,8,4,5,0,7,3,2,6]

*/




// current status, default puzzle
var curPuzzle = [1,2,0,3,6,8,7,5,4];
// current round's status
var thisPuzzle = curPuzzle.concat();

// clear after solve!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// last move's direction
var lastMoveDir = "";
// last move
var lastMove = [];

function iterativeDeepening () {
/*
iterative deepening: run search function with specific depth(threshold) iteratively.
status: puzzle's status, [0,1,2,3,4,5,6,7,8]
*/
	var status = [];
	status = curPuzzle.concat();
	thisPuzzle = curPuzzle.concat();
	lastMoveDir = "";
	lastMove = [];
	console.log("status: " + curPuzzle);
	
	var threshold = manhattan( status );
　　var solution = false;
　　while ( !solution ) {
		// if find solution, break while
		if ( solution = search( status, 0, threshold ) ) {
			break;
		}
		// deepen search depth
        threshold = incrementThreshold( threshold );
	}
	
	console.log("solution: " + lastMove);
	showSolution();
	// show find solution
	return true;

}

function search ( status, g, threshold ) {
	var h = manhattan( status );
	if ( h == 0 ) {
		return true;
	}
　　　    
　　if ( g + h > threshold ) {
		return false;
	}

　　var movelist = generateMoves( status );

	for( move in movelist ) {
		move = movelist[move];
		status = makeMove( status, move );
		lastMove.push(move);
		lastMoveDir = move[1];
		if ( search( status, g + 1, threshold ) == true){
			return true;
		}
		status = undoMove( status, lastMove[lastMove.length-1] );
		lastMove.pop();
	}

	return false;
}

function makeMove ( status, move ) {
	// moving node's direction and array index
	var moveDir = move[1];
	var moveNode = move[0];
	// node's array index after move
	var node = [];
	switch ( moveDir ) {
		case "up":
			node[0] = moveNode[0] - 1;
			node[1] = moveNode[1];
		break;
		case "left":
			node[1] = moveNode[1] - 1;
			node[0] = moveNode[0];
		break;
		case "down":
			node[0] = moveNode[0] + 1;
			node[1] = moveNode[1];
		break;
		case "right":
			node[1] = moveNode[1] + 1;
			node[0] = moveNode[0];
		break;
	}
	// change status
	status[ node[0]*3 + node[1] ] = status[ moveNode[0]*3 + moveNode[1] ];
	status[ moveNode[0]*3 + moveNode[1] ] = 0;
	return status;
}

function undoMove ( status, move ) {
	// moving node's direction and array index
	var moveDir = move[1];
	var moveNode = move[0];
	// node's array index after move
	var node = [];
	switch ( moveDir ) {
		case "up":
			node[0] = moveNode[0] - 1;
			node[1] = moveNode[1];
		break;
		case "left":
			node[1] = moveNode[1] - 1;
			node[0] = moveNode[0];
		break;
		case "down":
			node[0] = moveNode[0] + 1;
			node[1] = moveNode[1];
		break;
		case "right":
			node[1] = moveNode[1] + 1;
			node[0] = moveNode[0];
		break;
	}
	status[ moveNode[0]*3 + moveNode[1] ] = status[ node[0]*3 + node[1] ];
	status[ node[0]*3 + node[1] ] = 0;
	return status;
}

function generateMoves ( status ) {
// generate moves, clockwise
// movelisht: [([1,1],up),([1,1],up)]
// move: ([1,1],up)
// move: ([1,1],right)
// move: ([1,1],down)
// move: ([1,1],left)

　　// movelist
	var movelist = [];
	// empty tile's neighbours' position
	var neighbours = [];
	// search empty tile
	for ( s in status ) {
		if ( status[s] == 0 ){
			// get empty tile's position
			var sPosition = [ Math.floor(s/3), (s%3) ];
			// get empty tile's neighbours' position
			// up
			neighbours.push([ sPosition[0] - 1, sPosition[1] ]);
			// right
			neighbours.push([ sPosition[0], sPosition[1] + 1 ]);
			// down
			neighbours.push([ sPosition[0] + 1, sPosition[1] ]);
			// left
			neighbours.push([ sPosition[0], sPosition[1] - 1 ]);
			break;
		}
	}
	// check if neighbour is available ==> if array's index is not out of bound
	for(n in neighbours){
		n = parseInt(n);
		if( ( neighbours[n][0] >= 0 ) && ( neighbours[n][0] < 3 ) && ( neighbours[n][1] >= 0 ) && ( neighbours[n][1] < 3 ) ){
			// add neighbour's index and direction to movelist
			switch(n){
				case 0:
					if ( lastMoveDir != "up" ){
						movelist.push([neighbours[n], "down"]);
					}
				break;
				case 1:
					if ( lastMoveDir != "right" ){
					movelist.push([neighbours[n], "left"]);
					}
				break;
				case 2:
					if ( lastMoveDir != "down" ){
					movelist.push([neighbours[n], "up"]);
					}
				break;
				case 3:
					if ( lastMoveDir != "left" ){
					movelist.push([neighbours[n], "right"]);
					}
				break;
			}
		}
	}

	return movelist;
}

function incrementThreshold ( threshold ) {
// deepen search depth
	//?
	return threshold + 2;
}

function manhattan ( status ){
/* 	Manhattan distance
	e.g.
				↓ end point
	__________
	|__|__|__|		|←L(y)
	|__|__|__|		|
	|__|__|__|		|
	|__|__|__|		|
	↑ begin point
	 _________ 		←L(x)

	distance = L(x)+L(y);
	Manhattan distance is sum of horizontal distance and vertical distance.
	e.g. D = 3 + 4;

	status: puzzle's status, [0,1,2,3,4,5,6,7,8]
	manhattanCost: total manhattan distance in puzzle. PS: 0 is not included
*/

	// total manhattan distance in puzzle
	var manhattanCost = 0;
	// right puzzle's order
	var initPuzzle = [0,1,2,3,4,5,6,7,8];
	// current puzzle's order
	var currentPuzzle = status;

	// calculate manhattanCost
	for ( i in initPuzzle){
		for ( j in currentPuzzle){
			if ( ( initPuzzle[i] == currentPuzzle[j] ) && ( initPuzzle[i]) != 0 ){
				var rowCost = Math.abs( Math.floor(i/3) - Math.floor(j/3) );
				var columnCost = Math.abs( Math.floor(i%3) - Math.floor(j%3) );
				manhattanCost += rowCost + columnCost;
			}
		}
	}

	return manhattanCost;
	
}


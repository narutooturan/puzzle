/*
puzzle AI:
1. IDA*
2. Manhattan

Integer <- IterativeDeepening( state )
　　　Threshold <- ManhattanEvaluate( state )
　　　Solution <- NO
　　　While solution == NO do
　　　    If Search( state, 0, threshold ) == YES then
　　　        Break
        Threshold <- IncrementThreshold()
　　　Endwhile
　　　Output <- “Solution found at depth” threshold
　　　Return threshold
end

Boolean <- Search( state, g, threshold )
　　　H <- ManhattanEvaluate( state )
　　　If h == 0 then
　　　    Return TRUE
　　　If g+h > threshold then
　　　    Return FALSE
　　　Movelist <- GenerateMoves( state )
　　　Foreach move on movelist do
　　　    MakeMove( state, move )
　　　    If Search( state, g+1, threshold ) == TRUE then
　　　        Return TRUE
　　　    undoMove( state, move )
　　　Endfor
　　　Return FALSE
end



test state:
[1,2,0,3,6,8,7,5,4]
[1,8,4,5,0,7,3,2,6]

*/


// current puzzle, default puzzle
var curPuzzle = [1,2,0,3,6,8,7,5,4];

// clear after solve!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// last move's direction
var lastMoveDir = "";
// last move
var lastMove = [];

function iterativeDeepening () {
/*
iterative deepening: run search function with specific depth(threshold) iteratively.
state: puzzle's state, [0,1,2,3,4,5,6,7,8]
*/
	var state = [];
	state = curPuzzle.concat();
	lastMoveDir = "";
	lastMove = [];
	console.log("state: " + curPuzzle);
	
	var threshold = manhattan( state );
　　var solution = false;
　　while ( !solution ) {
		// if find solution, break while
		if ( solution = search( state, 0, threshold ) ) {
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

function search ( state, g, threshold ) {
	var h = manhattan( state );
	if ( h == 0 ) {
		return true;
	}
　　　    
　　if ( g + h > threshold ) {
		return false;
	}

　　var movelist = generateMoves( state );

	for( move in movelist ) {
		move = movelist[move];
		state = makeMove( state, move );
		lastMove.push(move);
		lastMoveDir = move[1];
		if ( search( state, g + 1, threshold ) == true){
			return true;
		}
		state = undoMove( state, lastMove[lastMove.length-1] );
		lastMove.pop();
	}

	return false;
}

function makeMove ( state, move ) {
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
	// change state
	state[ node[0]*3 + node[1] ] = state[ moveNode[0]*3 + moveNode[1] ];
	state[ moveNode[0]*3 + moveNode[1] ] = 0;
	return state;
}

function undoMove ( state, move ) {
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
	state[ moveNode[0]*3 + moveNode[1] ] = state[ node[0]*3 + node[1] ];
	state[ node[0]*3 + node[1] ] = 0;
	return state;
}

function generateMoves ( state ) {
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
	for ( s in state ) {
		if ( state[s] == 0 ){
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

function manhattan ( state ){
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

	state: puzzle's state, [0,1,2,3,4,5,6,7,8]
	manhattanCost: total manhattan distance in puzzle. PS: 0 is not included
*/

	// total manhattan distance in puzzle
	var manhattanCost = 0;
	// right puzzle's order
	var initPuzzle = [0,1,2,3,4,5,6,7,8];
	// current puzzle's order
	var currentPuzzle = state;

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

function newPuzzle() {
// generate puzzle state randomly
	// state array
	var puzzles = [
		[ 1, 2, 0, 3, 6, 8, 7, 5, 4 ],
		[ 1, 8, 4, 5, 0, 7, 3, 2, 6 ],
		[ 8, 4, 6, 2, 0, 7, 3, 5, 1 ],
		[ 6, 0, 2, 5, 4, 8, 1, 3, 7 ],
		[ 3, 6, 5, 4, 8, 2, 7, 0, 1 ],
		[ 1, 8, 6, 3, 4, 2, 5, 0, 7 ],
		[ 3, 1, 5, 8, 7, 6, 4, 2, 0 ],
		[ 0, 2, 8, 4, 3, 1, 7, 5, 6 ],
		[ 4, 0, 5, 2, 7, 3, 6, 1, 8 ],
		[ 1, 8, 7, 5, 0, 2, 3, 4, 6 ],
		[ 1, 8, 4, 6, 5, 0, 3, 2, 7 ],
		[ 8, 1, 6, 7, 0, 4, 5, 3, 2 ],
		[ 7, 1, 2, 8, 6, 4, 0, 3, 5 ],
		[ 8, 6, 7, 4, 2, 3, 0, 1, 5 ],
		[ 6, 2, 8, 3, 0, 1, 4, 5, 7 ],
		[ 3, 4, 5, 1, 0, 7, 2, 6, 8 ],
		[ 5, 6, 8, 3, 4, 0, 7, 2, 1 ],
		[ 2, 5, 1, 3, 6, 7, 4, 8, 0 ],
		[ 2, 6, 4, 7, 5, 0, 1, 3, 8 ],
		[ 8, 6, 1, 3, 0, 4, 5, 7, 2 ],
		[ 4, 1, 8, 6, 3, 0, 5, 7, 2 ],
		[ 4, 5, 7, 1, 8, 3, 2, 0, 6 ],
		[ 4, 2, 0, 3, 7, 1, 6, 8, 5 ],
		[ 4, 3, 0, 2, 6, 8, 7, 5, 1 ],
		[ 4, 0, 5, 2, 3, 7, 6, 8, 1 ],
		[ 4, 1, 8, 2, 6, 3, 0, 5, 7 ],
		[ 4, 0, 6, 7, 3, 5, 1, 8, 2 ],
		[ 1, 2, 8, 4, 5, 0, 3, 7, 6 ],
		[ 6, 4, 3, 2, 5, 1, 7, 8, 0 ],
		[ 8, 5, 2, 7, 6, 3, 1, 4, 0 ],
		[ 6, 0, 1, 7, 2, 5, 8, 4, 3 ],
		[ 2, 0, 7, 3, 6, 1, 8, 4, 5 ],
		[ 1, 0, 4, 8, 7, 2, 6, 5, 3 ],
		[ 5, 1, 3, 0, 4, 7, 8, 2, 6 ],
		[ 2, 8, 5, 4, 0, 3, 1, 7, 6 ],
		[ 5, 2, 4, 7, 0, 1, 8, 3, 6 ],
		[ 4, 2, 7, 8, 6, 3, 0, 1, 5 ],
		[ 5, 4, 2, 6, 8, 0, 1, 7, 3 ],
		[ 1, 7, 3, 4, 5, 2, 6, 0, 8 ],
		[ 3, 0, 1, 5, 6, 2, 7, 8, 4 ],
		[ 0, 3, 5, 6, 1, 4, 8, 7, 2 ],
		[ 0, 1, 7, 8, 3, 6, 2, 4, 5 ],
		[ 6, 7, 8, 5, 1, 3, 2, 4, 0 ],
		[ 3, 7, 4, 1, 2, 0, 8, 6, 5 ],
		[ 1, 0, 8, 4, 3, 2, 5, 7, 6 ],
		[ 2, 3, 5, 8, 0, 4, 6, 1, 7 ],
		[ 0, 3, 7, 1, 4, 2, 5, 6, 8 ],
		[ 1, 3, 5, 6, 2, 7, 4, 0, 8 ],
		[ 3, 6, 8, 2, 5, 1, 0, 4, 7 ],
		[ 2, 4, 5, 3, 0, 1, 6, 7, 8 ],
		[ 6, 3, 4, 8, 7, 1, 2, 0, 5 ],
		[ 6, 0, 2, 3, 4, 1, 7, 8, 5 ],
		[ 8, 4, 1, 2, 7, 6, 0, 5, 3 ],
		[ 0, 3, 6, 8, 2, 4, 1, 7, 5 ],
		[ 1, 2, 5, 8, 7, 3, 6, 0, 4 ],
		[ 6, 1, 8, 3, 0, 2, 4, 7, 5 ],
		[ 5, 1, 6, 7, 0, 3, 8, 4, 2 ],
		[ 2, 0, 6, 1, 3, 4, 5, 8, 7 ],
		[ 6, 3, 8, 5, 7, 1, 0, 2, 4 ],
		[ 5, 6, 1, 7, 3, 2, 4, 0, 8 ],
		[ 2, 7, 6, 5, 0, 8, 1, 3, 4 ],
		[ 7, 1, 2, 6, 4, 3, 0, 5, 8 ],
		[ 2, 8, 5, 3, 1, 0, 7, 6, 4 ],
		[ 4, 8, 5, 0, 1, 7, 3, 2, 6 ],
		[ 0, 1, 2, 3, 5, 8, 6, 7, 4 ],
		[ 0, 1, 6, 7, 4, 2, 3, 5, 8 ],
		[ 4, 3, 7, 1, 0, 2, 6, 5, 8 ],
		[ 6, 4, 1, 8, 0, 3, 5, 2, 7 ],
		[ 8, 3, 1, 2, 0, 4, 6, 5, 7 ],
		[ 2, 0, 5, 4, 7, 1, 3, 8, 6 ],
		[ 8, 0, 2, 3, 7, 5, 1, 6, 4 ],
		[ 4, 2, 1, 3, 8, 5, 7, 0, 6 ],
		[ 6, 8, 5, 0, 4, 7, 2, 1, 3 ],
		[ 2, 3, 0, 8, 7, 5, 6, 4, 1 ],
		[ 4, 7, 5, 3, 1, 8, 0, 6, 2 ],
		[ 4, 6, 1, 0, 3, 8, 7, 5, 2 ],
		[ 3, 1, 2, 8, 0, 4, 7, 5, 6 ],
		[ 3, 7, 6, 4, 0, 2, 8, 1, 5 ],
		[ 6, 3, 2, 0, 7, 1, 5, 4, 8 ],
		[ 1, 8, 4, 7, 0, 3, 2, 6, 5 ],
		[ 5, 3, 8, 0, 7, 2, 1, 4, 6 ],
		[ 4, 3, 6, 7, 5, 0, 8, 2, 1 ],
		[ 3, 1, 5, 7, 6, 0, 4, 2, 8 ],
		[ 1, 5, 4, 7, 2, 0, 8, 3, 6 ],
		[ 6, 3, 4, 8, 7, 1, 2, 5, 0 ],
		[ 8, 6, 4, 1, 2, 7, 5, 3, 0 ],
		[ 4, 2, 7, 0, 8, 5, 3, 6, 1 ],
		[ 4, 7, 6, 2, 5, 3, 0, 1, 8 ],
		[ 5, 7, 6, 2, 1, 0, 4, 8, 3 ],
		[ 4, 3, 2, 5, 0, 7, 1, 8, 6 ],
		[ 4, 7, 6, 0, 3, 1, 8, 2, 5 ],
		[ 2, 3, 0, 7, 8, 6, 5, 4, 1 ],
		[ 7, 0, 4, 8, 3, 5, 1, 2, 6 ],
		[ 2, 1, 6, 4, 0, 5, 3, 7, 8 ],
		[ 1, 4, 7, 0, 2, 5, 3, 8, 6 ],
		[ 2, 0, 3, 6, 8, 5, 1, 7, 4 ],
		[ 2, 3, 5, 6, 8, 1, 0, 7, 4 ],
		[ 0, 2, 3, 5, 7, 4, 8, 1, 6 ],
		[ 3, 6, 7, 4, 5, 8, 0, 1, 2 ],
		[ 8, 0, 5, 6, 7, 2, 3, 4, 1 ],
		[ 8, 4, 2, 0, 1, 5, 3, 6, 7 ],
		[ 3, 8, 7, 0, 1, 5, 4, 2, 6 ],
		[ 8, 4, 7, 0, 2, 3, 6, 5, 1 ],
		[ 8, 7, 3, 5, 1, 0, 6, 2, 4 ],
		[ 6, 5, 0, 1, 3, 2, 4, 7, 8 ],
		[ 1, 4, 8, 3, 2, 5, 6, 7, 0 ],
		[ 7, 6, 5, 0, 2, 8, 1, 4, 3 ],
		[ 7, 4, 3, 6, 1, 2, 5, 8, 0 ],
		[ 3, 0, 6, 7, 8, 4, 5, 1, 2 ],
		[ 6, 2, 1, 4, 0, 8, 5, 7, 3 ],
		[ 8, 6, 0, 3, 4, 2, 1, 7, 5 ],
		[ 6, 2, 3, 8, 1, 4, 7, 0, 5 ],
		[ 5, 0, 4, 3, 2, 1, 8, 6, 7 ],
		[ 3, 7, 8, 0, 2, 4, 5, 6, 1 ],
		[ 0, 4, 1, 7, 2, 6, 8, 5, 3 ],
		[ 0, 8, 5, 2, 1, 4, 3, 7, 6 ],
		[ 3, 7, 6, 8, 1, 2, 5, 4, 0 ],
		[ 2, 5, 6, 3, 1, 0, 8, 4, 7 ],
		[ 0, 4, 6, 2, 8, 7, 3, 1, 5 ],
		[ 8, 6, 2, 1, 0, 5, 3, 7, 4 ],
		[ 2, 0, 1, 3, 8, 7, 6, 4, 5 ],
		[ 7, 8, 1, 6, 3, 0, 5, 4, 2 ],
		[ 4, 7, 6, 8, 0, 3, 5, 1, 2 ],
		[ 8, 5, 7, 3, 0, 4, 2, 6, 1 ],
		[ 6, 3, 2, 0, 5, 8, 7, 4, 1 ],
		[ 2, 3, 6, 8, 4, 1, 0, 5, 7 ],
		[ 7, 2, 8, 4, 6, 5, 3, 1, 0 ],
		[ 6, 5, 4, 8, 7, 1, 3, 0, 2 ],
		[ 2, 0, 1, 6, 8, 5, 3, 4, 7 ],
		[ 0, 8, 1, 3, 2, 6, 7, 4, 5 ],
		[ 3, 1, 7, 8, 0, 2, 6, 4, 5 ],
		[ 6, 0, 8, 3, 1, 2, 5, 4, 7 ],
		[ 6, 4, 1, 5, 8, 0, 2, 7, 3 ],
		[ 0, 6, 7, 2, 5, 4, 1, 3, 8 ],
		[ 1, 0, 4, 2, 3, 7, 6, 8, 5 ],
		[ 2, 3, 1, 4, 6, 8, 7, 5, 0 ],
		[ 8, 0, 4, 1, 6, 5, 3, 2, 7 ],
		[ 8, 7, 4, 3, 6, 5, 2, 0, 1 ],
		[ 0, 2, 8, 6, 4, 5, 7, 3, 1 ],
		[ 0, 3, 8, 7, 2, 6, 4, 1, 5 ],
		[ 7, 2, 1, 0, 3, 6, 5, 4, 8 ],
		[ 7, 2, 6, 0, 4, 3, 5, 8, 1 ],
		[ 0, 6, 2, 5, 4, 3, 7, 8, 1 ],
		[ 8, 1, 2, 3, 7, 6, 4, 0, 5 ],
		[ 0, 4, 7, 6, 3, 8, 1, 5, 2 ],
		[ 4, 7, 0, 3, 8, 2, 5, 1, 6 ],
		[ 2, 5, 7, 0, 6, 4, 8, 3, 1 ],
		[ 7, 2, 6, 4, 8, 5, 1, 0, 3 ],
		[ 6, 1, 8, 7, 2, 0, 4, 5, 3 ],
		[ 0, 6, 5, 3, 8, 2, 4, 7, 1 ],
		[ 3, 6, 2, 1, 4, 8, 7, 0, 5 ],
		[ 0, 8, 6, 2, 4, 7, 1, 3, 5 ],
		[ 0, 7, 1, 8, 6, 4, 3, 2, 5 ],
		[ 3, 2, 8, 5, 0, 7, 6, 4, 1 ],
		[ 7, 1, 2, 0, 5, 8, 3, 6, 4 ],
		[ 0, 7, 8, 3, 4, 2, 5, 1, 6 ],
		[ 7, 3, 6, 1, 8, 2, 0, 5, 4 ],
		[ 1, 4, 2, 3, 0, 5, 8, 6, 7 ],
		[ 1, 2, 3, 4, 8, 6, 5, 0, 7 ],
		[ 2, 6, 0, 8, 1, 5, 3, 4, 7 ],
		[ 3, 8, 1, 7, 2, 4, 0, 5, 6 ],
		[ 0, 5, 1, 4, 3, 2, 7, 6, 8 ],
		[ 2, 0, 4, 3, 6, 5, 1, 8, 7 ],
		[ 8, 3, 2, 7, 0, 4, 1, 6, 5 ],
		[ 4, 5, 7, 6, 1, 2, 8, 3, 0 ],
		[ 6, 3, 1, 0, 4, 2, 7, 8, 5 ],
		[ 0, 6, 8, 2, 1, 4, 7, 5, 3 ],
		[ 0, 5, 8, 6, 3, 7, 1, 4, 2 ],
		[ 3, 4, 8, 6, 5, 7, 1, 0, 2 ],
		[ 3, 0, 1, 4, 2, 6, 8, 5, 7 ],
		[ 5, 6, 1, 2, 4, 7, 3, 0, 8 ],
		[ 4, 0, 8, 5, 2, 3, 7, 1, 6 ],
		[ 4, 2, 0, 8, 7, 6, 1, 3, 5 ],
		[ 5, 1, 2, 7, 8, 3, 0, 4, 6 ],
		[ 8, 0, 3, 4, 1, 5, 7, 2, 6 ],
		[ 7, 0, 4, 6, 8, 3, 1, 5, 2 ],
		[ 8, 7, 3, 0, 4, 5, 6, 2, 1 ],
		[ 6, 7, 0, 2, 3, 1, 4, 5, 8 ],
		[ 2, 7, 5, 0, 8, 3, 1, 4, 6 ],
		[ 6, 2, 7, 3, 8, 1, 0, 4, 5 ],
		[ 7, 1, 3, 6, 0, 5, 4, 8, 2 ],
		[ 5, 6, 4, 0, 8, 2, 3, 7, 1 ],
		[ 5, 2, 7, 3, 0, 6, 4, 8, 1 ],
		[ 0, 5, 6, 8, 3, 1, 7, 4, 2 ],
		[ 0, 1, 4, 8, 5, 6, 7, 3, 2 ],
		[ 1, 5, 6, 3, 2, 8, 0, 7, 4 ],
		[ 4, 0, 2, 3, 8, 5, 6, 7, 1 ],
		[ 2, 6, 3, 7, 4, 5, 0, 8, 1 ],
		[ 0, 7, 8, 2, 3, 4, 6, 5, 1 ],
		[ 2, 8, 3, 0, 1, 6, 7, 4, 5 ],
		[ 8, 3, 4, 1, 0, 5, 7, 2, 6 ],
		[ 4, 1, 6, 7, 2, 3, 8, 5, 0 ],
		[ 1, 5, 4, 6, 2, 3, 0, 8, 7 ],
		[ 7, 3, 2, 5, 6, 8, 4, 1, 0 ],
		[ 4, 3, 1, 6, 5, 8, 0, 2, 7 ],
		[ 5, 7, 2, 8, 3, 4, 1, 6, 0 ],
		[ 8, 5, 4, 7, 3, 1, 0, 2, 6 ],
		[ 2, 0, 6, 5, 1, 4, 3, 8, 7 ],
		[ 3, 6, 8, 0, 1, 2, 7, 5, 4 ],
		[ 5, 0, 2, 6, 1, 3, 4, 7, 8 ],
		[ 8, 3, 4, 6, 2, 5, 1, 0, 7 ],
		[ 6, 1, 5, 0, 8, 2, 7, 3, 4 ] 
		];
	
	var puzzle = [];

	puzzle = puzzles[ Math.floor( Math.random() * puzzles.length ) ];
	
	console.log("current puzzle: " + puzzle);
	curPuzzle = puzzle;
	// show state in UI
	showPuzzle();
}
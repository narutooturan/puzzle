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

*/

function iterativeDeepening ( state ) {
/*
iterative deepening: run search function with specific depth(threshold) iteratively.
state: puzzle's state, [0,1,2,3,4,5,6,7,8]
*/

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
	// show find solution
　　console.log("Solution found at depth: " + threshold);
	return true;
}

function search ( state, g, threshold ) {
	h = manhattan( state );
　　if ( h == 0 ) {
		return true;
	}
　　　    
　　if ( g + h > threshold ) {
		return false;
	}

　　movelist = generateMoves( state );
　　/*
	Foreach move on movelist do
　　　   MakeMove( state, move )
　　　   If Search( state, g+1, threshold ) == TRUE then
　　　       Return TRUE
　　　   undoMove( state, move )
　　Endfor
	*/
	return false;
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
		if( ( neighbours[n][0] >= 0 ) && ( neighbours[n][0] <= 3 ) && ( neighbours[n][1] >= 0 ) && ( neighbours[n][1] <= 3 ) ){
			// add neighbour's index and direction to movelist
			switch(n){
				case 0:
					movelist.push([neighbours[n], "down"]);
				break;
				case 1:
					movelist.push([neighbours[n], "left"]);
				break;
				case 2:
					movelist.push([neighbours[n], "up"]);
				break;
				case 3:
					movelist.push([neighbours[n], "right"]);
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
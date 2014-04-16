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
		if ( search( state, 0, threshold ) ) {
			break;
		}
        threshold = incrementThreshold();
	}
　　console.log("Solution found at depth: " + threshold);
　　return threshold;
}

function search ( state, g, threshold ) {
	return threshold;
}

function incrementThreshold () {
	return 0;
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
	manhattanCost: total manhattan distance in puzzle
*/
	var manhattanCost = 0;
	var initPuzzle = [0,1,2,3,4,5,6,7,8];
	var currentPuzzle = state;

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
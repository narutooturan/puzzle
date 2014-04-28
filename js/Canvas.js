// game canvas
var canvas = document.getElementById("canvas");
canvas.height = 120 * 3;
canvas.width = 120 * 3;
var context = canvas.getContext("2d");

var Canvas = {
	drawCanvas: function() {
	// draw game canvas
		// draw tile
		for (var i = 0; i < 9 ; i++) {
			tiles[i].drawTile(context);
		};
	}
};
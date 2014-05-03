/******************
******* tile ******
*******************/
var tiles = new Array();
function tile(index) {
	this.x = 0;
	this.y = 0;
	this.width = 120;
	this.index = index;
	this.image = new Image();
	// image
	switch(this.index) {
		case 0:
			this.image.src = 'image/0.png';
			this.x = 0;
			this.y = 0;
		break;
		case 1:
			this.image.src = 'image/1.png';
			this.x = this.width;
			this.y = 0;
		break;
		case 2:
			this.image.src = 'image/2.png';
			this.x = this.width * 2;
			this.y = 0;
		break;
		case 3:
			this.image.src = 'image/3.png';
			this.x = 0;
			this.y = this.width;
		break;
		case 4:
			this.image.src = 'image/4.png';
			this.x = this.width;
			this.y = this.width;
		break;
		case 5:
			this.image.src = 'image/5.png';
			this.x = this.width * 2;
			this.y = this.width;
		break;
		case 6:
			this.image.src = 'image/6.png';
			this.x = 0;
			this.y = this.width * 2;
		break;
		case 7:
			this.image.src = 'image/7.png';
			this.x = this.width;
			this.y = this.width * 2;
		break;
		case 8:
			this.image.src = 'image/8.png';
			this.x = this.width * 2;
			this.y = this.width * 2;
		break;
	};

	this.drawTile = function (context){
		context.drawImage(this.image, this.x, this.y, this.width, this.width);
	};

};
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
			this.image.src = 'http://ww4.sinaimg.cn/mw1024/bdc2ed90jw1eg13q87aygj203c03cdfl.jpg';
			this.x = 0;
			this.y = 0;
		break;
		case 1:
			this.image.src = 'http://ww1.sinaimg.cn/mw1024/bdc2ed90jw1eg13q951ldj203c03c0sk.jpg';
			this.x = this.width;
			this.y = 0;
		break;
		case 2:
			this.image.src = 'http://ww2.sinaimg.cn/mw1024/bdc2ed90jw1eg13q9zxxmj203c03cdfo.jpg';
			this.x = this.width * 2;
			this.y = 0;
		break;
		case 3:
			this.image.src = 'http://ww1.sinaimg.cn/mw1024/bdc2ed90jw1eg13qaw4klj203c03ct8j.jpg';
			this.x = 0;
			this.y = this.width;
		break;
		case 4:
			this.image.src = 'http://ww4.sinaimg.cn/mw1024/bdc2ed90jw1eg13qbmr16j203c03c0sm.jpg';
			this.x = this.width;
			this.y = this.width;
		break;
		case 5:
			this.image.src = 'http://ww1.sinaimg.cn/mw1024/bdc2ed90jw1eg13qchl27j203c03c743.jpg';
			this.x = this.width * 2;
			this.y = this.width;
		break;
		case 6:
			this.image.src = 'http://ww4.sinaimg.cn/mw1024/bdc2ed90jw1eg13qd4hl7j203c03cmwy.jpg';
			this.x = 0;
			this.y = this.width * 2;
		break;
		case 7:
			this.image.src = 'http://ww3.sinaimg.cn/mw1024/bdc2ed90jw1eg13qdttb7j203c03ct8k.jpg';
			this.x = this.width;
			this.y = this.width * 2;
		break;
		case 8:
			this.image.src = 'http://ww4.sinaimg.cn/mw1024/bdc2ed90jw1eg13qeqtpoj203c03cjr6.jpg';
			this.x = this.width * 2;
			this.y = this.width * 2;
		break;
	};

	this.drawTile = function (context){
		context.drawImage(this.image, this.x, this.y, this.width, this.width);
	};

};
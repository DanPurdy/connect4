var game = {

	$piece: '',
	val: 350,
	color: ['yellow','red'],
	board: [[],[],[],[],[],[],[]],
	currentX: 0,
	currentY: 0,
	direction: '',
	player:1,
	score: [0,0],
	active: false,


	init: function(){
		this.setPiece();
		this.registerButtons();
		this.registerHandle();
		this.setupBoard();
	},

	newTurn: function(){
		this.active=false;
		this.setPiece();
		this.currentX=0;
		this.checkY();
		if(this.player ==1){
			this.player++;
		}else{
			this.player--;
		}
		this.registerHandle();

		this.resetScore();

	},

	resetScore: function(){
		this.score[0]=0;
		this.score[1]=0;
	},

	setupBoard: function(){
		for (var x = 0; x < 7; x++) {
			for (var y = 0; y < 6; y++) {
				this.board[x][y]=0;
				}
			}
	},

	setPiece: function(){
		this.$piece = $('.piece').eq(0);
	},

	registerButtons: function(){

		that = this;

		$(window).keydown(function(event){
			//37 left 39 right
			if(that.active===false){
				switch(event.keyCode){
					case 37:
						that.movePiece(-1);
					break;

					case 39:
						that.movePiece(1);
					break;
				}
			}


		});
	},

	registerHandle: function(){

		var that = this;
		this.$piece.on('click', function(){
			that.active=true;
			if(that.currentY<6){

				that.val= 350 - (that.currentY * 50);
				$(this).animate({top: that.val}, function(){
					$('.play-area').prepend('<div class="piece '+that.color[that.player-1]+'"></div>');
					that.logPiece();
					that.newTurn();
				});
			}
		});
	},

	movePiece: function(dir){

		this.currentX+= dir;
		if(this.currentX>6){
			this.currentX=6;
		}else if(this.currentX <0){
			this.currentX=0;
		}
		pos = this.currentX*50;
		this.$piece.animate({left: pos},100);

		this.checkY();
	},

	logPiece: function(){
		this.board[this.currentX][this.currentY] = this.player;
		console.log(this.board);

		this.checkHorizontal();
		this.checkVertical();
		this.checkDiagonal();
	},

	checkY: function(){
		num=6;
		for(i =0;i<this.board[this.currentX].length; i++){
			if(this.board[this.currentX][i]===0){
				num--;
			}
		}
		this.currentY=num;
	},

	checkHorizontal: function(){
		
		this.resetScore();

			for(i =0; i<this.board.length; i++){
				if(this.board[i][this.currentY] == this.player){
					if(++this.score[this.player-1]>=4){
						console.log('win Horizontal! Player: '+this.player);
						break;
					}
				} else {
					this.score[this.player-1] = 0;
				}
			}
		console.log(this.score);

	},

	checkVertical: function(){

		this.resetScore();

		for(i =0; i<this.board[this.currentX].length; i++){
				if(this.board[this.currentX][i] == this.player){
					if(++this.score[this.player-1]>=4){
						console.log('win Vertical! Player: '+this.player);
						break;
					}
				} else {
					this.score[this.player-1] = 0;
				}
			}
		console.log(this.score);
	},
	checkDiagonal: function(){
		var count =0;
		//minimum point bottom left is minX = math.max(currentX - 3),0  minY = math.max(currentY -3),0
		//max point top right is maxX = math.min(current x+3), 6 maxY = math.min(currentY+3),5
		//steps = 

		//OR

		//min point bottom right is math.min(currentX+3),6 math.max(currentY-3),0
		//max point top left is math.max(current x-3),0  math.min(current y+3),5

		

	}
	
};

$(document).ready(function(){
	game.init();

	console.log();
});
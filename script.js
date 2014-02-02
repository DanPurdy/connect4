var game = {

	$piece: '',
	val: 350,
	color: ['yellow','red'],
	board: [[],[],[],[],[],[],[]],
	currentX: 0,
	currentY: 0,
	player: 1,
	winFlag: 0,
	score: [0,0],
	active: false,


	init: function(){
		this.setPiece();
		this.registerButtons();
		this.registerHandle();
		this.setupBoard();
	},

	newTurn: function(){
		$('.play-area').prepend('<div class="piece '+that.color[that.player-1]+'"></div>');
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

	resetGame: function(){
		this.currentX=0;
		this.currentY=0;
		this.winFlag =0;
		$('.piece').remove();
		this.setupBoard();
		this.player=1;
		$('.play-area').prepend('<div class="piece red"></div>');
		this.active=false;
		this.setPiece();
		this.registerHandle();
		this.resetScore();
		
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
		$('.piece').off('click');
		var that = this;
		this.$piece.on('click', function(){
			that.active=true;
			if(that.currentY<6){

				that.val= 350 - (that.currentY * 50);
				$(this).animate({top: that.val}, function(){
					that.logPiece();
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
		this.checkHorizontal();
		this.checkVertical();
		this.checkSWNE();
		this.checkSENW();

		if(this.winFlag === 1){
			this.announceWin(this.player);
		}else{
			this.newTurn();
		}


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
						this.winFlag = 1;
						break;
					}
				} else {
					this.score[this.player-1] = 0;
				}
			}

	},

	checkVertical: function(){

		this.resetScore();

		for(i =0; i<this.board[this.currentX].length; i++){
				if(this.board[this.currentX][i] == this.player){
					if(++this.score[this.player-1]>=4){
						this.winFlag = 1;
						break;
					}
				} else {
					this.score[this.player-1] = 0;
				}
			}
	},
	checkSWNE: function(){
		
		this.resetScore();

		//South West - North East

		max = Math.min((this.board.length-1)-this.currentX, (this.board[0].length-1)-this.currentY);
		min = Math.min(this.currentX, this.currentY);
		steps = min + max + 1;

		minX = this.currentX - min;
		minY = this.currentY - min;

		this.checkDiag(minX, minY, steps, false);

	},

	checkSENW: function(){
		
		this.resetScore();

		//South East - North West

		max = Math.min(this.currentY, (this.board.length-1)-this.currentX);
		min = Math.min((this.board[0].length-1)-this.currentY, this.currentX);
		steps= min + max +1;

		maxX = this.currentX + max;
		minX = this.currentX - min;

		this.checkDiag(maxX, minY, steps, true);


	},

	checkDiag: function(x, y, steps, sE){

		for(i=0; i<steps; i++){
			if(this.board[x][y] == this.player){
				if(++this.score[this.player-1]>=4){
					this.winFlag = 1;
					break;
				}

			}else{
				this.score[this.player-1]=0;
			}

			if(sE === true){
				x--;
			}else{
				x++;
			}
			y++;

		}
	},

	announceWin: function(playerNum){

		alert('Player '+playerNum+' WINS!!! ');

		this.resetGame();

	}

	
};

$(document).ready(function(){
	game.init();

});
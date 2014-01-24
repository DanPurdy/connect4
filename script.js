var game = {

	$piece: '',
	val: 350,
	color: "red",
	board: [[],[],[],[],[],[]],
	currentX: 0,
	currentY: 0,
	direction: '',


	init: function(){
		this.setPiece();
		this.registerButtons();
		this.registerHandle();
		this.setupBoard();
	},

	newTurn: function(){
		this.setPiece();
		this.registerHandle();
		this.currentX=0;
		this.currentY=0;


	},

	setupBoard: function(){
		for (var i = 0; i < 6; i++) {
			for (var j = 0; j < 7; j++) {
				this.board[i][j]=0;
				}
			}
		console.log(this.board);
	},

	setPiece: function(){
		this.$piece = $('.piece').eq(0);
	},

	registerButtons: function(){

		that = this;
		$(window).keydown(function(event){
			//37 left 39 right

			switch(event.keyCode){
				case 37:
					that.movePiece(-1);
				break;

				case 39:
					that.movePiece(1);
				break;
			}


		});
	},

	registerHandle: function(){

		var that = this;
		this.$piece.on('click', function(){
			if(that.currentY<6){
				$(this).animate({top: that.val}, function(){
					$('.play-area').prepend('<div class="piece '+that.color+'"></div>');
					
					that.currentY+=1;
					that.val-= that.currentY * 50;
					if(that.color ==='red'){
						that.color='yellow';
					}else{
						that.color='red';
					}
					that.newTurn();
				});
			}
		});
	},

	movePiece: function(dir){

		this.currentX+= dir;
		console.log(this.currentX);
		if(this.currentX>6){
			this.currentX=6;
		}else if(this.currentX <0){
			this.currentX=0;
		}
		pos = this.currentX*50;
		this.$piece.animate({left: pos},100);
		this.val=350;
	}
};

$(document).ready(function(){
	game.init();
});
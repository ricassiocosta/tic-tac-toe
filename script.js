new Vue({
  el: '#app',
  data: {
    playerDot: "",
    aiDot: "",
    playTime: "",
    menuVisibility: "",
    boardVisibility: "hidden",
    board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    imageBoard: {
      cell_1a: "",
      cell_2a: "",
      cell_3a: "",
      cell_1b: "",
      cell_2b: "",
      cell_3b: "",
      cell_1c: "",
      cell_2c: "",
      cell_3c: "",
    }
  },
	methods: {
    setPlayerDot: function(dot) {
      this.playerDot = dot
      if (this.playerDot == 'X') {
        this.aiDot = 'O'
      } else {
        this.aiDot = 'X'
      }

      this.startGame()
    },

    startGame: function() {
      this.whoStartsPlaying()
      this.boardVisibility = "visible"
      this.menuVisibility = "hidden"
    },

    whoStartsPlaying: function() {
      playerStarts = Math.random() >= 0.5;
      if (playerStarts == true) {
        alert("Você quem começa a jogar.")
        this.playTime = "player"
      } else {
        alert("A máquina quem começa a jogar.")
        this.aiFirstMove()
      }
    },

    aiFirstMove: function() {
      let keys = Object.keys(this.imageBoard)
      randomNumber = Math.floor(Math.random() * keys.length)
      this.board[randomNumber] = this.aiDot
      this.imageBoard[keys[randomNumber]] = `./assets/${this.aiDot}.svg`
    },

    play: function(cell, index) {
      if (this.imageBoard[cell] == "") {
        this.board[index] = this.playerDot
        this.imageBoard[cell] = `./assets/${this.playerDot}.svg`
        this.nextRound()
      }
    },

    nextRound: function() {
      if(this.getEmptyCells(this.board) == 0) {
        alert("Deu VELHA!")
        window.location.reload()
      }
      player = this.aiDot
      move = this.thinkOnNextMove(this.board, player)
      this.aiPlay(move.index)
    },

    aiPlay: function(index) {
      let keys = Object.keys(this.imageBoard)
      this.board[index] = this.aiDot
      this.imageBoard[keys[index]] = `./assets/${this.aiDot}.svg`
      if(this.winner(this.board, this.aiDot)) {
        setTimeout(() => {
          alert("Eita! você perdeu x.x")
          window.location.reload()
        }, 300)
      }
      if(this.getEmptyCells(this.board) == 0) {
        setTimeout(() => {
          alert("Deu VELHA!")
          window.location.reload()
        }, 300)
      }
    },

    thinkOnNextMove: function(vBoard, player) {
      let array = this.getEmptyCells(vBoard);
      if (this.winner(vBoard, this.playerDot)) {
        return {
          score: -10
        };
      } else if (this.winner(vBoard, this.aiDot)) {
        return {
          score: 10
        };
      } else if (array.length === 0) {
        return {
          score: 0
        };
      }

      var moves = [];
      for (var i = 0; i < array.length; i++) {
        var move = {};
        move.index = vBoard[array[i]];
        vBoard[array[i]] = player;

        if (player == this.aiDot) {
          var g = this.thinkOnNextMove(vBoard, this.playerDot);
          move.score = g.score;
        } else {
          var g = this.thinkOnNextMove(vBoard, this.aiDot);
          move.score = g.score;
        }
        vBoard[array[i]] = move.index;
        moves.push(move);
      }

      var bestMove;
      if (player === this.aiDot) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
          if (moves[i].score > bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
          if (moves[i].score < bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      }
      return moves[bestMove];
    },

    winner: function(board, player) {
      if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
      ) {
        return true
      } else {
        return false
      }
    },

    getEmptyCells: function(board) {
      return  board.filter(s => s != "O" && s != "X");
    }
	}
})
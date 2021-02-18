new Vue({
  el: '#app',
  data: {
    playerDot: "",
    aiDot: "",
    playTime: "",
    menuVisibility: "",
    boardVisibility: "hidden",
    // board is the board used to calculate the game
    board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    // imageBoard is the board used to show the game
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
    // setPlayerDot sets the dot used by player
    setPlayerDot: function(dot) {
      this.playerDot = dot
      if (this.playerDot == 'X') {
        this.aiDot = 'O'
      } else {
        this.aiDot = 'X'
      }

      // after player chose his dot, the game starts
      this.startGame()
    },

    // startGame hide the menu and shows the board
    startGame: function() {
      // at this point, the game will choose who will start playing
      this.whoStartsPlaying()
      this.boardVisibility = "visible"
      this.menuVisibility = "hidden"
    },

    // whoStartsPlaying choose randomly the first to play
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

    // aiFirstMove choose randomly what spot in the board the AI
    // will start playing.
    aiFirstMove: function() {
      let keys = Object.keys(this.imageBoard)
      randomNumber = Math.floor(Math.random() * keys.length)
      this.board[randomNumber] = this.aiDot
      this.imageBoard[keys[randomNumber]] = `./assets/${this.aiDot}.svg`
    },

    // play is called when player plays
    play: function(cell, index) {
      if (this.imageBoard[cell] == "") {
        this.board[index] = this.playerDot
        this.imageBoard[cell] = `./assets/${this.playerDot}.svg`
        this.nextRound()
      }
    },

    // nextRound check if there was any free spot on the board, if does
    // AI will 'think' on her next move
    nextRound: function() {
      if(this.getEmptyCells(this.board) == 0) {
        alert("Deu VELHA!")
        window.location.reload()
      }
      player = this.aiDot
      move = this.thinkOnNextMove(this.board, player)
      // after AI 'think' on her next move, nextRound will call aiPlay
      // to peform this move.
      this.aiPlay(move.index)
    },

    // aiPlay peforms the move 'thought' before
    aiPlay: function(index) {
      let keys = Object.keys(this.imageBoard)
      this.board[index] = this.aiDot
      this.imageBoard[keys[index]] = `./assets/${this.aiDot}.svg`
      // check if this movement will won the game
      if(this.checkWin(this.board, this.aiDot)) {
        setTimeout(() => {
          alert("Eita! você perdeu x.x")
          window.location.reload()
        }, 300)
      }
      // if after this movement there are no empty spots on the board
      // the game ties
      if(this.getEmptyCells(this.board) == 0) {
        setTimeout(() => {
          alert("Deu VELHA!")
          window.location.reload()
        }, 300)
      }
    },

    // thinkOnNextMove will return the best move AI can peform on
    // a given board. This is a recursive function that will simulate 
    // all possibles plays that she can do and all plays the player can
    // do after her plays. The 'best move' is based on score points:
    // 1 point if AI wins
    // -1 point if player wins
    // 0 point if ties
    thinkOnNextMove: function(vBoard, player) {
      let emptyCells = this.getEmptyCells(vBoard)
      if (this.checkWin(vBoard, this.aiDot)) {
        return {
          score: 1
        }
      } else if (this.checkWin(vBoard, this.playerDot)) {
        return {
          score: -1
        }
      } else if (emptyCells.length === 0) {
        return {
          score: 0
        }
      }

      let moves = []
      for (let i = 0; i < emptyCells.length; i++) {
        let move = {}
        move.index = vBoard[emptyCells[i]]
        vBoard[emptyCells[i]] = player

        if (player == this.aiDot) {
          let result = this.thinkOnNextMove(vBoard, this.playerDot)
          move.score = result.score
        } else {
          let result = this.thinkOnNextMove(vBoard, this.aiDot)
          move.score = result.score
        }
        // here the algorithm restore the state of the board
        // after simulate the plays
        vBoard[emptyCells[i]] = move.index
        moves.push(move)
      }

      let bestMove
      if (player === this.aiDot) {
        // bestScore on AI turn is the higher score found
        let bestScore = -1000
        for (let i = 0; i < moves.length; i++) {
          if (moves[i].score > bestScore) {
            bestScore = moves[i].score
            bestMove = i
          }
        }
      } else {
        // bestScore on player turn is the lowest score found
        let bestScore = 1000
        for (let i = 0; i < moves.length; i++) {
          if (moves[i].score < bestScore) {
            bestScore = moves[i].score
            bestMove = i
          }
        }
      }
      return moves[bestMove]
    },

    // checkWin return if there are a winner in a given board
    checkWin: function(board, player) {
      if (
        // this is all the 'win' cases
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

    // getEmptyCells return the free spots of a given board
    getEmptyCells: function(board) {
      return  board.filter(s => s != "O" && s != "X");
    }
	}
})
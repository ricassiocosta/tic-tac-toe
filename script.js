new Vue({
  el: '#app',
  data: {
    playerDot: "",
    aiDot: "",
    playTime: "",
    menuVisibility: "",
    boardVisibility: "hidden",
    board: {
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
      if (this.playerDot == 'x') {
        this.aiDot = 'circle'
      } else {
        this.aiDot = 'x'
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
      keys = Object.keys(this.board)
      randomCell = keys[Math.floor(Math.random() * keys.length)]
      this.board[randomCell] = `./assets/${this.aiDot}.svg`
    },

    play: function(cell) {
      if (this.board[cell] == "") {
        this.board[cell] = `./assets/${this.playerDot}.svg`
        if(this.isAWinningPlay(this.board, cell)) {
          alert("Parabéns! Você venceu ;D")
          window.location.reload()
        } else {
          playTime = "ai"
          this.nextRound()
        }
      }
    },

    nextRound: function() {
      move = this.thinkOnNextMove(this.board, this.playTime)
      console.log(move)
      /*
      this.board[move.cell] = `/assets/${this.aiDot}.svg`
      if(this.isAWinningPlay(this.board, cell)) {
        alert("Eita! Você perdeu x.x")
        window.location.reload()
      }
      */
    },

    thinkOnNextMove: function(vBoard, playTime) {
      emptyCells = this.getEmptyCells(vBoard)
      if (emptyCells.length == 0) {
        return {score: 0}
      }
    
      moves = []
      var bestMove
      if (playTime == "ai") {
        dot = `/assets/${this.aiDot}.svg`
        for (cell in emptyCells) {
          move = {}
          move.index = vBoard[emptyCells[cell]]
          vBoard[emptyCells[cell]] = dot
          if (this.isAWinningPlay(vBoard, cell)){
              return {score: 1}
          } else {
            playTime = "player"
            result = this.thinkOnNextMove(vBoard, playTime)
            move.score = result.score
            vBoard[emptyCells[cell]] = move.index
            moves.push(move)
          }
        }
    
        bestScore = -10000
        for (move in moves) {
          if(move.score > bestScore) {
            bestMove = move
          }
        }
    
      } else {
        dot = `/assets/${this.playerDot}.svg`
        for (cell in emptyCells) {
          move = {}
          move.index = vBoard[emptyCells[cell]]
    
          vBoard[emptyCells[cell]] = dot
          if (this.isAWinningPlay(vBoard, cell)){
              return {score: -1}
          } else {
            playTime = "ai"
            result = this.thinkOnNextMove(vBoard, playTime)
            move.score = result.score
            vBoard[emptyCells[cell]] = move.index
            moves.push(move)
          }
        }
    
        bestScore = 10000
        for (move in moves) {
          if(move.score < bestScore) {
            bestMove = move
          }
        }
      }
      
      return bestMove
    },

    isAWinningPlay: function(board, cell) {
      if(
        (board["cell_1a"] == board["cell_2a"] && board["cell_2a"] == board["cell_3a"] && board["cell_3a"] == board[cell]) ||
        (board["cell_1b"] == board["cell_2b"] && board["cell_2b"] == board["cell_3b"] && board["cell_3b"] == board[cell]) ||
        (board["cell_1c"] == board["cell_2c"] && board["cell_2c"] == board["cell_3c"] && board["cell_3c"] == board[cell]) ||
        (board["cell_1a"] == board["cell_1b"] && board["cell_1b"] == board["cell_1c"] && board["cell_1c"] == board[cell]) ||
        (board["cell_2a"] == board["cell_2b"] && board["cell_2b"] == board["cell_2c"] && board["cell_2c"] == board[cell]) ||
        (board["cell_3a"] == board["cell_3b"] && board["cell_3b"] == board["cell_3c"] && board["cell_3c"] == board[cell]) ||
        (board["cell_1a"] == board["cell_2b"] && board["cell_2b"] == board["cell_3c"] && board["cell_3c"] == board[cell]) ||
        (board["cell_1c"] == board["cell_2b"] && board["cell_2b"] == board["cell_3a"] && board["cell_3a"] == board[cell])
      ) {
        return true
      } else {
        return false
      }
    },

    getEmptyCells: function(board) {
      emptyCells = []
      keys = Object.keys(board)
      for (key in keys) {
        if (board[keys[key]] == "") {
          emptyCells.push(keys[key])
        }
      }
      return emptyCells
    }
	}
})
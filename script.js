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
      this.board[randomCell] = `/assets/${this.aiDot}.svg`
    },

    play: function(cell) {
      if (this.board[cell] == "") {
        this.board[cell] = `/assets/${this.playerDot}.svg`
      }
    }
	}
})
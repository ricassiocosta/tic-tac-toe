new Vue({
  el: '#app',
  data: {
    playerDot: "",
    iaDot: "",
    playTime: "",
    boardVisibility: "hidden",
    menuVisibility: "",
    cell_1a: "",
    cell_2a: "",
    cell_3a: "",
    cell_1b: "",
    cell_2b: "",
    cell_3b: "",
    cell_1c: "",
    cell_2c: "",
    cell_3c: "",
  },
	methods: {
    setPlayerDot: function(dot) {
      this.playerDot = dot
      if (this.playerDot == 'x') {
        this.iaDot = 'circle'
      } else {
        this.iaDot = 'x'
      }

      this.startGame()
    },
    startGame: function() {
      this.boardVisibility = "visible"
      this.menuVisibility = "hidden"
    },

    play: function(cell) {
      this[cell] = `/assets/${this.playerDot}.svg`
    }
	}
})
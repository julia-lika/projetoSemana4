this.config = {
  type: Phaser.AUTO,
  width: 256,
  height: 256,

  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },

  scene: [Menu, Jogo]
};

var game_obj = new Phaser.Game(this.config);
class Menu extends Phaser.Scene {
  constructor() {
    super({ key: "Menu"});
  }

  preload() {
    this.load.image("background", "assets/menu.png");
    this.load.image(
      "buttonPlay",
      "assets/UI Big Play Button.png"
    );
  }

  create() {
    this.tamanhoJogo = 256;
    this.add.image(this.tamanhoJogo / 2, this.tamanhoJogo / 2, "background");
    this.botao = this.add.image(
      this.tamanhoJogo / 2,
      this.tamanhoJogo / 1.5,
      "buttonPlay"
    );
    this.botao.setInteractive();
    this.botao.on("pointerdown", () => {
      this.scene.start("Jogo");
    });

    let howToPlay = this.add
      .text(80, 29, "Como Jogar:", { fontSize: 20 })
      .setOrigin(0, 0);
    let teclados = this.add.text(
      80,
      110,
      "Utilize as setas do teclado \n para se locomover e pegar \n as maçãs!",
      { fontSize: 10 },
    );
    howToPlay.setX(this.tamanhoJogo / 2 - howToPlay.width / 2);
    teclados.setX(this.tamanhoJogo / 2 - teclados.width / 2);
  }

  update() {}
}

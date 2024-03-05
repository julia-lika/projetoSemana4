class Menu extends Phaser.Scene {
  constructor() {
    super({ key: "Menu" });
  }

  preload() {
    // Carrega os assets do menu
    this.load.image("background", "assets/menu.png");
    this.load.image("buttonPlay", "assets/UI Big Play Button.png");
  }

  create() {
    // Criação do menu

    // Tamanho do jogo
    this.tamanhoJogo = 256;

    // Adiciona a imagem de fundo do menu
    this.add.image(this.tamanhoJogo / 2, this.tamanhoJogo / 2, "background");

    // Adiciona o botão de play
    this.botao = this.add.image(
      this.tamanhoJogo / 2,
      this.tamanhoJogo / 1.5,
      "buttonPlay"
    );
    this.botao.setInteractive();
    this.botao.on("pointerdown", () => {
      this.scene.start("Jogo");
    });

    // Texto "Como Jogar:"
    let howToPlay = this.add
      .text(80, 29, "Como Jogar:", { fontSize: 20 })
      .setOrigin(0, 0);
    howToPlay.setX(this.tamanhoJogo / 2 - howToPlay.width / 2);

    // Texto de instruções
    let teclados = this.add.text(
      80,
      110,
      "Utilize as setas do teclado \n para se locomover e pegar \n as maçãs!",
      { fontSize: 10 }
    );
    teclados.setX(this.tamanhoJogo / 2 - teclados.width / 2);
  }

  update() {
    // Não há lógica de atualização no menu
  }
}
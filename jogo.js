class Jogo extends Phaser.Scene {
  constructor() {
    super({ key: "Jogo" });
  }

  cursors;
  macas;
  placar;
  pontuacao = 0;
  bunny;

  preload() {
    this.load.tilemapTiledJSON("mapa", "assets/mapa.json");
    this.load.image("grama", "assets/Grass.png");
    this.load.spritesheet(
      "bunny",
      "assets/Basic Charakter Spritesheet.png",
      { frameWidth: 48, frameHeight: 48 }
    );
    this.load.image("maca", "assets/apple.png");
    this.load.image("arvore", "assets/arvore.png");
  }

  create() {
    this.mapa = this.make.tilemap({ key: "mapa" });

    this.tilesetGrama = this.mapa.addTilesetImage("Grass", "grama");

    this.chao = this.mapa.createLayer("chao", this.tilesetGrama, 0, 0);

    // Configura o mundo de física do jogo
    this.physics.world.setBounds(
      0,
      0,
      this.mapa.widthInPixels,
      this.mapa.heightInPixels,
      true,
      true,
      true,
      true
    );

    // Criar o personagem
    this.bunny = this.physics.add.sprite(128, 128, "bunny").setScale(0.6);
    this.bunny.body.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    // Animar
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("bunny", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("bunny", {
        start: 8,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("bunny", {
        start: 12,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("bunny", {
        start: 4,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.arvore = this.physics.add.staticGroup();

    this.listaArvores = [
      //  Now let's create some ledges
      this.arvore.create(50, 50, "arvore"),
      this.arvore.create(128, 50, "arvore"),
      this.arvore.create(206, 50, "arvore"),
      this.arvore.create(50, 130, "arvore"),
      this.arvore.create(206, 130, "arvore"),
      this.arvore.create(50, 210, "arvore"),
      this.arvore.create(128, 210, "arvore"),
      this.arvore.create(206, 210, "arvore"),
    ];
    console.log(this.listaArvores);

    this.physics.add.collider(this.bunny, this.arvore);

    // Configuração da moeda
    this.maca = this.physics.add.sprite(128, 128, "maca");
    this.maca.setCollideWorldBounds(true); // Colisão com os limites do mundo
    this.maca.setBounce(0.7); // Elasticidade da maca

    // Adiciona o placar
    this.placar = this.add
      .text(50, 50, "Maçãs:" + this.pontuacao, {
        fontSize: "15px",
        fill: "#495613",
      })
      .setOrigin(0, 0);

    // Detecta colisão entre o bunny e a maca
    this.physics.add.overlap(this.bunny, this.maca, () => {
      this.maca.setVisible(false); // Maça fica "invisível"

      // Define uma nova posição para a maca
      this.posicaoMaca_Y = Phaser.Math.RND.between(40, 230);
      this.maca.setPosition(this.posicaoMaca_Y, 100);

      this.pontuacao += 1; // Soma pontuação
      this.placar.setText("Maçãs:" + this.pontuacao); // Atualiza o texto do placar

      this.maca.setVisible(true); // Torna a maca visível novamente
    });
  }

  update() {
    // Atualizar movimento do personagem baseado nos controles do teclado
    if (this.cursors.left.isDown) {
      this.bunny.body.setVelocityX(-110);
      // Ativar animação
      this.bunny.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.bunny.body.setVelocityX(110);
      // Ativar animação
      this.bunny.anims.play("right", true);
    } else if (this.cursors.up.isDown) {
      this.bunny.body.setVelocityY(-110);
      // Ativar animação
      this.bunny.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.bunny.body.setVelocityY(110);
      // Ativar animação
      this.bunny.anims.play("down", true);
    } else {
      this.bunny.setVelocityX(0);
      this.bunny.setVelocityY(0);
      this.bunny.anims.stop();
    }
  }
}

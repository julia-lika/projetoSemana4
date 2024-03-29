class Jogo extends Phaser.Scene {
  constructor() {
    super({ key: "Jogo" });
  }

  // Variáveis
  cursors;
  macas;
  placar;
  pontuacao = 0;
  bunny;
  cow;

  preload() {
    // Carrega os assets do jogo
    this.load.tilemapTiledJSON("mapa", "assets/mapa.json");
    this.load.image("grama", "assets/Grass.png");
    this.load.image("arvore", "assets/Basic_Grass_Biom_things.png");
    this.load.spritesheet("bunny", "assets/Basic Charakter Spritesheet.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.image("maca", "assets/apple.png");
  }

  create() {
    // Criação do jogo

    // Cria o mapa
    this.mapa = this.make.tilemap({ key: "mapa" });
    this.tilesetGrama = this.mapa.addTilesetImage("Grass", "grama");
    this.tilesetArvore = this.mapa.addTilesetImage("Basic_Grass_Biom_things", "arvore");
    
    // Criando layers do mapa
    this.chao = this.mapa.createLayer("chao", this.tilesetGrama, 0, 0);
    this.arvore = this.mapa.createLayer("arvore", this.tilesetArvore, 0, 0);

    // Ativando a propriedade de colisão feita no TILED
    this.arvore.setCollisionByProperty({colisor: true});

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

    // Adicionando colisão entre o bunny e a árvore
    this.physics.add.collider(this.bunny, this.arvore);

    this.cursors = this.input.keyboard.createCursorKeys();

  

    // Configura as animações
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

    // Configuração da maçã
    this.maca = this.physics.add.sprite(128, 128, "maca");
    this.maca.setCollideWorldBounds(true);
    this.maca.setBounce(0.7);

    // Placar
    this.placar = this.add
      .text(50, 50, "Maçãs:" + this.pontuacao, {
        fontSize: "15px",
        fill: "#495613",
      })
      .setOrigin(0.5, 2.5);

    // Detecta colisão entre o bunny e a maca
    this.physics.add.overlap(this.bunny, this.maca, () => {
      this.maca.setVisible(false);
  
      // Define nova posição para a maçã
      this.posicaoMaca_X = Phaser.Math.RND.between(40, 230);
      this.posicaoMaca_Y = Phaser.Math.RND.between(40, 400); // Adicionando eixo Y
  
      this.maca.setPosition(this.posicaoMaca_X, this.posicaoMaca_Y);
  
      this.pontuacao += 1;
      this.placar.setText("Maçãs:" + this.pontuacao);
      
      this.maca.setVisible(true);
  });
  }

  update() {
    // Atualiza movimento do personagem baseado nos controles do teclado
    var directions = ["left", "right", "up", "down"];

    for (var i = 0; i < directions.length; i++) {
      var direction = directions[i];
      var velocity = 0;

      if (this.cursors[direction].isDown) {
        velocity = direction === "left" || direction === "up" ? -110 : 110;
        this.bunny.body.setVelocity(
          direction === "left" || direction === "right" ? velocity : 0,
          direction === "up" || direction === "down" ? velocity : 0
        );
        this.bunny.anims.play(direction, true);
        break; // Interrompe o loop ao encontrar a primeira tecla pressionada
      }
    }

    // Se nenhuma tecla estiver pressionada, parar a animação e a velocidade
    if (velocity === 0) {
      this.bunny.setVelocityX(0);
      this.bunny.setVelocityY(0);
      this.bunny.anims.stop();
    }
  }
}
const config = {
    type: Phaser.AUTO,
    width: 7000,
    height: 520,
    parent: 'gameContainer',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);

let player;
let cursors;
let platforms;
let porteFin;
let timerText;
let remainingTime = 300;
let scoreText;
let score = 0;

let gameWonState = false;
let gameOverState = false;

function preload() {
    this.load.image('fond', 'img/Noir.png');
    this.load.image('prince', 'img/PrinceGauche.png');
    this.load.image('princeDroite', 'img/PrinceDroite.png');
    this.load.image('princeDroiteDep', 'img/PrinceDroiteDep.png');
    this.load.image('princeDep', 'img/PrinceGaucheDep.png');
    this.load.image('princeCouche', 'img/PrinceCouche.png');
    this.load.image('sol', 'img/Sol.png');
    this.load.image('porteFin', 'img/porteFin.png');
    this.load.image('porteGagne', 'img/porteGagne.png');
    this.load.image('porteFermee', 'img/porteFermee.png');
    this.load.image('porteGH', 'img/porteGH.png');
    this.load.image('briqueOriginale', 'img/briqueOriginale.png');
    this.load.image('Enemi', 'img/Enemi.png');
    this.load.image('Grille', 'img/Grille.png');
    this.load.image('OuvreGrille', 'img/ouvreGrille.png');
    this.load.image('Point1', 'img/Point1.png');
    this.load.image('Piege1', 'img/Piege1.png');
    this.load.image('Piege2', 'img/Piege2.png');

}

function create() {
    this.add.image(0, 0, 'fond').setOrigin(0, 0).setScale(10, 1);

    this.cameras.main.setBounds(0, 0, 7000, 520);
    this.cameras.main.setViewport(0, 0, 700, 520);

    platforms = this.physics.add.staticGroup();
    for (let i = 0; i <= 70; i++) {
        platforms.create(i * 100, 10, 'sol');
        if (i != 10)
            platforms.create(i * 100, 470, 'sol');
    }

    porteFin = this.physics.add.staticImage(6800, 400 - 132 / 2, 'porteFermee');

    player = this.physics.add.sprite(30, 200, 'prince');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    

    
        //Premier écran
            //1er tiers
            platforms.create(0 , 50, 'porteGH');
            platforms.create(0 , 120, 'porteGH');
            platforms.create(0 , 160, 'sol');
            platforms.create(100, 160, 'sol');
            platforms.create(200, 160, 'sol');
            platforms.create(500, 160, 'sol');
            platforms.create(600, 160, 'sol');
            platforms.create(800, 160, 'sol');
            platforms.create(900, 160, 'sol');
            platforms.create(1100, 160, 'sol');
            platforms.create(1200, 160, 'sol');
            platforms.create(1300, 160, 'sol');
            platforms.create(1400, 160, 'sol');
            platforms.create(1500, 160, 'sol');
               // platforms.create(1550,150, 'Enemi');
            platforms.create(1600, 160, 'sol');
            platforms.create(1700, 160, 'sol');
            platforms.create(1800, 160, 'sol');
            platforms.create(1900, 160, 'sol');
            platforms.create(2000, 160, 'sol');
            platforms.create(2375, 160, 'sol');
            platforms.create(2475, 160, 'sol');
            platforms.create(2575, 160, 'sol');
            platforms.create(2675, 160, 'sol');
            platforms.create(2775, 160, 'sol');
            platforms.create(2875, 160, 'sol');
            platforms.create(2975, 160, 'sol');
            platforms.create(3075, 160, 'sol');
            platforms.create(3150, 160, 'sol');

            platforms.create(3900, 160, 'sol');
            platforms.create(4000, 160, 'sol');
            platforms.create(4100, 160, 'sol');
            platforms.create(4200, 160, 'sol');
            platforms.create(4300, 160, 'sol');
            platforms.create(4400, 160, 'sol');
            platforms.create(4500, 160, 'sol');
            platforms.create(4600, 160, 'sol');
            platforms.create(4700, 160, 'sol');
            

            platforms.create(400, 40, 'briqueOriginale');
            platforms.create(400, 90, 'briqueOriginale');
            platforms.create(400, 140, 'briqueOriginale');
            platforms.create(450, 40, 'briqueOriginale');
            platforms.create(450, 90, 'briqueOriginale');
            platforms.create(450, 140, 'briqueOriginale');
            platforms.create(2200, 40, 'briqueOriginale');
            platforms.create(2200, 90, 'briqueOriginale');
            platforms.create(2200, 140, 'briqueOriginale');
            platforms.create(3350, 40, 'briqueOriginale');
            platforms.create(3350, 90, 'briqueOriginale');
            platforms.create(3350, 140, 'briqueOriginale');
            platforms.create(3400, 40, 'briqueOriginale');
            platforms.create(3400, 90, 'briqueOriginale');
            platforms.create(3400, 140, 'briqueOriginale');
            platforms.create(3450, 40, 'briqueOriginale');
            platforms.create(3450, 90, 'briqueOriginale');
            platforms.create(3450, 140, 'briqueOriginale');7
            platforms.create(3500, 40, 'briqueOriginale');
            platforms.create(3500, 90, 'briqueOriginale');
            platforms.create(3500, 140, 'briqueOriginale');
            platforms.create(3550, 40, 'briqueOriginale');
            platforms.create(3550, 90, 'briqueOriginale');
            platforms.create(3550, 140, 'briqueOriginale');

            




        //2eme tiers
            platforms.create(0 , 171, 'porteGH');
            platforms.create(0 , 171+70, 'porteGH');
            platforms.create(0 , 171+100, 'porteGH');
            platforms.create(0 , 310, 'sol');
            platforms.create(100 , 310, 'sol');
            platforms.create(200 , 310, 'sol');
            platforms.create(300 , 310, 'sol');
            platforms.create(500 , 310, 'sol');
            platforms.create(600 , 310, 'sol');
            platforms.create(700 , 310, 'sol');
            platforms.create(900 , 310, 'sol');
            platforms.create(1800, 310, 'sol');
            platforms.create(1900, 310, 'sol');
            platforms.create(2125, 310, 'sol');
            platforms.create(2275, 310, 'sol');
            platforms.create(2375, 310, 'sol');
            platforms.create(2475, 310, 'sol');
            platforms.create(2575, 310, 'sol');
            platforms.create(2675, 310, 'sol');
            platforms.create(2775, 310, 'sol');
            platforms.create(3225, 310, 'sol');
            platforms.create(3225, 310, 'sol');
            platforms.create(3325, 310, 'sol');
            platforms.create(3425, 310, 'sol');
            platforms.create(3525, 310, 'sol');
            platforms.create(3575, 310, 'sol');
            platforms.create(3775, 310, 'sol');
            platforms.create(3875, 310, 'sol');
            platforms.create(3975, 310, 'sol');
            platforms.create(4075, 310, 'sol');
            platforms.create(4175, 310, 'sol');
            platforms.create(4175, 310, 'sol');
            platforms.create(4275, 310, 'sol');
            platforms.create(4475, 310, 'sol');
            platforms.create(4575, 310, 'sol');
            platforms.create(4675, 310, 'sol');
            platforms.create(4775, 310, 'sol');
           

            
            

            platforms.create(450, 190, 'briqueOriginale');
            platforms.create(450, 240, 'briqueOriginale');
            platforms.create(450, 290, 'briqueOriginale');
            platforms.create(875, 190, 'briqueOriginale');
            platforms.create(875, 240, 'briqueOriginale');
            platforms.create(875, 290, 'briqueOriginale');
            platforms.create(925, 190, 'briqueOriginale');
            platforms.create(925, 240, 'briqueOriginale');
            platforms.create(925, 290, 'briqueOriginale');
            platforms.create(1075, 190, 'briqueOriginale');
            platforms.create(1075, 240, 'briqueOriginale');
            platforms.create(1075, 290, 'briqueOriginale');
            platforms.create(1125, 190, 'briqueOriginale');
            platforms.create(1125, 240, 'briqueOriginale');
            platforms.create(1125, 290, 'briqueOriginale');
            platforms.create(2200, 190, 'briqueOriginale');
            platforms.create(2200, 240, 'briqueOriginale');
            platforms.create(2200, 290, 'briqueOriginale');
            platforms.create(2975, 190, 'briqueOriginale');
            platforms.create(2975, 240, 'briqueOriginale');
            platforms.create(2975, 290, 'briqueOriginale');
            platforms.create(3025, 190, 'briqueOriginale');
            platforms.create(3025, 240, 'briqueOriginale');
            platforms.create(3025, 290, 'briqueOriginale');
            platforms.create(3075, 190, 'briqueOriginale');
            platforms.create(3075, 240, 'briqueOriginale');
            platforms.create(3075, 290, 'briqueOriginale');
            platforms.create(3125, 190, 'briqueOriginale');
            platforms.create(3125, 240, 'briqueOriginale');
            platforms.create(3125, 290, 'briqueOriginale');
            platforms.create(3175, 190, 'briqueOriginale');
            platforms.create(3175, 240, 'briqueOriginale');
            platforms.create(3175, 290, 'briqueOriginale');
            platforms.create(4275, 190, 'briqueOriginale');
            platforms.create(4275, 240, 'briqueOriginale');
            platforms.create(4275, 290, 'briqueOriginale');
            platforms.create(6100, 290, 'briqueOriginale');
            platforms.create(6150, 290, 'briqueOriginale');
            platforms.create(6200, 280, 'briqueOriginale');
            platforms.create(6250, 280, 'briqueOriginale');
            platforms.create(6300, 270, 'briqueOriginale');
            platforms.create(6350, 270, 'briqueOriginale');
            platforms.create(6400, 260, 'briqueOriginale');
            platforms.create(6450, 260, 'briqueOriginale');
            platforms.create(6500, 240, 'briqueOriginale');
            platforms.create(6550, 240, 'briqueOriginale');
            platforms.create(6600, 240, 'briqueOriginale');
            platforms.create(6650, 240, 'briqueOriginale');
            platforms.create(6700, 240, 'briqueOriginale');
            platforms.create(6750, 240, 'briqueOriginale');
            platforms.create(6800, 240, 'briqueOriginale');
            platforms.create(6850, 240, 'briqueOriginale');
            platforms.create(6900, 240, 'briqueOriginale');
            platforms.create(6950, 240, 'briqueOriginale');
            platforms.create(7000, 240, 'briqueOriginale');





        //3eme tiers
            platforms.create(0 , 340, 'briqueOriginale');
            platforms.create(0 , 390, 'briqueOriginale');
            platforms.create(0 , 440, 'briqueOriginale');
            platforms.create(200 , 340, 'briqueOriginale');
            platforms.create(200 , 390, 'briqueOriginale');
            platforms.create(200 , 440, 'briqueOriginale');
            platforms.create(250 , 340, 'briqueOriginale');
            platforms.create(250 , 390, 'briqueOriginale');
            platforms.create(250 , 440, 'briqueOriginale');
            platforms.create(875 , 340, 'briqueOriginale');
            platforms.create(875 , 390, 'briqueOriginale');
            platforms.create(875 , 440, 'briqueOriginale');
            platforms.create(925 , 340, 'briqueOriginale');
            platforms.create(925 , 390, 'briqueOriginale');
            platforms.create(925 , 440, 'briqueOriginale');
            platforms.create(1075, 340, 'briqueOriginale');
            platforms.create(1075, 390, 'briqueOriginale');
            platforms.create(1075, 440, 'briqueOriginale');
            platforms.create(1125, 340, 'briqueOriginale');
            platforms.create(1125, 390, 'briqueOriginale');
            platforms.create(1125, 440, 'briqueOriginale');
                //platforms.create(1700, 447, 'Point1');
            platforms.create(1775, 340, 'briqueOriginale');
            platforms.create(1775, 390, 'briqueOriginale');
            platforms.create(1775, 440, 'briqueOriginale');
            platforms.create(1825, 340, 'briqueOriginale');
            platforms.create(1825, 390, 'briqueOriginale');
            platforms.create(1825, 440, 'briqueOriginale');
            platforms.create(4450, 340, 'briqueOriginale');
            platforms.create(4450, 390, 'briqueOriginale');
            platforms.create(4450, 440, 'briqueOriginale');
            platforms.create(4500, 340, 'briqueOriginale');
            platforms.create(4500, 390, 'briqueOriginale');
            platforms.create(4500, 440, 'briqueOriginale');
            platforms.create(4550, 340, 'briqueOriginale');
            platforms.create(4550, 390, 'briqueOriginale');
            platforms.create(4550, 440, 'briqueOriginale');
            platforms.create(4600, 340, 'briqueOriginale');
            platforms.create(4600, 390, 'briqueOriginale');
            platforms.create(4600, 440, 'briqueOriginale');
            platforms.create(4650, 340, 'briqueOriginale');
            platforms.create(4650, 390, 'briqueOriginale');
            platforms.create(4650, 440, 'briqueOriginale');
            platforms.create(4700, 340, 'briqueOriginale');
            platforms.create(4700, 390, 'briqueOriginale');
            platforms.create(4700, 440, 'briqueOriginale');
            platforms.create(5600, 340, 'briqueOriginale');
            platforms.create(5600, 390, 'briqueOriginale');
            platforms.create(5600, 440, 'briqueOriginale');
            platforms.create(5800, 340, 'briqueOriginale');
            platforms.create(5800, 390, 'briqueOriginale');
            platforms.create(5800, 440, 'briqueOriginale');
            platforms.create(5850, 340, 'briqueOriginale');
            platforms.create(5850, 390, 'briqueOriginale');
            platforms.create(5850, 440, 'briqueOriginale');
            platforms.create(5900, 340, 'briqueOriginale');
            platforms.create(5900, 390, 'briqueOriginale');
            platforms.create(5900, 440, 'briqueOriginale');
            platforms.create(5950, 340, 'briqueOriginale');
            platforms.create(5950, 390, 'briqueOriginale');
            platforms.create(5950, 440, 'briqueOriginale');


            platforms.create(2975 , 350, 'porteGH');
            platforms.create(2975 , 420, 'porteGH');
            platforms.create(2975 , 440, 'porteGH');


            platforms.create(6090, 410, 'sol');
            platforms.create(6190, 409, 'sol');
            platforms.create(6290, 408, 'sol');
            platforms.create(6390, 407, 'sol');


            platforms.create(6490, 406, 'sol');
            platforms.create(6590, 405, 'sol');
            platforms.create(6690, 404, 'sol');
            platforms.create(6790, 403, 'sol');
            platforms.create(3890, 403, 'sol');


        //sur haut * 2

        // sur bas * 2
        for (let i = 0; i < 10; i++)
        {
            for (let j = 0; j < 6; j++)
            {
                platforms.create(1175+i*50, 190+j*50, 'briqueOriginale');
            }
        }

        for (let i = 0; i < 10; i++)
        {
            for (let j = 0; j < 6; j++)
            {
                platforms.create(5000+i*50, 40+j*50, 'briqueOriginale');
            }
        }

        //Fouteurs de merde


        //OuvrePortes
        platforms.create(525,155, 'OuvreGrille');
        platforms.create(3050,465, 'OuvreGrille');
       // 2975 , 440

        //Portes
        platforms.create(1700,65, 'Grille');
        platforms.create(4700,65, 'Grille');

        const plateforme1 = platforms.create(4650, 250, 'Piege1');
        const plateforme2 = platforms.create(5700, 390, 'Piege1');
        let trapState = 'Piege1';
        setInterval(toggleTrapImage, 500);
        function toggleTrapImage() {
            if (trapState === 'Piege1') {
              plateforme1.setTexture('Piege2');
              plateforme2.setTexture('Piege2');
              trapState = 'Piege2';
            } else {
              plateforme1.setTexture('Piege1');
              plateforme2.setTexture('Piege1');
              trapState = 'Piege1';
            }
          }

          //Collisions : 
          this.physics.add.collider(player, platforms, trapCollision, null, this);

        //images prince :
        

        scoreText = this.add.text(20, 40, 'Score: ' + score, { fontSize: '24px', fill: '#ffffff' }).setScrollFactor(0);

        this.physics.add.collider(player, platforms);
        
        
        cursors = this.input.keyboard.createCursorKeys();
    
        this.cameras.main.startFollow(player);
    
        timerText = this.add.text(20, 10, 'Temps restant: ' + remainingTime, { fontSize: '24px', fill: '#ffffff' }).setScrollFactor(0);
        this.time.addEvent({
            delay: 1000,
            callback: updateTimer,
            callbackScope: this,
            loop: true

        });

        this.time.addEvent({
            delay: 900, // Délai de 0.9 secondes (900 millisecondes)
            callback: checkTime,
            callbackScope: this,
            loop: true // Répéter indéfiniment
        });



    }

    function update() {
        if (cursors.left.isDown) {
            player.setVelocityX(-200);
            if (player.texture.key === 'prince')
            {
                player.setTexture('princeDep');
            }
            else
            {
               player.setTexture('prince'); 
            }
            
        } else if (cursors.right.isDown) {
            player.setVelocityX(200);
            if (player.texture.key === 'princeDroite')
            {
                player.setTexture('princeDroiteDep')
            }
            else if (cursors.shift.isDown) {
                player.setTexture('princeCouche');
            }
            else{
            player.setTexture('princeDroite');
            }


        }
         else {
            player.setVelocityX(0);
        }
        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-380);
            
        }
    
        // Vérifie si le joueur atteint la position x = 6970 et change l'image de la porte
        if (player.x >= 6970 && porteFin.texture.key === 'porteFermee') {
            porteFin.setTexture('porteFin');
            
        }

        if (checkOverlap(player, porteFin)) {
            player.setActive(false).setVisible(false);
            porteFin.setTexture('porteGagne');
            const winText = this.add.text(50, 300, 'GAGNÉ', { fontSize: '120px', fill: '#00ff00' });
            winText.setScrollFactor(0);
            this.physics.pause();
            

            // Envoyer le score à l'API
            var data = {
                action: "score",
                pseudo: document.cookie.userLogin,
                 jeu: 'Prince',
                 points: score
              };
            $.ajax({
                url: 'http://localhost/JS%20-%20Copie//PHP/api.php',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data)
            })
                
            
        }
    }


    function updateTimer() {
        if (!gameWonState && !gameOverState) {
          remainingTime--;
          const temps = remainingTime;
          timerText.setText('Temps restant: ' + remainingTime);
          score = remainingTime;
          scoreText.setText('Score: ' + score);
      
          if (temps < 0) {
            gameOver();
          }
        }
      }
      



    function checkOverlap(spriteA, spriteB) {
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
    
        return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
    }



    function gameOver(scene) {
        player.setTint(0xff0000);
        const winText = scene.add.text(
          scene.cameras.main.centerX,
          scene.cameras.main.centerY,
          'PERDU',
          { fontSize: '120px', fill: '#ff0000' }
        );
        winText.setOrigin(0.5);
        winText.setScrollFactor(0);
        scene.physics.pause();
        scene.gameOverState = true;
        
      }


    function trapCollision(player, trap) {
        if (trap.texture.key === 'Piege1') {
          gameOver(this);
        }
      }

      function checkTime() {
        if (!gameWonState && !gameOverState && remainingTime === 0) {
            gameOver(this);
        }
    }
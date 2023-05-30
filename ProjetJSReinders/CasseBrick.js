// Configurations du jeu
const config = {
  type: Phaser.AUTO,
  width: 1460,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
      collideWorldBounds: false
    }
  },
  scene: {
    preload: function() { preload.call(this); },
    create: function() { create.call(this); },
    update: function() { update.call(this); },

  }
};

const game = new Phaser.Game(config);


let ball;
let paddle;
let bricks;
let scoreText;
let score = 0;
let balls = [];
let gameOverText;
let ballsAdded = 1;
let ballsLost = 0;
let activeBalls = 1;



// Chargement des éléments du jeux (ici sprites)
function preload() {
  this.load.image('ball', 'ball.png');
  this.load.image('paddle', 'paddle.png');
  this.load.image('brick2', 'brick2.png');
  this.load.image('brick3', 'brick3.png');
  this.load.image('brick4', 'brick4.png');
  this.load.image('brick5', 'brick5.png');
  this.load.image('degrade', 'degrade.png');
}

// Fonction de création du jeu
function create() {
  
  const backgroundImage = this.add.image(0, 0, 'degrade').setOrigin(0, 0);

  const scaleX = 1460 / backgroundImage.width;
  const scaleY = 600 / backgroundImage.height;

  backgroundImage.setScale(scaleX, scaleY);
  
  balls = [addBall(this)];
  activeBalls = balls.length;

  //ecouteur d'évenement pour détécter si balle sort de l écran par le bas
  this.physics.world.on('worldbounds', (body, up, down, left, right) => {
    if (down) {
      body.gameObject.disableBody(true, true);
      this.ballsLost++;
      if (this.ballsLost === balls.length && !gameOverText) {
        gameOver(this);
      }
    }
  });

  //ecouteur d'évenement pour détecter si brique sort de l écran par le bas
  this.physics.world.on('worldbounds', (body, up, down, left, right) => {
    if (down && bricks.contains(body.gameObject)) {
      gameOver(this);
    }
  });

  
  
  paddle = this.physics.add.image(800, 550, 'paddle').setImmovable(true);

  // Paramètres de la grille de briques
  const columns = 15; // Nombre de colonnes
  const rows = 9; // Nombre de lignes
  const brickWidth = 75; // Largeur de la brique
  const brickHeight = 30; // Hauteur de la brique
  const brickSpacing = 0; // Espacement entre les briques
  const offsetX = config.width - (columns * brickWidth); // Décalage en x pour centrer la grille
  const offsetY = 40; // Décalage en y pour positionner la grille verticalement

  bricks = this.add.group();

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let x = offsetX + j * (brickWidth + brickSpacing);
      let y = offsetY + i * (brickHeight + brickSpacing);

      // Sélection aléatoire du type de brique
      let brickType = 'brick' + (Math.floor(Math.random() * 4) + 2);

      let brick = this.physics.add.image(x, y, brickType);
      brick.setBounce(1);
      brick.setImmovable(true);
      brick.setGravity(false);
      brick.body.onWorldBounds = true;
      bricks.add(brick);
    }
  }


  //gestion collision entre brique et paddle
  this.physics.add.collider(paddle, bricks, () => gameOver(this), null, this);


  // Création texte score
  scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFF', fontStyle: 'bold'});



  // Mise en place de détection des collisions
  this.physics.add.collider(balls[0], paddle, hitPaddle);
  this.physics.add.collider(balls[0], bricks, hitBrick, null, this);

  // Création instances touches gauche / droite
  this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
  this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


  //boutton quitter
  const exitButton = this.add.text(15, 80, 'Quitter', { fontSize: '32px', fill: '#FFF', fontStyle: 'bold'})
  .setInteractive()
  .on('pointerdown', () => {
      //envoyer les points vers le serveur
      window.location.href = '../index.html';
  });


}



// Fonctions jouabilité
function update() {
  // Déplace la raquette avec les flèches du clavier
  if (this.leftKey.isDown) {
    paddle.setVelocityX(-800);
  } else if (this.rightKey.isDown) {
    paddle.setVelocityX(800);
  } else {
    paddle.setVelocityX(0);
  }



  // Vérifie si le paddle sort de la zone de jeu et le maintient dans les limites
  if (paddle.x - paddle.width / 2 < 0) {
    paddle.x = paddle.width / 2;
  } else if (paddle.x + paddle.width / 2 > config.width) {
    paddle.x = config.width - paddle.width / 2;
  }

  // Vérifie si toutes les briques sont détruites
  if (bricks.countActive() === 0) {
    this.physics.pause();
    this.add.text(config.width / 2 - 150, config.height / 2, 'Vous avez gagné !', { fontSize: '32px', fill: '#FFF' });
  }

  // Gestion des balles
  let ballHitBottom = false;
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    if (ball && ball.y + ball.height / 2 > config.height) {
      ball.disableBody(true, true);
      ballHitBottom = true;
    }
  }

  // Mise à jour de la liste des balles actives
  balls = balls.filter(ball => ball.active);

  // Si toutes les balles ont quitté l'écran par le bas et qu'il n'y a pas encore de texte "Fin du jeu", appelle la fonction gameOver
  if (balls.length === 0 && !gameOverText) {
    gameOver(this);
  }

  // Mise à jour du texte du score
  scoreText.setText('score: ' + score);
}




function hitPaddle(ball, paddle) 
{
  let diff = ball.x - paddle.x;
  
  // Ajuster la vitesse en X de la balle en fonction de la position relative sur le paddle
  let newVelocityX = ball.body.velocity.x + diff * 0.1;
  
  // Inverser la vitesse en Y de la balle
  let newVelocityY = -Math.abs(ball.body.velocity.y);
  
  // Appliquer la nouvelle direction de la balle
  ball.setVelocity(newVelocityX, newVelocityY);
}


function hitBrick(ball, brick) {
  // Désactiver brique et mise à jour score
  brick.disableBody(true, true);
  score += 50;
  scoreText.setText('score: ' + score);

  // Ajouter une nouvelle ligne de briques tous les 1000 points
  if (score % 800 === 0) {
    addBrickRow.call(this);
  }

  // Ajouter une balle supplémentaire tous les 1000 points
  if (score % 1000 === 0) {
    addBall(this);
    ballsAdded++;
  }

  // Mettre à jour le nombre de balles actives
  activeBalls = balls.length;
}



// Fonction qui crée / ajoute une nouvelle balle
function addBall(scene) 
{
  let newBall = scene.physics.add.image(700, 500, 'ball').setCollideWorldBounds(true).setBounce(1);
  newBall.body.onWorldBounds = true;
  newBall.setVelocity(200, -200);
  scene.physics.add.collider(newBall, paddle, hitPaddle);
  scene.physics.add.collider(newBall, bricks, hitBrick, null, scene);
  balls.push(newBall);
  activeBalls++;
  return newBall;
}

//fonction fin de jeu
function gameOver(scene) {
  scene.physics.pause();
  gameOverText = scene.add.text(15, 150, 'Fin du jeu', { fontSize: '32px', fill: '#FFF', fontStyle: 'bold'});
  

         // Envoyer le score à l'API
         $.ajax({
          url: 'http://localhost/JS%20-%20Copie//PHP/api.php',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ action: 'MAJscore', pseudo: document.cookie.userLogin, jeu: 'CasseBriques', points: score})
      })

  // Ajouter un bouton de redirection
  const redirectButton = scene.add.text(15, 220, 'Rejouer', { fontSize: '32px', fill: '#FFF', fontStyle: 'bold'})
    .setInteractive()
    .on('pointerdown', () => {
      window.location.href = 'index.html';
    });

}



//Fonction ajout briques bonus
function addBrickRow() {
  // Décalez toutes les briques existantes vers le bas
  bricks.getChildren().forEach(brick => {
    brick.y += brick.height;
  });

  // Ajoutez une nouvelle ligne de briques en haut
  const columns = 15; // Nombre de colonnes
  const brickWidth = 75; // Largeur de la brique
  const brickHeight = 30; // Hauteur de la brique
  const brickSpacing = 0; // Espacement entre les briques
  const offsetX = config.width - (columns * brickWidth); // Décalage en x pour centrer la grille
  const offsetY = 40; // Décalage en y pour positionner la grille verticalement

  for (let j = 0; j < columns; j++) {
    let x = offsetX + j * (brickWidth + brickSpacing);
    let y = offsetY;

    // Sélection aléatoire du type de brique
    let brickType = 'brick' + (Math.floor(Math.random() * 4) + 2);

    let brick = this.physics.add.image(x, y, brickType);
    brick.setBounce(1);
    brick.setImmovable(true);
    brick.setGravity(false);
    bricks.add(brick);
  }
}

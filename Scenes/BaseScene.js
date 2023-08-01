class BaseScene extends Phaser.Scene {

    soccerBall;
    cursors;
    keys;
    playerFacing;
    playerOne;
    playerTwo;
    facingLeft;
    facingRight;
    leftGoal;
    rightGoal;
    scoreText;
    walls;
    startTime;
    gameOverText;
    returnToHomeButton;
    newTime;
    startTime;




    preload() {
        this.load.image('RedRight', 'Assets/Sprites/redRight.png');
        this.load.image('RedLeft', 'Assets/Sprites/redLeft.png');
        this.load.image('BlueRight', 'Assets/Sprites/blueRight.png');
        this.load.image('BlueLeft', 'Assets/Sprites/blueLeft.png');
        this.load.image('SoccerBall', 'Assets/Sprites/Soccer_Ball-1.png');
        this.load.image('Background', 'Assets/Sprites/Background.png');
        this.load.image('RightGoal', 'Assets/Sprites/Right_Goal.png');
        this.load.image('LeftGoal', 'Assets/Sprites/Left_Goal.png');

        this.load.image('BlueGreyRight', 'Assets/Sprites/blueGreyRight.png');
        this.load.image('BlueGreyLeft', 'Assets/Sprites/blueGreyLeft.png');
        this.load.image('RedGreyRight', 'Assets/Sprites/redGreyRight.png');
        this.load.image('RedGreyLeft', 'Assets/Sprites/redGreyLeft.png');

        this.load.image("tiles", "Assets/tiles/tilesheet_complete.png");
        this.load.tilemapTiledJSON("grassyField", "Assets/tiles/defaultField.tmj");
        this.load.image("GameOverButton", "Assets/reloadScreen/restart_button.png");
        this.load.image("gotohome_button", "Assets/reloadScreen/gotohome_button.png");
        this.load.image("win_screen", "Assets/reloadScreen/win_screen.png");


        this.load.audio("kick", "Assets/sfx/Kick.wav");
        this.load.audio("goal", "sfx/GoalAssets/.wav");
        this.load.audio("moonTheme", "Assets/music/moonTheme.mp3")

        this.load.atlas('players', 'Assets/Sprites/playersprites.png', 'Assets/Sprites/playersprites.json');
        //this.load.atlas('player', 'Assets/Sprites/player000spritesheet.png', 'Assets/Sprites/player000spritesheet.json');
        //this.load.atlas('player2', 'Assets/Sprites/player100spritesheet.png', 'Assets/Sprites/player100spritesheet.json');
    }

    create() {
        //background
        this.map = this.make.tilemap({ key: "grassyField" });
        const tileset = this.map.addTilesetImage("defaultField", "tiles");

        this.ground = this.map.createLayer("Tile Layer 1", tileset);
        const sky = this.map.createLayer("Tile Layer 4", tileset);
        const landscape = this.map.createLayer("Tile Layer 2", tileset);
        const flowers = this.map.createLayer("Tile Layer 3", tileset);
        this.load.image("win_screen", "Assets/reloadScreen/win_screen.png");
        this.startTime = this.time.now;
        currentMap = "baseScene";

        //hoverSprite.setVisible(false);

        //this.explosion = this.add.sprite(0, 0, 'boom').setVisible(false);


        //Player one animations

        //var idle = this.anims.create({key: 'player', frames: this.anims.generateFrameNames('player', {prefix: 'player0', suffix: '.png', end: 5, zeroPad: 2}), repeat: -1, frameRate: 10});
        var righta = this.anims.create({
            key: 'player', frames: this.anims.generateFrameNames('players',
                {
                    prefix: 'playerrunningright0',
                    end: 8, zeroPad: 2
                }), repeat: -1, frameRate: 10
        });
        var lefta = this.anims.create({
            key: 'player', frames: this.anims.generateFrameNames('players',
                {
                    prefix: 'playerrunningleft0',
                    start: 9, end: 16, zeroPad: 2
                }), repeat: -1, frameRate: 10
        });
        //playerAnimations['idle'] = idle;
        playerAnimations['right'] = righta;
        playerAnimations['left'] = lefta;


        //Player two animations
        //var idle2 = this.anims.create({key: 'player2', frames: this.anims.generateFrameNames('player2', {prefix: 'player1', suffix: '.png', end: 5, zeroPad: 2}), repeat: -1, frameRate: 10});
        var righta2 = this.anims.create({
            key: 'player2', frames: this.anims.generateFrameNames('players',
                {
                    prefix: 'playerrunningright1',
                    end: 8, zeroPad: 2
                }), repeat: -1, frameRate: 10
        });
        var lefta2 = this.anims.create({
            key: 'player2', frames: this.anims.generateFrameNames('players',
                {
                    prefix: 'playerrunningleft1',
                    start: 9, end: 16, zeroPad: 2
                }),
            repeat: -1, frameRate: 10
        });
        //player2Animations['idle'] = idle2;
        player2Animations['right'] = righta2;
        player2Animations['left'] = lefta2;

        this.ground.setCollision(201);


        // Create playerOne instance of Player class
        this.playerOne = new Player(config.width / 4, 100, this, 1, 'player', playerAnimations);
        this.playerTwo = new Player(config.width * .75, 100, this, 2, 'player', player2Animations);
        this.soccerBall = new Ball(config.width / 2, 0, this);
        this.leftGoal = new Goal(7, 553, 'LeftGoal', this);
        this.rightGoal = new Goal(config.width - 3, 553, 'RightGoal', this);
        this.walls = [];
        this.gameOver = false;

        this.physics.add.collider(this.playerOne.getSprite(), this.ground);
        this.physics.add.collider(this.playerTwo.getSprite(), this.ground);
        this.physics.add.collider(this.soccerBall.getSprite(), this.ground);

        //Ball collsion with player one
        this.physics.add.collider(this.playerOne.getSprite(), this.soccerBall.getSprite(), function (player, ball) { }, function (player, ball) { this.calculateCollision(this.playerOne, this.soccerBall, 1, this); return false; }, this);

        //Ball collision with player two
        this.physics.add.collider(this.playerTwo.getSprite(), this.soccerBall.getSprite(), function (player, ball) { }, function (player, ball) { this.calculateCollision(this.playerTwo, this.soccerBall, 2, this); return false; }, this);

        //Ball collision with the goals
        this.physics.add.collider(this.leftGoal.getSprite(), this.soccerBall.getSprite(), function (goal, ball) { }, function (goal, ball) {
            if (Math.abs(this.soccerBall.getX() - this.leftGoal.getX()) < 25) {
                ball.setX(config.width / 2);
                ball.setY(0);
                ball.setVelocityX(0);
                ball.setVelocityY(0);
                this.playerTwo.increaseScore();
                this.playerOne.setX(config.width * .75);
                this.playerOne.setY(config.height - 104);
                this.playerOne.setVelocityX(0);
                this.playerOne.setVelocityY(0);
                this.playerTwo.setX(config.width / 4);
                this.playerTwo.setY(config.height - 104);
                this.playerTwo.setVelocityX(0);
                this.playerTwo.setVelocityY(0);
                this.playerTwoScoreText.setText('' + this.playerTwo.score);
                //this.sound.play("goal");
            }
            return false;
        }, this);

        this.physics.add.collider(this.rightGoal.getSprite(), this.soccerBall.getSprite(), function (goal, ball) { }, function (goal, ball) {
            if (Math.abs(this.soccerBall.getX() - this.rightGoal.getX()) < 25) {
                ball.setX(config.width / 2);
                ball.setY(0);
                ball.setVelocityX(0);
                ball.setVelocityY(0);
                this.playerOne.increaseScore();
                this.playerOne.setX(config.width * .75);
                this.playerOne.setY(config.height - 104);
                this.playerOne.setVelocityX(0);
                this.playerOne.setVelocityY(0);
                this.playerTwo.setX(config.width / 4);
                this.playerTwo.setY(config.height - 104);
                this.playerTwo.setVelocityX(0);
                this.playerTwo.setVelocityY(0);
                this.playerOneScoreText.setText('' + this.playerOne.score);
                //this.sound.play("goal");
            }
            return false;
        }, this);

        //Ball collision with top of goal
        this.physics.add.collider(this.soccerBall.getSprite(), this.leftGoal.getTopCollider(), null, null, this);

        this.physics.add.collider(this.soccerBall.getSprite(), this.rightGoal.getTopCollider(), null, null, this);

        this.physics.add.collider(this.playerOne.getSprite(), this.leftGoal.getTopCollider(), null, null, this);

        this.physics.add.collider(this.playerOne.getSprite(), this.rightGoal.getTopCollider(), null, null, this);

        this.physics.add.collider(this.playerTwo.getSprite(), this.leftGoal.getTopCollider(), null, null, this);

        this.physics.add.collider(this.playerTwo.getSprite(), this.rightGoal.getTopCollider(), null, null, this);

        //Add collision between the ball and the walls and the player and the walls
        for (this.i = 0; this.i < this.walls.length; this.i++) {
            this.physics.add.collider(playerOne.getSprite(), walls[i].getSprite());
            this.physics.add.collider(playerTwo.getSprite(), walls[i].getSprite());
            this.physics.add.collider(soccerBall.getSprite(), walls[i].getSprite());
        }

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('W, A, S, D');

        this.setGUIColor('#000');
    }

    setGUIColor(color) {
        this.playerOneScoreText = this.add.text(300, 30, '0', { fontSize: '60px', fill: color });
        this.playerTwoScoreText = this.add.text(config.width - 300, 30, '0', { fontSize: '60px', fill: color });
        this.timerText = this.add.text(config.width / 2 - 90, 20, '', { fontSize: '90px', fill: color })

    }

    endGame(color) {
        if (this.newTime <= 0) {
            this.timerText.setText('0:00');

            if (this.playerOne.score > this.playerTwo.score) {
                this.gameOverText = this.add.text(config.width / 2 - 125, 150, 'Player 1 Wins!', { fontSize: '30px', fill: color });
                this.gameOverText.setDepth(4);
            }

            else if (this.playerTwo.score > this.playerOne.score) {
                this.gameOverText = this.add.text(config.width / 2 - 125, 150, 'Player 2 Wins!', { fontSize: '30px', fill: color });
                this.gameOverText.setDepth(4);
            }
            
            else {
                this.gameOverText = this.add.text(config.width / 2 - 100, 150, "It's a tie!", { fontSize: '30px', fill: color });
                this.gameOverText.setDepth(4);
            }

            this.playerOne.getSprite().disableBody(true, false);
            this.playerTwo.getSprite().disableBody(true, false);
            this.soccerBall.getSprite().disableBody(true, false);
            this.playerOne.getSprite().disableInteractive();
            this.playerTwo.getSprite().disableInteractive();
            this.soccerBall.getSprite().disableInteractive();

            let gameOverButton = this.add.image(this.game.renderer.width / 2, 285, "GameOverButton").setDepth(4).setScale(0.4);

            let goHome = this.add.image(this.game.renderer.width / 2, 390, "gotohome_button").setDepth(4);

            let winScreen = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "win_screen").setDepth(3);
            winScreen.setScale(0.4)
            goHome.setScale(0.4)

            let hoverSprite = this.add.sprite(100, 100, "arrow").setDepth(4);
            hoverSprite.setScale(0.1);
            hoverSprite.setVisible(false);
            gameOverButton.setInteractive();

            gameOverButton.on("pointerover", () => {
                hoverSprite.setVisible(true);
                hoverSprite.x = gameOverButton.x - gameOverButton.width / 4;
                hoverSprite.y = gameOverButton.y;
                //this.sound.play("menuHover");                           

            })

            gameOverButton.on("pointerout", () => {
                hoverSprite.setVisible(false);
            })

            gameOverButton.on("pointerup", () => {
                this.sound.play("menuSelect");
                if (currentMap === "baseScene") {
                    this.scene.start("BaseScene")
                }
                if (currentMap === "moonScene") {
                    this.sound.stopByKey("moonTheme");
                    this.scene.start("MoonScene");
                }
                this.startTime = this.time.now;

            })

            goHome.setInteractive();
            goHome.on("pointerover", () => {
                hoverSprite.setVisible(true);
                hoverSprite.x = goHome.x - goHome.width / 4;
                hoverSprite.y = goHome.y;
                //this.sound.play("menuHover");  
            })

            goHome.on("pointerout", () => {
                hoverSprite.setVisible(false);
            })

            goHome.on("pointerup", () => {
                this.sound.play("menuSelect");
                this.scene.start("HomeScene");
                if (currentMap === "moonScene") {
                    this.sound.stopByKey("moonTheme");
                    this.sound.play("titleMusic", {
                        loop: true
                    })
                }

            })


        }
    }




    //Calculates the collsion with the player and the ball
    calculateCollision(player, ball, playerNum, scene) {
        let currentTime = scene.time.now;
        // Check if enough time has passed since the last kick
        if (currentTime - player.getLastKickTime() < 200) {
            // If not, return immediately without kicking
            return;
        }


        //Kick code 
        //Player should kick when ever the player moves into the ball


        //Up and left kick
        if (playerNum === 1 && this.keys.W.isDown && this.keys.A.isDown && ball.getX() - player.getX() <= 0 || playerNum === 2 && this.cursors.up.isDown && this.cursors.left.isDown && ball.getX() - player.getX() <= 0) {
            ball.setVelocityY(-700);
            ball.setVelocityX(- 90 - (Math.abs(player.getVelocityX())));
            player.setLastKickTime(currentTime);
            this.sound.play("kick");
        }

        //Up and right kick
        else if (playerNum === 1 && this.keys.W.isDown && this.keys.D.isDown && ball.getX() - player.getX() > 0 || playerNum === 2 && this.cursors.up.isDown && this.cursors.right.isDown && ball.getX() - player.getX() > 0) {
            ball.setVelocityY(-700);
            ball.setVelocityX(90 + (Math.abs(player.getVelocityX())));
            player.setLastKickTime(currentTime);
            this.sound.play("kick");
        }

        //Down and left kick
        else if (playerNum === 1 && this.keys.S.isDown && this.keys.A.isDown && ball.getY() - player.getY() <= 0 && !player.getSprite().body.blocked.down || playerNum === 2 && this.cursors.down.isDown && this.cursors.left.isDown && ball.getY() - player.getY() <= 0 && !player.getSprite().body.blocked.down) {
            ball.setVelocityY(700);
            ball.setVelocityX(- 90 - (Math.abs(player.getVelocityX())));
            player.setLastKickTime(currentTime);
            this.sound.play("kick");
        }

        //Down and right kick
        else if (playerNum === 1 && this.keys.S.isDown && this.keys.D.isDown && ball.getY() - player.getY() > 0 && !player.getSprite().body.blocked.down || playerNum === 2 && this.cursors.down.isDown && this.cursors.right.isDown && ball.getY() - player.getY() > 0 && !player.getSprite().body.blocked.down) {
            ball.setVelocityY(700);
            ball.setVelocityX(90 + (Math.abs(player.getVelocityX())));
            player.setLastKickTime(currentTime);
            this.sound.play("kick");
        }

        //Left straight kick
        else if (playerNum === 1 && this.keys.A.isDown && ball.getX() - player.getX() <= 0 && this.keys.D.isUp || playerNum === 2 && this.cursors.left.isDown && ball.getX() - player.getX() <= 0 && this.cursors.right.isUp) {
            ball.setVelocityX(-90 - (Math.abs(player.getVelocityX())));
            player.setLastKickTime(currentTime);
            this.sound.play("kick");
        }

        //Right straight kick
        else if (playerNum === 1 && this.keys.D.isDown && this.keys.D.isDown && ball.getX() - player.getX() > 0 && this.keys.A.isUp || playerNum === 2 && this.cursors.right.isDown && ball.getX() - player.getX() > 0 && this.cursors.left.isUp) {
            ball.setVelocityX(90 + (Math.abs(player.getVelocityX())));
            player.setLastKickTime(currentTime);
            this.sound.play("kick");
        }

        //Up kick
        else if (playerNum === 1 && this.keys.W.isDown || playerNum === 2 && this.cursors.up.isDown) {
            ball.setVelocityY(-90 - (Math.abs(player.getVelocityY() * 2)));
            player.setLastKickTime(currentTime);
            this.sound.play("kick");
        }

        //Down kick
        else if (playerNum === 1 && this.keys.S.isDown && !player.getSprite().body.blocked.down || playerNum === 2 && this.cursors.down.isDown && !player.getSprite().body.blocked.down) {
            ball.setVelocityY(90 + (Math.abs(player.getVelocityY() * 2)));
            player.setLastKickTime(currentTime);
            this.sound.play("kick");
        }
    }

    update() {
        //Movment & 
        this.playerOne.update(this.keys.W, this.keys.A, this.keys.S, this.keys.D);
        this.playerTwo.update(this.cursors.up, this.cursors.left, this.cursors.down, this.cursors.right);
        
        this.soccerBall.update();

        //Update timer to count down from 2:00 to 0
        this.newTime = parseInt((121000 - (this.time.now - this.startTime)) / 1000);

        //Timer display
        if (this.newTime % 60 <= 9 && this.newTime % 60 >= 0) {
            this.timerText.setText(parseInt(this.newTime / 60) + ':0' + this.newTime % 60);
        }

        else if (this.newTime % 60 > 9 && this.newTime >= 0) {
            this.timerText.setText(parseInt(this.newTime / 60) + ':' + this.newTime % 60);
        }

        //Ends game

        this.endGame('#000');

        //Set up animation controls

        if (this.cursors.left.isDown) {
            this.playerTwo.play(player2Animations['left'], true);
            console.log("p2 left");
        } 
        
        else if (this.cursors.right.isDown) {
            this.playerTwo.play(player2Animations['right'], true);
            console.log("p2 right");
        }

        if (this.keys.A.isDown) {
            this.playerOne.play(playerAnimations['left'], true);
            console.log("p1 left");
        }
        
        else if (this.keys.D.isDown) {
            this.playerOne.play(playerAnimations['right'], true);
            console.log("p1 right");
        }
    }

}

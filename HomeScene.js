class HomeScene extends Phaser.Scene {

    preload() {
        this.load.image("HomeScreen", "Assets/homeScreen/home_bg.png");
        this.load.image("MapButton", "Assets/homeScreen/mapButton.png");
        this.load.image('player_1', 'Assets/Sprites/blueRight.png');
        this.load.image('player_2', 'Assets/Sprites/redLeft.png');
        this.load.image("LeftGoal", "Assets/tiles/leftGoal.png");
        this.load.image("RightGoal", "Assets/tiles/rightGoal.png");
        this.load.image("arrow", "Assets/mainMenu/arrow.png");
        this.load.image("back_button", "Assets/homeScreen/Back_button.png");
    }

    create() {
        const homeScreen = this.add.image(0, 0, "HomeScreen").setOrigin(0);
        var mapButton = this.add.image(1000, 604, "MapButton").setDepth(1);
        let backButton = this.add.image(50, 50, "back_button");

        var player1 = this.add.image(config.width / 2 - 100, 500, "player_1");
        player1.setScale(9);
        var player2 = this.add.image(config.width / 2 + 100, 500, "player_2");
        player2.setScale(9);

        var leftGoal = this.add.image(60, 480, "LeftGoal").setDepth(0);
        leftGoal.setScale(2);
        var rightGoal = this.add.image(1092, 480, "RightGoal").setDepth(0);
        rightGoal.setScale(2);
        let back = this.add.text(backButton.x + 30, backButton.y / 1.5, "Back",
            { fontSize: '32px', fill: '#000' }).setDepth(1);

        back.visible = false;

        backButton.setInteractive();
        backButton.on("pointerover", () => {
            back.visible = true;
        })
        backButton.on("pointerout", () => {
            back.visible = false;
        })
        backButton.on("pointerup", () => {
            //this.scene.start("TitleScene");
            this.sound.stopByKey("titleMusic");
            this.scene.switch("TitleScene")
        })

        let hoverSprite = this.add.sprite(mapButton.x - mapButton.width / 1.5, 604, "arrow").setDepth(3);
        hoverSprite.setScale(0.1);
        hoverSprite.setVisible(false);

        mapButton.setInteractive();
        mapButton.on("pointerover", () => {
            console.log("hover");
            hoverSprite.setVisible(true);
            this.sound.play("menuHover");
        })
        mapButton.on("pointerout", () => {
            console.log("out");
            hoverSprite.setVisible(false);
        })
        mapButton.on("pointerup", () => {
            this.sound.play("menuSelect");
            this.scene.start("MapScene");
        })

    }

}

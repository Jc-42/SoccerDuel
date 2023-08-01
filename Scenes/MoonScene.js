class MoonScene extends BaseScene {

    preload() {
        super.preload();
        this.load.image("moon_view", "Assets/tiles/moonView.png");
        this.load.image("Moon", "Assets/tiles/moon.png");
    }
    create() {
        super.create();
        currentMap = "moonScene";
        this.sound.play("moonTheme");
        super.setGUIColor('#FFF');
        let moonBg = this.add.image(0, 0, "moon_view").setOrigin(0);
        let moon = this.add.image(0, 0, "Moon").setOrigin(0);
        moonBg.setScale(4);
        moon.setScale(4);
        let base = this.scene.get('BaseScene');
        this.ground.setDepth(1);
        moonBg.setDepth(2);
        this.playerOne.getSprite().setDepth(3);
        this.playerTwo.getSprite().setDepth(3);
        this.soccerBall.getSprite().setDepth(3);
        this.leftGoal.getSprite().setDepth(3);
        this.rightGoal.getSprite().setDepth(3);
        this.playerOneScoreText.setDepth(3);
        this.playerTwoScoreText.setDepth(3);
        this.timerText.setDepth(3);
        this.physics.world.gravity.y = 500;





    }
    update() {
        super.update();
        super.endGame('#FFF');
    }
}


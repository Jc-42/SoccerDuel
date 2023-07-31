class TitleScene extends Phaser.Scene {


    preload() {
        //menu screen
        this.load.image("title_bg", "mainMenu/title_bg.png");
        this.load.image("credit_button", "mainMenu/creditButton.png");
        this.load.image("play_button", "mainMenu/playButton.png");
        this.load.image("settings_button", "mainMenu/settingsButton.png");
        this.load.image("arrow", "mainMenu/arrow.png");

        this.load.audio("titleMusic", "music/menuTheme.wav");
        this.load.audio("menuSelect", "music/menuSelect.wav");
        this.load.audio("menuHover", "music/menuHover.wav");

        //create loadingbar
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff//white
            }
        })


        /*Loader events
            complete - when done loading everything
            progress - loader number progress in decimal
        */
        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
        })

        this.load.on("complete", () => {
            //this.scene.start(CST.SCENES.MENU,"hello from loadScene");\
        })
    }




    create() {
        this.add.image(0, 0, "title_bg").setOrigin(0).setDepth(1);
        let creditButton = this.add.image(this.game.renderer.width / 2.78,
            450, "credit_button").setDepth(2);
        let settingButton = this.add.image(this.game.renderer.width / 1.55,
            450, "settings_button").setDepth(2);
        let playButton = this.add.image(this.game.renderer.width / 2,
            285, "play_button").setDepth(2);


        this.sound.pauseOnBlur = false
        this.sound.play("titleMusic", {
            loop: true
        })

        //let title = this.add.image(0,0,"Title").setOrigin(0).setDepth(2);

        let hoverSprite = this.add.sprite(100, 100, "arrow").setDepth(3);
        hoverSprite.setScale(0.1);
        hoverSprite.setVisible(false);

        // hoverSprite.setScale()

        /*pointer events:
            pointerover- hovering
            pointerout - not hovering
            pointerup - click and release
            pointerdown - just click
        */
        //PLAY BUTTON
        playButton.setInteractive();
        playButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.x = playButton.x - playButton.width / 1.5;
            hoverSprite.y = playButton.y;
            this.sound.play("menuHover");
        })
        playButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })
        playButton.on("pointerup", () => {
            this.sound.play("menuSelect");
            this.scene.start("HomeScene");

        })

        //CREDIT BUTTON
        creditButton.setInteractive();
        creditButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.x = creditButton.x - creditButton.width / 1.3;
            hoverSprite.y = creditButton.y;
            this.sound.play("menuHover");
        })
        creditButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })
        creditButton.on("pointerup", () => {
            this.sound.play("menuSelect");
        })

        //SETTING BUTTON
        settingButton.setInteractive();
        settingButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.x = settingButton.x - settingButton.width / 1.3;
            hoverSprite.y = settingButton.y;
            this.sound.play("menuHover");
        })
        settingButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })
        settingButton.on("pointerup", () => {
            this.sound.play("menuSelect");
        })

    }
}

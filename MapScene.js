class MapScene extends Phaser.Scene {
    maps;
    currentMap = 0;
    currentImage;
    displayedImage;

    preload() {
        this.load.image("right_click", "maps/Right_click.png");
        this.load.image("left_click", "maps/Left_click.png");
        this.load.image("default_preview", "maps/Default_preview.png");
        this.load.image("moon_preview", "maps/moon_preview.png");
        this.load.image("yellow_bg", "maps/yellow_bg.png");
    }

    create() {
        var backButton = this.add.image(50, 50, "back_button").setDepth(1);
        let rightClick = this.
            add.image(1052, this.game.renderer.height / 2, "right_click");
        rightClick.setScale(0.1).setDepth(1);
        let leftClick = this.add.image(100, this.game.renderer.height / 2, "left_click");
        leftClick.setScale(0.1).setDepth(1);
        this.add.image(0, 0, "yellow_bg").setOrigin(0).setDepth(0);



        this.maps = ["default_preview", "moon_preview"];
        this.currentImage = this.maps[this.currentMap];

        this.displayedImage = this.add.image(this.game.renderer.width / 2,
            this.game.renderer.height / 2,
            this.currentImage).setScale(0.6);

        let back = this.add.text(backButton.x + 30, backButton.y / 1.5, "Back",
            { fontSize: '32px', fill: '#000' }).setDepth(2);

        back.visible = false;

        backButton.setInteractive();
        backButton.on("pointerover", () => {
            back.visible = true;
        })

        backButton.on("pointerout", () => {
            back.visible = false;
        })

        backButton.on("pointerup", () => {
            this.scene.start("HomeScene");
        })

        this.displayedImage.setInteractive();
        rightClick.on("pointerover", () => {
        })

        this.displayedImage.on("pointerup", () => {
            this.sound.play("menuSelect");
            if (this.currentImage === "default_preview") {
                this.scene.start("BaseScene");
                this.scene.get('BaseScene').startTime = this.time.now;
            }
            else if (this.currentImage === "moon_preview") {
                this.scene.start("MoonScene");
                this.sound.stopByKey("titleMusic");
            }
        })

        rightClick.setInteractive();
        rightClick.on("pointerover", () => {
        })

        rightClick.on("pointerup", () => {
            this.sound.play("menuSelect");
            if (this.currentMap >= this.maps.length - 1) {
                this.currentMap = 0;
            } else {
                this.currentMap++;
            }

            this.currentImage = this.maps[this.currentMap];
            this.displayedImage.setTexture(this.currentImage);

        })



        leftClick.setInteractive();
        leftClick.on("pointerover", () => {
        })

        leftClick.on("pointerup", () => {
            this.sound.play("menuSelect");
            if (this.currentMap <= 0) {
                this.currentMap = this.maps.length - 1;
            } else {
                this.currentMap--;
            }

            this.currentImage = this.maps[this.currentMap];
            this.displayedImage.setTexture(this.currentImage);
        })

    }
}   

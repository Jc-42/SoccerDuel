class Goal {
    constructor(x, y, sprite, scene) {
        this.goal = scene.physics.add.sprite(x, y, sprite);
        this.goal.body.setAllowGravity(false);
        this.goal.setScale(1.4);

        // Create the top collider
        this.topCollider = scene.physics.add.staticSprite(x, y - this.goal.body.height * 1.4 / 2, null);
        this.topCollider.body.setSize(this.goal.body.width * 1.4, 30);
        this.topCollider.setVisible(false);
    }

    getSprite() {
        return this.goal;
    }

    getTopCollider() {
        return this.topCollider;
    }

    getHeight() {
        return this.goal.body.height;
    }

    getWidth() {
        return this.goal.body.width;
    }

    getX() {
        return this.goal.x;
    }

    getY() {
        return this.goal.y;
    }

}

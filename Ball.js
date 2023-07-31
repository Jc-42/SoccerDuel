class Ball {
    constructor(x, y, scene) {
        this.ball = scene.physics.add.sprite(x, y, 'SoccerBall');
        this.ball.setScale(2.2);
        this.ball.setBounce(1);
        this.ball.setCollideWorldBounds(true);
        this.ball.body.setCircle(12.5);
        this.scene = scene
    }

    update() {

        //Max ball speed
        if (Math.abs(this.ball.body.velocity.x) > 700) {
            this.ball.setVelocityX(700 * Math.sign(this.ball.body.velocity.x));
        }
        if (Math.abs(this.ball.body.velocity.y) > 700) {
            this.ball.setVelocityY(700 * Math.sign(this.ball.body.velocity.y))
        }

        //Add friction to the ball
        if (this.ball.body.blocked.down) {
            this.scene.sound.play("kick");
            this.ball.setVelocityX(this.ball.body.velocity.x * .7);
            this.ball.setVelocityY(this.ball.body.velocity.y * .7);
        }
        else if (this.ball.body.blocked.left || this.ball.body.blocked.right) {
            this.scene.sound.play("kick");
            this.ball.setVelocityX(this.ball.body.velocity.x * .7);
            this.ball.setVelocityY(this.ball.body.velocity.y * .7);
        }

        //Ball will always bounce
        if (this.ball.body.blocked.down && Math.abs(this.ball.body.velocity.y) < 400) {
            this.ball.setVelocityY(-400);
        }

    }

    getSprite() {
        return this.ball;
    }

    getX() {
        return this.ball.x;
    }

    getY() {
        return this.ball.y;
    }

    getVelocityX() {
        return this.ball.body.velocity.x;
    }

    getVelocityY() {
        return this.ball.body.velocity.y;
    }

    getWidth() {
        return this.ball.body.width;
    }

    getHeight() {
        return this.ball.body.height;
    }

    setVelocityX(velX) {
        this.ball.setVelocityX(velX);
    }

    setVelocityY(velY) {
        this.ball.setVelocityY(velY);
    }

    setX(n) {
        this.ball.x = n;
    }

    setY(n) {
        this.ball.y = n;
    }


}
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(x, y, scene, n, direction, spritesheet, animations) {

        super(scene, x, y, spritesheet);
        this.animations = animations;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setVelocity(0, 0);
        this.setBounce(0, 0);
        this.setCollideWorldBounds(true);
        this.setScale(3.4);
        //this.setSize(9, 24, 4.5, 102);
        this.setBodySize(10, 28, false);
        this.lastKickTime = 0;
        this.num = n;
        this.directionFacing = 1;


        this.score = 0;
        //    this.physics.collide(this,this.ground);
    }

    update(up, left, down, right) {



        //Slowdown when not pressing anything or pressing oposite movement
        if (left.isDown && right.isDown || !left.isDown && !right.isDown) {

            if (this.body.blocked.down) {
                this.setVelocityX(this.body.velocity.x * .4);
            }
            else {
                this.setVelocityX(this.body.velocity.x * .9);
            }

            //Grey player out by default

            if (this.directionFacing === 1) {
                if (this.num === 1) {
                    this.setTexture('BlueGreyRight');
                }
                else {
                    this.setTexture('RedGreyRight');
                }

            }
            else if (this.directionFacing === -1) {
                if (this.num === 1) {
                    this.setTexture('BlueGreyLeft');

                }
                else {
                    this.setTexture('RedGreyLeft');
                }
            }


        }

        else if (left.isDown) {
            //Add amiations


            //Set direction facing for textures
            this.directionFacing = -1;

            //Move slower in the air
            if (!this.body.blocked.down) {
                this.setVelocityX(this.body.velocity.x - 20);
            }
            else {
                this.setVelocityX(this.body.velocity.x - 140);
            }


        }
        else if (right.isDown) {

            //Set direction facing for textures
            this.directionFacing = 1;

            //Move slower in the air
            if (!this.body.blocked.down) {
                this.setVelocityX(this.body.velocity.x + 20);
            }
            else {
                this.setVelocityX(this.body.velocity.x + 140);
            }
        }

        //Override the grey textures if the player is pressing any movement key. But not when pressing left and right (to prevent puppy guarding goal). Or when player is pressing down and on the ground (because player can only down kick in midair)  
        /*
        if(up.isDown || down.isDown && !this.body.blocked.down || (left.isDown && !right.isDown) || (!left.isDown && right.isDown)){
            if(this.directionFacing === 1){
                if(this.num === 1){ 
                    this.setTexture('RedRight');
                }
                else{
                    this.setTexture('BlueRight');
                }

            }
            else if(this.directionFacing === -1){
                if(this.num === 1){
                    this.setTexture('RedLeft');
                    
                }
                else{
                    this.setTexture('BlueLeft');
                }
            }
        }

       */

        //Jump
        if (up.isDown && this.body.blocked.down) {
            this.setVelocityY(-500)
        }

        //Max horizontal speed
        if (Math.abs(this.body.velocity.x) > 525) {
            this.setVelocityX(525 * Math.sign(this.body.velocity.x));
        }


    }

    getSprite() {
        return this;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getVelocityX() {
        return this.body.velocity.x;
    }

    getVelocityY() {
        return this.body.velocity.y;
    }

    getWidth() {
        return this.body.width;
    }

    getHeight() {
        return this.body.height;
    }

    getLastKickTime() {
        return this.lastKickTime;
    }

    getHeight() {
        return this.body.height;
    }

    getWidth() {
        return this.body.height;
    }

    setLastKickTime(n) {
        this.lastKickTime = n;
    }

    increaseScore() {
        this.score++;
    }

    setX(n) {
        this.x = n;
    }

    setY(n) {
        this.y = n;
    }

    setVelocityX(velX) {
        this.body.velocity.x = velX
    }

    setVelocityY(velY) {
        this.body.velocity.y = velY
    }




}

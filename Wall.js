class Wall {
    constructor(x, y, width, height, color, scene) {
        // Create a graphics object
        let graphics = scene.make.graphics();

        // Draw a rectangle on the graphics object
        graphics.fillStyle(color);
        graphics.fillRect(0, 0, width, height);

        // Generate a texture from the graphics object
        let textureKey = 'wallTexture' + x + y;
        graphics.generateTexture(textureKey, width, height);

        // Create a physics object using the generated texture
        this.wall = scene.physics.add.staticImage(x, y, textureKey);
    }

    getSprite() {
        return this.wall;
    }
}

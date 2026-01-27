const config = {
    type: Phaser.AUTO, // Automatically detects WebGL or Canvas rendering
    width: 800,
    height: 600,
    physics: {
        default: 'arcade', // Uses "Arcade Physics" for simple collisions
        arcade: { debug: false }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let player;
let cursors;

function preload() {
    // Loading a placeholder image from the Phaser labs
    this.load.image('hero', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');

    this.load.image('block', 'https://labs.phaser.io/assets/sprites/block.png');
}

// Create an invisible target zone at a specific coordinate
let targetZone = this.add.zone(600, 300, 50, 50);
this.physics.add.existing(targetZone, true); // True means it is a "static" body (doesn't move)

class MainMenu extends Phaser.Scene {
    constructor() { super('MainMenu'); }
    
    create() {
        this.add.text(400, 200, 'Derivative Math Quest', { fontSize: '40px' }).setOrigin(0.5);
        let startBtn = this.add.text(400, 400, 'START GAME', { fill: '#0f0' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('Level1')); // Switch to Level 1
    }
}

function create() {
    // Add the player to the center of the screen
    player = this.physics.add.sprite(400, 300, 'hero');
    
    // Prevent the player from walking off the screen
    player.setCollideWorldBounds(true);
    
    // Initialize the keyboard inputs
    cursors = this.input.keyboard.createCursorKeys();

    // Create a group for blocks that can be pushed
    blocks = this.physics.add.group();

    // Add a specific block with a "value" property for the math logic
    let block18 = blocks.create(200, 200, 'block');
    block18.setDrag(1000); // Friction so it doesn't slide forever
    block18.setBounce(0);
    block18.value = 18; // We store the answer value here

    // Make the player and blocks solid so they can push each other
    this.physics.add.collider(player, blocks);
}

function update() {
    // Reset velocity every frame so the player stops when keys are released
    player.setVelocity(0);

    if (cursors.left.isDown) {
        player.setVelocityX(-200);
    } else if (cursors.right.isDown) {
        player.setVelocityX(200);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-200);
    } else if (cursors.down.isDown) {
        player.setVelocityY(200);
    }

    
}



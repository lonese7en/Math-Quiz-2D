// --- 1. THE QUESTIONS (LEVEL DATA) ---
const levels = [
    { 
        level: 1,
        question: "Find the derivative of: 9x^2", 
        answer: 18, 
        options: [18, 9, 81], 
        playerStart: { x: 400, y: 500 }
    },
    { 
        level: 2,
        question: "Solve: 5x + 10 = 35", 
        answer: 5, 
        options: [5, 25, 10],
        playerStart: { x: 100, y: 100 }
    },
    { 
        level: 3,
        question: "What is 12 * 12?", 
        answer: 144, 
        options: [144, 124, 24],
        playerStart: { x: 400, y: 300 }
    }
];

// --- 2. MAIN MENU SCENE ---
class MainMenu extends Phaser.Scene {
    constructor() { super('MainMenu'); }

    preload() {
        // Load the Title Screen Music
        this.load.audio('title_music', 'assets/title_bgm.mp3');
        
        // Also load the Game Music here so it's ready instantly when level starts
        this.load.audio('game_music', 'assets/game_bgm.mp3');
        
        // Load other assets (images) if you haven't loaded them globally yet
    }

    create() {
        this.add.text(400, 200, 'MATH PUZZLE QUEST', { fontSize: '40px', fill: '#fff' }).setOrigin(0.5);
        
        this.sound.stopAll();
        this.bgm = this.sound.add('title_music', { loop: true, volume: 0.5 });
        this.bgm.play();

        let startBtn = this.add.text(400, 300, 'CLICK TO START', { fontSize: '24px', fill: '#0f0' })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

       startBtn.on('pointerdown', () => {
            // OPTIONAL: Play a "Start Game" sound effect here if you have one
            
            // Note: We don't strictly NEED to stop the music here because
            // the GameLevel will run 'stopAll()' immediately, but it's good practice.
            this.bgm.stop(); 
            
            this.scene.start('GameLevel', levels[0]); 
        });
        
    }
    
}

// --- 3. GAME LEVEL SCENE ---
class GameLevel extends Phaser.Scene {
    constructor() { super('GameLevel'); }

    init(data) {
        this.currentLevelData = data;
        this.correctAnswer = data.answer;
        this.isGameFinished = false; 
    }

    preload() {
 
        this.load.tilemapTiledJSON('level1', 'assets/level1.json');
        this.load.image('sunny_tiles_png', 'assets/spr_tileset_sunnysideworld_16px.png');
        this.load.spritesheet('hero_sheet', 'assets/player.png', { 
            frameWidth: 48, 
            frameHeight: 48
        });

        this.load.image('block', 'assets/block.png');
        this.load.image('wall', 'assets/wall.png');

        this.load.spritesheet('professor', 'assets/doctor.png', { frameWidth: 16, frameHeight: 32 });
    }

    create() {

        const map = this.make.tilemap({ key: 'level1' });
        const sunnyTiles = map.addTilesetImage('sunny_world', 'sunny_tiles_png', 16, 16, 1, 2);
        const groundLayer = map.createLayer('Ground', sunnyTiles, 0, 0);
        const decorLayer = map.createLayer('Decoration', sunnyTiles, 0, 0);
        const wallsLayer = map.createLayer('Walls', sunnyTiles, 0, 0);
        groundLayer.setScale(3);
        decorLayer.setScale(3);
        wallsLayer.setScale(3);
        wallsLayer.setCollisionByExclusion([-1]);

        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        this.interactPrompt = this.add.text(0, 0, 'Press E', {
        fontSize: '12px',
        backgroundColor: '#000000',
        padding: { x: 5, y: 5 }
    }).setOrigin(0.5).setDepth(101).setVisible(false);


    // 2. The Main Dialog Bubble (Top of Screen)
    // We make a container or just a text box with a background
    this.dialogBox = this.add.text(400, 50, '', {
        fontSize: '18px',
        color: '#ffffff',
        backgroundColor: '#222222', // Dark Grey background
        padding: { x: 20, y: 20 },
        wordWrap: { width: 700 },
        align: 'left',
        fixedWidth: 700,  // Make it wide
        fixedHeight: 150  // Make it tall
    }).setOrigin(0.5, 0) // Anchor at Top-Center
      .setScrollFactor(0) // Stick to camera (HUD)
      .setDepth(200)      // Render on top of everything
      .setVisible(false); // Hide at start
      
    // Add a fancy border to the dialog (Optional)
    this.dialogBox.setStroke('#ffffff', 2);

    this.storyText = this.add.text(400, 450, '', {
            fontSize: '18px',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 20, y: 20 },
            align: 'center',
            wordWrap: { width: 600 }
        }).setOrigin(0.5).setScrollFactor(0).setDepth(100).setVisible(false);


        
       
        // --- ANIMATION SETUP ---
        // 1. Idle (Row 1: Frames 0-5)
        this.anims.create({
            key: 'idle-down',
            frames: this.anims.generateFrameNumbers('hero_sheet', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1
        });

        // 2. Run Down (Row 4: Frames 18-23)
        this.anims.create({
            key: 'run-down',
            frames: this.anims.generateFrameNumbers('hero_sheet', { start: 18, end: 23 }),
            frameRate: 10,
            repeat: -1
        });

        // 3. Run Side (Row 5: Frames 24-29)
        this.anims.create({
            key: 'run-side',
            frames: this.anims.generateFrameNumbers('hero_sheet', { start: 24, end: 29 }),
            frameRate: 10,
            repeat: -1
        });

        // 4. Run Up (Row 6: Frames 30-35)
        this.anims.create({
            key: 'run-up',
            frames: this.anims.generateFrameNumbers('hero_sheet', { start: 30, end: 35 }),
            frameRate: 10,
            repeat: -1
        });

        // --- LEVEL UI ---
        this.add.text(16, 16, `Level ${this.currentLevelData.level}: ${this.currentLevelData.question}`, { fontSize: '24px', fill: '#fff' });

        // --- TARGET ZONE ---
        this.targetZone = this.add.zone(700, 300, 10, 10);
        this.physics.add.existing(this.targetZone, true); 
        
        let zoneGraphics = this.add.graphics();
        zoneGraphics.lineStyle(2, 0xffff00);
        zoneGraphics.strokeRect(this.targetZone.x - 30, this.targetZone.y - 30, 60, 60);
        this.add.text(665, 340, "ANSWER\n  ZONE", { fontSize: '12px', align: 'center' });

        // --- PLAYER SETUP ---
        this.player = this.physics.add.sprite(this.currentLevelData.playerStart.x, this.currentLevelData.playerStart.y, 'hero_sheet');
        this.player.play('idle-down'); // Start breathing
        this.player.setScale(3); // Make him big (Retro style)
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(8, 5);
        this.player.body.setOffset(17, 25);
        this.cursors = this.input.keyboard.createCursorKeys();

        // NPC

        if (this.currentLevelData.level === 1) {
        
        // Spawn him 50 pixels to the right of the player
        this.npc = this.physics.add.sprite(this.player.x + 100, this.player.y, 'professor');
        this.npc.setScale(3);           // Match the game scale
        this.npc.setFrame(3);           // Frame 3 is usually "Front Facing" in 4-frame strips
        this.npc.setImmovable(true);    // He won't get pushed around
        this.npc.setDepth(10);
        this.npc.body.setAllowGravity(false); // Stays in place
        this.npc.body.setSize(10, 10);
        this.npc.body.setOffset(0, 20);
        
        // Add collision so the physics body is active
        this.physics.add.collider(this.player, this.npc);

        
    }


        // --- BLOCKS SETUP ---
        this.blocks = this.physics.add.group();

        let yPos = 150;
        this.currentLevelData.options.forEach(number => {
            let block = this.blocks.create(200, yPos, 'block');
            block.setScale(3); // Make blocks big too!
            block.setDrag(1000); 
            block.setBounce(0);
            block.setCollideWorldBounds(true);
            block.value = number; 
            
            let text = this.add.text(0, 0, number, { fontSize: '16px', color: '#000', fontStyle: 'bold' }).setOrigin(0.5);
            
            block.updateText = function() {
                text.x = this.x;
                text.y = this.y;
            };

            yPos += 150; 
        });

        this.physics.add.collider(this.player, this.blocks);
        this.physics.add.collider(this.blocks, this.blocks);
        
        this.physics.add.collider(this.player, wallsLayer);
        this.physics.add.collider(this.blocks, wallsLayer);
        

        let restartBtn = this.add.text(750, 50, '↺', { 
        fontSize: '40px', 
        fill: '#ffffff',
        backgroundColor: '#000000' 

        
    })
    .setPadding(10)
    .setOrigin(0.5)
    .setScrollFactor(0) // <--- CRITICAL: Keeps it stuck to the screen!
    .setInteractive({ useHandCursor: true });

    // Restart Logic
    restartBtn.on('pointerdown', () => {
        this.scene.restart(); // Magically reloads the current level from scratch
    });

    // 2. PAUSE BUTTON (Two vertical lines)
    let pauseBtn = this.add.text(680, 50, 'II', { 
        fontSize: '30px', 
        fill: '#ffffff',
        backgroundColor: '#000000' 
    })
    .setPadding(10)
    .setOrigin(0.5)
    .setScrollFactor(0) 
    .setInteractive({ useHandCursor: true });

    // Pause Logic (Simple Toggle)
    pauseBtn.on('pointerdown', () => {
        if (this.physics.world.isPaused) {
            this.physics.resume();
            pauseBtn.setText('II'); // Change text back to Pause
        } else {
            this.physics.pause();
            pauseBtn.setText('▶'); // Change text to Play
        }
    });

    // 3. KEYBOARD SHORTCUT ("R" to Restart)
    // This is super satisfying for puzzle games
    this.input.keyboard.on('keydown-R', () => {
        this.scene.restart();
    });

    // 4. ESCAPE KEY (Go back to Main Menu)
    this.input.keyboard.on('keydown-ESC', () => {
        this.scene.start('MainMenu');
    });

    if (!this.sound.get('game_music')) {
        // If it doesn't exist yet, add it
        let music = this.sound.add('game_music', { loop: true, volume: 0.4 });
        music.play();
    } else if (!this.sound.get('game_music').isPlaying) {
        // If it exists but stopped, play it
        this.sound.get('game_music').play();
    }
     wallsLayer.setCollisionByExclusion([-1]); // Everything in 'Walls' layer stops the player
        this.physics.add.collider(this.player, wallsLayer);
        this.physics.add.collider(this.blocks, wallsLayer);

        // --- CAMERA & WORLD BOUNDS ---
    // 1. Calculate the real size of the map (since we scaled by 3)
    const mapWidth = map.widthInPixels * 3;
    const mapHeight = map.heightInPixels * 3;

    // 2. Expand the Physics World
    // Without this, the player hits an invisible wall at 800px!
    this.physics.world.setBounds(0, 0, mapWidth, mapHeight);

    // 3. Make Camera Follow Player
    this.cameras.main.startFollow(this.player);

    // 4. Set Camera Limits
    // This stops the camera from scrolling into the black void outside the map
    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
    
  
    }

    update() {
        
        if (this.isGameFinished) return;

        this.player.setVelocity(0);

        // --- MOVEMENT & ANIMATION LOGIC ---
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
            this.player.anims.play('run-side', true);
            this.player.setFlipX(true); // Flip to look Left

        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
            this.player.anims.play('run-side', true);
            this.player.setFlipX(false); // Normal Right

        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-200);
            this.player.anims.play('run-up', true);

        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(200);
            this.player.anims.play('run-down', true);

        } else {
            // Not moving? Play Idle
            this.player.anims.play('idle-down', true);
        }

        // --- BLOCK LOGIC ---
        this.blocks.children.iterate((block) => {
            if(block.updateText) block.updateText();

            if (Phaser.Geom.Intersects.RectangleToRectangle(block.body, this.targetZone.body)) {
                if (block.value === this.correctAnswer) {
                    this.handleWin();
                } else {
                    this.handleGameOver();
                }
            }
        });

   // NPC INTERACTION LOGIC
    if (this.npc && this.currentLevelData.level === 1) {
        
        // 1. CALCULATE DISTANCE (Better than Overlap)
        // This measures straight line distance between Player and Professor
        const dist = Phaser.Math.Distance.Between(
            this.player.x, this.player.y, 
            this.npc.x, this.npc.y
        );

        // 2. CHECK RANGE (150 pixels is "Long Reach")
        if (dist < 80) {
            
            // Show the prompt
            this.interactPrompt.setPosition(this.npc.x, this.npc.y - 50);
            this.interactPrompt.setVisible(true);

            // CHECK INPUT
            if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
                
               // --- FACE THE PLAYER (Final Corrected Version) ---
                const dx = this.player.x - this.npc.x;
                const dy = this.player.y - this.npc.y;

                // 1. Reset Flip (We don't need it since you have real Left/Right frames)
                this.npc.setFlipX(false);

                if (Math.abs(dx) > Math.abs(dy)) {
                    // --- HORIZONTAL (Left / Right) ---
                    if (dx > 0) {
                        // Player is to the RIGHT (Positive)
                        this.npc.setFrame(0); // You confirmed Frame 0 is Right
                    } else {
                        // Player is to the LEFT (Negative)
                        this.npc.setFrame(2); // You confirmed Frame 2 is Left
                    }
                } else {
                    // --- VERTICAL (Up / Down) ---
                    if (dy > 0) {
                        // Player is BELOW -> NPC looks Front
                        this.npc.setFrame(3); 
                    } else {
                        // Player is ABOVE -> NPC looks Back
                        this.npc.setFrame(1); 
                    }
                
                }

                // --- TOGGLE DIALOGUE ---
                let isVisible = this.dialogBox.visible;
                this.dialogBox.setVisible(!isVisible);
                
                if (!isVisible) {
                    this.dialogBox.setText(
                        "PROF. PRIME:\n" +
                        "----------------\n" +
                        "Stop! The Stagnation is here.\n" +
                        "Use Arrow Keys to move.\n" +
                        "Push the correct Answer Block into the Yellow Zone!"
                    );
                }
            }
        } else {
            // Player is too far away
            this.dialogBox.setVisible(false);
            this.interactPrompt.setVisible(false);
        }
    }
    }

    handleWin() {
        this.isGameFinished = true;
        this.physics.pause();
        this.player.anims.stop(); // Stop animation
        this.add.text(400, 300, 'CORRECT!', { fontSize: '64px', fill: '#0f0', backgroundColor: '#000' }).setOrigin(0.5);

        this.time.delayedCall(2000, () => {
            let nextLevelIndex = this.currentLevelData.level; 
            if (nextLevelIndex < levels.length) {
                this.scene.start('GameLevel', levels[nextLevelIndex]);
            } else {
                this.scene.start('MainMenu'); 
            }
        });
    }

    handleGameOver() {
        this.isGameFinished = true;
        this.physics.pause();
        this.player.anims.stop();
        this.add.text(400, 300, 'GAME OVER', { fontSize: '64px', fill: '#f00', backgroundColor: '#000' }).setOrigin(0.5);

        this.time.delayedCall(2000, () => {
            this.scene.start('MainMenu');
        });
    }
}

// --- 4. CONFIG ---
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#222222',
    pixelArt: true,   // Tells Phaser to stop blurring/smoothing the art
    roundPixels: true, // Forces Phaser to snap to whole numbers (prevents half-pixel gaps)
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: [MainMenu, GameLevel] 
};

const game = new Phaser.Game(config);
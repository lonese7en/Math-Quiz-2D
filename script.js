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
        // Load the spritesheet. 
        // We calculated 48px because your image has 6 columns.
        this.load.tilemapTiledJSON('level1', 'assets/level1.json');
        this.load.image('dungeon_tiles', 'assets/0x72_DungeonTilesetII_v1.7.png');
        this.load.spritesheet('hero_sheet', 'assets/player.png', { 
            frameWidth: 48, 
            frameHeight: 48
        });

        this.load.image('block', 'assets/block.png');
        this.load.image('wall', 'assets/wall.png');
    }

    create() {

        const map = this.make.tilemap({ key: 'level1' });
        const tileset = map.addTilesetImage('dungeon_tiles', 'dungeon_tiles');
        const groundLayer = map.createLayer('Ground', tileset, 0, 0);
        const wallsLayer = map.createLayer('Walls', tileset, 0, 0);
        groundLayer.setScale(3);
        wallsLayer.setScale(3);

       
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
        this.player.body.setSize(14, 20);
        this.player.body.setOffset(17, 25);
        this.cursors = this.input.keyboard.createCursorKeys();

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
    physics: {
        default: 'arcade',
        arcade: { debug: true }
    },
    scene: [MainMenu, GameLevel] 
};

const game = new Phaser.Game(config);
// --- 1. SETUP CSS & CONTAINER (Fixes Desktop Sizing & Mobile Touch) ---
const gameContainer = document.createElement('div');
gameContainer.id = 'game-container';
document.body.appendChild(gameContainer);

const fontStyle = document.createElement('style');
fontStyle.innerHTML = `
    @font-face {
        font-family: 'Ithaca';
        src: url('assets/Ithaca-LVB75.ttf');
    }
    body {
        margin: 0;
        padding: 0;
        background-color: #111; /* Dark background for the webpage */
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden; /* No scrollbars */
        touch-action: none; /* CRITICAL: Stops mobile browser from scrolling */
    }
    
    #game-container {
        /* DESKTOP: Forces the game to stay at 800x600 centered */
        width: 800px;
        height: 600px;
        box-shadow: 0 0 20px rgba(0,0,0,0.5);
    }

    /* MOBILE: Overrides the fixed size to fill the phone screen */
    @media (max-width: 800px), (max-height: 600px) {
        #game-container {
            width: 100vw;
            height: 100vh;
        }
    }
`;
document.head.appendChild(fontStyle);

// --- 2. CORRECTION ROOM QUESTIONS ---
const correctionLevels = [
    { question: "Solve: 5x + 10 = 35", answer: 5, options: [5, 25, 10] },
    { question: "Simplify: x^2 * x^3", answer: "x^5", options: ["x^5", "x^6", "2x^5"] },
    { question: "Derivative of y = 5", answer: 0, options: [0, 5, 1] },
    { question: "Evaluate: 12 * 12", answer: 144, options: [144, 124, 24] },
    { question: "Solve: 3(x - 2) = 9", answer: 5, options: [5, 3, 9] }
];

// --- 3. MAIN GAME LEVELS ---
const levels = [
    // --- AREA 1 (Blue Gem) ---
    { 
        level: 1,
        question: "Evaluate limit: lim(x->2) of (x + 3)", 
        answer: 5, 
        options: [5, 6, 1], 
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [{ x: 200, y: 250 }, { x: 400, y: 250 }, { x: 600, y: 250 }],
        answerZone: { x: 694, y: 358 },
        portalPos: { x: 890, y: 392 }
    },
    { 
        level: 2,
        question: "Find derivative: y = x^4", 
        answer: "4x^3", 
        options: ["4x^3", "x^3", "4x"],
        playerStart: { x: 395, y: 648 },
        blockStart: { x: 300, y: 200 },
        blockPositions: [{ x: 466, y: 458 }, { x: 522, y: 256 }, { x: 300, y: 500 }],
        answerZone: { x: 310, y: 166 },
        portalPos: { x: 208, y: 341 }
    },
    { 
        level: 3,
        question: "Find derivative: y = 7x", 
        answer: 7, 
        options: [7, "7x", 0],
        playerStart: { x: 400, y: 300 },
        blockStart: { x: 250, y: 100 },
        blockPositions: [{ x: 562, y: 583 }, { x: 551, y: 171 }, { x: 723, y: 494 }],
        answerZone: { x: 692, y: 353 },
        portalPos: { x: 388, y: 333 }
    },
    { 
        level: 4,
        question: "Find derivative: y = x^3 + 2x^2 + 5", 
        answer: "3x^2+4x", 
        options: ["3x^2+4x", "3x^2", "2x"],
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [{ x: 200, y: 250 }, { x: 900, y: 100 }, { x: 200, y: 550 }],
        answerZone: { x: 505, y: 168 },
        portalPos: { x: 700, y: 300 }
    },
    { 
        level: 5,
        question: "Find derivative: y = 3x^4", 
        answer: "12x^3", 
        options: ["12x^3", "3x^4", "12x"],
        playerStart: { x: 620, y: 1620 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [{ x: 670, y: 1030 }, { x: 115, y: 790 }, { x: 798, y: 751 }],
        answerZone: { x: 264, y: 695 },
        portalPos: { x: 621, y: 286 },
        gatePos: { x: 578, y: 480 } 
    },
    // --- AREA 2: THE RIVER (Green Gem) ---
    { 
        level: 6,
        question: "True or False: Derivative of e^x is e^x", 
        answer: "TRUE", 
        options: ["TRUE", "FALSE"], 
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [{ x: 136, y: 189 }, { x: 128, y: 535 }], 
        answerZone: { x: 880, y: 358 },
        portalPos: { x: 259, y: 167 }
    },
    // --- AREA 3: THE CAVE (Yellow Gem) ---
    { 
        level: 12,
        question: "Find derivative: y = 7x", 
        answer: 7, 
        options: [7, "7x", 0],
        playerStart: { x: 463, y: 410 },
        blockStart: { x: 250, y: 100 },
        blockPositions: [{ x: 349, y: 568 }, { x: 420, y: 568 }, { x: 480, y: 568 }],
        answerZone: { x: 851, y: 437 },
        portalPos: { x: 500, y: 309 }
    },
    // --- AREA 4: THE LABORATORY (Orb) ---
    { 
        level: 20,
        question: "Bacteria N(t)=500e^(0.04t). Rate at t=10? (Assemble: 29.8)", 
        answer: "29.8", 
        multiAnswer: true,
        slots: [
            { x: 455, y: 146, requiredValue: "2" },
            { x: 502, y: 146, requiredValue: "9" },
            { x: 547, y: 146, requiredValue: ".8" }
        ],
        options: ["2", "9", ".8", "5", "0", "1"], 
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 100, y: 100 },
        blockPositions: [
            { x: 200, y: 200 }, { x: 300, y: 200 }, { x: 400, y: 200 },
            { x: 200, y: 350 }, { x: 300, y: 350 }, { x: 400, y: 350 }
        ],
        answerZone: { x: 0, y: 0 }, 
        portalPos: { x: 860, y: 379 }
    }
];

// --- 4. SCENES ---

class MainMenu extends Phaser.Scene {
    constructor() { super('MainMenu'); }

    preload() {
        this.load.audio('title_music', 'assets/title_bgm.mp3');
        this.load.audio('click_sfx', 'assets/click.wav');
        this.load.image('cursor', 'assets/cursor.png');
        this.load.image('menu_bg', 'assets/menu-backdrop.png'); 
        this.load.image('title_img', 'assets/title.png');
        this.load.image('btn_long', 'assets/btn-long.png');
        this.load.image('btn_pause', 'assets/btn_pause.png');
        this.load.image('btn_restart', 'assets/btn_restart.png');
    }

    create() {
        this.input.setDefaultCursor('url(assets/cursor.png), pointer');
        this.input.on('pointerup', () => { this.input.setDefaultCursor('url(assets/cursor.png), pointer'); });

        this.scrollingBg = this.add.tileSprite(400, 300, 800, 600, 'menu_bg');
        this.scrollingBg.setTileScale(0.5); 
        this.add.image(400, 150, 'title_img').setScale(0.6);

        this.sound.stopAll();
        if (!this.sound.get('title_music')) {
            this.sound.add('title_music', { loop: true, volume: 0.5 }).play();
        } else {
            this.sound.get('title_music').play();
        }

        const createButton = (x, y, text, callback, enabled = true) => {
            let container = this.add.container(x, y);
            let btn = this.add.image(0, 0, 'btn_long').setInteractive();
            btn.setScale(0.5);
            let label = this.add.text(0, 0, text, { 
                fontSize: '28px', fill: enabled ? '#ffffff' : '#888888', fontFamily: 'Ithaca',
                stroke: '#000000', strokeThickness: 4
            }).setOrigin(0.5);

            container.add([btn, label]);
            
            if (!enabled) {
                btn.setAlpha(0.5);
                btn.disableInteractive();
            } else {
                btn.on('pointerover', () => { btn.setTint(0xcccccc); });
                btn.on('pointerout', () => { btn.clearTint(); });
                btn.on('pointerdown', () => {
                    this.sound.play('click_sfx');
                    this.tweens.add({
                        targets: container, scaleX: 0.95, scaleY: 0.95, duration: 50, yoyo: true,
                        onComplete: callback
                    });
                });
            }
        };

        createButton(400, 300, 'NEW GAME', () => {
            this.sound.stopByKey('title_music');
            localStorage.setItem('lastPlayedLevel', 1); 
            this.scene.start('GameLevel', { ...levels[0], isCorrectionRoom: false }); 
        });

        const savedLevelNum = parseInt(localStorage.getItem('lastPlayedLevel')) || 1;
        const isInDetention = localStorage.getItem('isInDetention') === 'true';
        const detentionReturnLevel = parseInt(localStorage.getItem('detentionReturnLevel')) || 1;
        const canContinue = savedLevelNum > 1 || isInDetention;
        
        createButton(400, 420, 'CONTINUE', () => {
            this.sound.stopByKey('title_music');
            if (isInDetention) {
                const randomEasyQuestion = correctionLevels[Math.floor(Math.random() * correctionLevels.length)];
                this.scene.start('GameLevel', { 
                    ...randomEasyQuestion, 
                    level: "DETENTION", 
                    isCorrectionRoom: true,
                    returnToLevelNum: detentionReturnLevel 
                });
            } else {
                const levelToLoad = levels.find(l => l.level === savedLevelNum) || levels[0];
                this.scene.start('GameLevel', { ...levelToLoad, isCorrectionRoom: false }); 
            }
        }, canContinue);

        let demoText = this.add.text(780, 580, 'DEMO VERSION', { fontSize: '16px', fill: '#ff0000', fontFamily: 'monospace' }).setOrigin(1, 1);
        this.tweens.add({ targets: demoText, alpha: 0, duration: 800, yoyo: true, repeat: -1 });
    }

    update() {
        if (this.scrollingBg) {
            this.scrollingBg.tilePositionX += 0.5;
            this.scrollingBg.tilePositionY += 0.2;
        }
    }
}

// --- NEW CLASS: MOBILE CONTROLS (FIXED DETECTION) ---
class MobileControls {
    constructor(scene) {
        this.scene = scene;
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;

        // Only show mobile controls on actual mobile devices, not on desktop with resized windows
        const isMobileOS = !this.scene.sys.game.device.os.desktop;

        if (isMobileOS) {
            this.createControls();
        }
    }

    createControls() {
        this.scene.input.addPointer(2); // Enable Multi-touch

        // We use the GAME config size (800x600), not the window size
        // This ensures buttons stay in place even if the screen scales
        const gameWidth = 800; 
        const gameHeight = 600;

        // --- D-PAD CONFIG (Bottom Left) ---
        const dpadX = 110;
        const dpadY = gameHeight - 110; 
        const radius = 38;
        
        const createBtn = (x, y, rotation, propName) => {
            let btn = this.scene.add.circle(x, y, radius, 0xffffff, 0.2)
                .setScrollFactor(0) // CRITICAL: Sticks to camera
                .setDepth(9999)     // CRITICAL: Renders on top of everything
                .setInteractive();
            
            let arrow = this.scene.add.text(x, y, '➤', { fontSize: '24px', color: '#ffffff', fontStyle: 'bold' })
                .setOrigin(0.5)
                .setRotation(rotation)
                .setScrollFactor(0)
                .setDepth(10000);

            // Capture "this" correctly
            const mobileCtrl = this; 
            
            const press = () => { 
                mobileCtrl[propName] = true; 
                btn.setFillStyle(0xffffff, 0.5); 
            };
            const release = () => { 
                mobileCtrl[propName] = false; 
                btn.setFillStyle(0xffffff, 0.2);
            };

            btn.on('pointerdown', press);
            // "pointerover" allows you to slide your thumb onto the button
            btn.on('pointerover', (pointer) => { if (pointer.isDown) press(); });
            btn.on('pointerup', release);
            btn.on('pointerout', release);
        };

        createBtn(dpadX, dpadY - 65, -Math.PI / 2, 'up');    // UP
        createBtn(dpadX, dpadY + 65, Math.PI / 2, 'down');   // DOWN
        createBtn(dpadX - 65, dpadY, Math.PI, 'left');       // LEFT
        createBtn(dpadX + 65, dpadY, 0, 'right');            // RIGHT

        // --- ACTION BUTTON (Bottom Right) ---
        const actionX = gameWidth - 100;
        const actionY = gameHeight - 110;

        let actionBtn = this.scene.add.circle(actionX, actionY, 45, 0xffff00, 0.3)
            .setScrollFactor(0)
            .setDepth(9999)
            .setInteractive();

        let actionText = this.scene.add.text(actionX, actionY, 'E', { 
            fontSize: '32px', fontFamily: 'Ithaca', color: '#ffffff', fontStyle: 'bold' 
        }).setOrigin(0.5).setScrollFactor(0).setDepth(10000);

        const pressAction = () => {
            actionBtn.setFillStyle(0xffff00, 0.6);
            if (this.scene.handleInteraction) this.scene.handleInteraction();
        };
        const releaseAction = () => { actionBtn.setFillStyle(0xffff00, 0.3); };

        actionBtn.on('pointerdown', pressAction);
        actionBtn.on('pointerover', (pointer) => { if (pointer.isDown) pressAction(); });
        actionBtn.on('pointerup', releaseAction);
        actionBtn.on('pointerout', releaseAction);
    }
}

class GameLevel extends Phaser.Scene {
    constructor() { super('GameLevel'); }

    init(data) {
        this.currentLevelData = data;
        this.correctAnswer = data.answer;
        this.isGameFinished = false;
        this.isLevelComplete = false;
        this.isCorrectionRoom = data.isCorrectionRoom || false;
        this.returnToLevelNum = data.returnToLevelNum !== undefined ? data.returnToLevelNum : 1;
        this.isMultiSlot = data.multiAnswer || false;
        this.footstepTimer = 0;
        this.currentBGMKey = null; 
    }

    preload() {
        this.load.spritesheet('floor_items', 'assets/atlas_floor-16x16.png', { frameWidth: 16, frameHeight: 16 });
        this.load.image('sunny_tiles_extruded', 'assets/sunny_tiles_extruded.png');
        this.load.spritesheet('portal', 'assets/Dimensional_Portal.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('gate_locked', 'assets/gate_locked.png');
        this.load.image('gate_open', 'assets/gate_open.png');
        this.load.image('dialog_bg', 'assets/dialog_box.png');
        this.load.spritesheet('hero_sheet', 'assets/player.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('wall', 'assets/wall.png');
        this.load.spritesheet('professor', 'assets/doctor.png', { frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('sunny_tiles_png', 'assets/spr_tileset_sunnysideworld_16px.png', { frameWidth: 16, frameHeight: 16, margin: 1, spacing: 2 });
        this.load.spritesheet('gem_blue', 'assets/spr_coin_azu.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('gem_green', 'assets/spr_coin_strip4.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('gem_yellow', 'assets/spr_coin_ama.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('orb', 'assets/orb_spritesheet.png', { frameWidth: 16, frameHeight: 16 }); 
        this.load.spritesheet('lab_portal', 'assets/portal_spritesheet.png', { frameWidth: 16, frameHeight: 16 }); 
        this.load.image('btn_pause', 'assets/btn_pause.png');
        this.load.image('btn_restart', 'assets/btn_restart.png');
        this.load.image('dungeon_tiles', 'assets/0x72_DungeonTilesetII_v1.7.png');
        this.load.image('dungeon_walls', 'assets/atlas_walls_low-16x16.png');
        this.load.image('laboratory_tiles', 'assets/tilesFloor.png');
        this.load.image('laboratory_walls', 'assets/tilesWalls.png');
        this.load.audio('game_bgm', 'assets/game_bgm.mp3');
        this.load.audio('river_bgm', 'assets/river.mp3');
        this.load.audio('cave_bgm', 'assets/cave.mp3');
        this.load.audio('lab_bgm', 'assets/laboratory.mp3');
        this.load.audio('correction_bgm', 'assets/correction.mp3');
        this.load.audio('footstep_sfx', 'assets/footstep.mp3');
        this.load.audio('talking_sfx', 'assets/talking.mp3');
        this.load.audio('click_sfx', 'assets/click.wav');
        this.load.audio('snap_sfx', 'assets/Retro10.wav'); 
        this.load.audio('victory_sfx', 'assets/victory.mp3');
        this.load.audio('gameover_sfx', 'assets/game-over.mp3');

        for (let i of [1, 2, 3, 4, 5, 6, 12, 20]) {
             this.load.tilemapTiledJSON(`level${i}`, `assets/level${i}.json`);
        }
        this.load.tilemapTiledJSON('correction_room', 'assets/correction_room.json');
    }

    create() {
        this.input.setDefaultCursor('url(assets/cursor.png), pointer');
        this.input.on('pointerup', () => { this.input.setDefaultCursor('url(assets/cursor.png), pointer'); });

        if (!this.isCorrectionRoom) {
            localStorage.setItem('lastPlayedLevel', this.currentLevelData.level);
        }

        this.cameras.main.fadeFrom(500, 0, 0, 0, false);

        let currentLvl = this.currentLevelData.level;
        let targetMusicKey = 'game_bgm'; 

        if (this.isCorrectionRoom) {
            targetMusicKey = 'correction_bgm';
        } else if (currentLvl >= 19) {
            targetMusicKey = 'lab_bgm';
        } else if (currentLvl >= 12) {
            targetMusicKey = 'cave_bgm';
        } else if (currentLvl >= 6) {
            targetMusicKey = 'river_bgm';
        }

        let playingBGM = this.sound.getAll().find(s => s.isPlaying && s.key.includes('bgm'));
        
        if (!playingBGM || playingBGM.key !== targetMusicKey) {
            if (playingBGM) {
                playingBGM.stop();
            }
            let targetSound = this.sound.get(targetMusicKey);
            if (!targetSound) {
                targetSound = this.sound.add(targetMusicKey, { loop: true, volume: 0.4 });
            }
            targetSound.play();
        }

        let demoText = this.add.text(780, 580, 'DEMO VERSION', { fontSize: '16px', fill: '#ff0000', fontFamily: 'monospace' })
            .setOrigin(1, 1).setScrollFactor(0).setDepth(1000);
        this.tweens.add({ targets: demoText, alpha: 0, duration: 800, yoyo: true, repeat: -1 });

        let mapKey;
        if (this.isCorrectionRoom) {
            mapKey = 'correction_room';
        } else {
            mapKey = `level${this.currentLevelData.level}`;
            if (!this.cache.tilemap.exists(mapKey)) mapKey = 'level1';
        }

        const map = this.make.tilemap({ key: mapKey });
        const sunnyTiles = map.addTilesetImage('sunny_world', 'sunny_tiles_extruded', 16, 16, 1, 2);
        const dungeonTiles = map.addTilesetImage('dungeon_tiles', 'dungeon_tiles');
        const dungeonWalls = map.addTilesetImage('dungeon_walls', 'dungeon_walls');
        const labFloor = map.addTilesetImage('tilesFloor', 'laboratory_tiles') || map.addTilesetImage('laboratory_tiles', 'laboratory_tiles');
        const labWalls = map.addTilesetImage('tilesWalls', 'laboratory_walls') || map.addTilesetImage('laboratory_walls', 'laboratory_walls');
        const allTiles = [sunnyTiles, dungeonTiles, dungeonWalls, labFloor, labWalls].filter(t => t !== null);

        const bridgesLayer = map.createLayer('Bridge', allTiles, 0, 0) || map.createLayer('around', allTiles, 0, 0);
        const groundLayer = map.createLayer('Ground', allTiles, 0, 0);
        const decorLayer = map.createLayer('Decoration', allTiles, 0, 0);
        const wallsLayer = map.createLayer('Walls', allTiles, 0, 0);

        if (bridgesLayer) { bridgesLayer.setScale(3); bridgesLayer.setDepth(5); }
        if (groundLayer) groundLayer.setScale(3);
        if (decorLayer) decorLayer.setScale(3);
        if (wallsLayer) { wallsLayer.setScale(3); wallsLayer.setCollisionByExclusion([-1]); }

        if (!this.anims.exists('idle-down')) {
            this.anims.create({ key: 'idle-down', frames: this.anims.generateFrameNumbers('hero_sheet', { start: 0, end: 5 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'run-down', frames: this.anims.generateFrameNumbers('hero_sheet', { start: 18, end: 23 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: 'run-side', frames: this.anims.generateFrameNumbers('hero_sheet', { start: 24, end: 29 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: 'run-up', frames: this.anims.generateFrameNumbers('hero_sheet', { start: 30, end: 35 }), frameRate: 10, repeat: -1 });
        }
        
        if (!this.anims.exists('orb-spin')) { this.anims.create({ key: 'orb-spin', frames: this.anims.generateFrameNumbers('orb', { start: 0, end: 7 }), frameRate: 10, repeat: -1 }); }
        if (!this.anims.exists('lab-portal-idle')) { this.anims.create({ key: 'lab-portal-idle', frames: this.anims.generateFrameNumbers('lab_portal', { start: 0, end: 5 }), frameRate: 10, repeat: -1 }); }
        if (!this.anims.exists('gem-blue-spin')) { this.anims.create({ key: 'gem-blue-spin', frames: this.anims.generateFrameNumbers('gem_blue', { start: 0, end: 3 }), frameRate: 8, repeat: -1 }); }
        if (!this.anims.exists('gem-green-spin')) { this.anims.create({ key: 'gem-green-spin', frames: this.anims.generateFrameNumbers('gem_green', { start: 0, end: 3 }), frameRate: 8, repeat: -1 }); }
        if (!this.anims.exists('gem-yellow-spin')) { this.anims.create({ key: 'gem-yellow-spin', frames: this.anims.generateFrameNumbers('gem_yellow', { start: 0, end: 3 }), frameRate: 8, repeat: -1 }); }

        let startX = this.isCorrectionRoom ? 400 : this.currentLevelData.playerStart.x;
        let startY = this.isCorrectionRoom ? 300 : this.currentLevelData.playerStart.y;

        this.player = this.physics.add.sprite(startX, startY, 'hero_sheet');
        this.player.play('idle-down'); 
        this.player.setScale(3);
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(10, 5);
        this.player.body.setOffset(20, 35);
        this.player.setDepth(50);
        this.cursors = this.input.keyboard.createCursorKeys();

        if (!this.isCorrectionRoom && this.currentLevelData.level === 1) {
            this.npc = this.physics.add.sprite(this.player.x + 100, this.player.y, 'professor');
            this.npc.setScale(3).setFrame(3).setImmovable(true).setDepth(20);
            this.npc.body.setSize(13, 25);
            this.npc.body.setOffset(2,8);
            this.npc.body.setAllowGravity(false);
            this.physics.add.collider(this.player, this.npc);
            
            this.npcMarker = this.add.text(this.npc.x, this.npc.y - 50, '!', {
                fontSize: '32px', fontFamily: 'Ithaca', fill: '#ffff00', stroke: '#000', strokeThickness: 4
            }).setOrigin(0.5).setDepth(60);
            this.tweens.add({ targets: this.npcMarker, y: this.npc.y - 60, duration: 500, yoyo: true, repeat: -1 });
        }

        this.stoneGates = this.physics.add.group({ immovable: true, allowGravity: false }); 
        if (!this.isCorrectionRoom && this.currentLevelData.gatePos) {
            let g = this.stoneGates.create(this.currentLevelData.gatePos.x, this.currentLevelData.gatePos.y, 'gate_locked');
            g.setScale(3).setOrigin(0, 0).setDepth(40).setVisible(true);
        }
        this.physics.add.collider(this.player, this.stoneGates);

        this.keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.debugEnabled = false;
        this.setupUI(); 

        this.answerSlots = []; 
        if (this.isMultiSlot) {
            this.currentLevelData.slots.forEach((slotData, index) => {
                let textureKey = (this.currentLevelData.level >= 19) ? 'lab_portal' : 'floor_items';
                let plate = this.physics.add.sprite(slotData.x, slotData.y, textureKey);
                if (this.currentLevelData.level >= 19) plate.play('lab_portal-idle'); else plate.setFrame(30);
                plate.setScale(3).setImmovable(true).setDepth(5); 
                plate.body.setSize(10, 10).setOffset(3, 3);
                plate.requiredValue = slotData.requiredValue; 
                this.add.text(slotData.x, slotData.y - 40, `Part ${index + 1}`, { fontSize: '16px', fontFamily: 'Ithaca', fill: '#ffff00' }).setOrigin(0.5);
                this.answerSlots.push(plate);
            });
        } else {
            let ansX = this.isCorrectionRoom ? 600 : this.currentLevelData.answerZone.x;
            let ansY = this.isCorrectionRoom ? 400 : this.currentLevelData.answerZone.y;
            this.pressurePlate = this.physics.add.sprite(ansX, ansY, 'floor_items');
            this.pressurePlate.setScale(3).setFrame(30).setImmovable(true).setDepth(5);
            this.pressurePlate.body.setSize(10, 10).setOffset(3, 3);
            this.answerSlots.push(this.pressurePlate); 
        }

        this.blocks = this.physics.add.group();
        this.createBlocks();

        this.physics.add.collider(this.player, this.blocks);
        this.physics.add.collider(this.blocks, this.blocks);
        if (wallsLayer) {
            this.physics.add.collider(this.player, wallsLayer);
            this.physics.add.collider(this.blocks, wallsLayer);
        }
        this.physics.add.collider(this.blocks, this.stoneGates);

        const mapWidth = map.widthInPixels * 3;
        const mapHeight = map.heightInPixels * 3;
        this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);

        if (!this.anims.exists('portal-spin')) {
            this.anims.create({ key: 'portal-spin', frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 5 }), frameRate: 10, repeat: -1 });
        }
        
        let pX = this.isCorrectionRoom ? 600 : this.currentLevelData.portalPos.x;
        let pY = this.isCorrectionRoom ? 200 : this.currentLevelData.portalPos.y;

        this.portal = this.physics.add.sprite(pX, pY, 'portal').setScale(3).setVisible(false);
        this.portal.body.enable = false;
        this.portal.body.setSize(10, 10); 
        this.portal.body.setOffset(11, 11); 
        this.physics.add.overlap(this.player, this.portal, () => { if (this.portal.visible) this.handleWin(); });

        this.cliffEdges = this.physics.add.staticGroup();
        const cliffObjs = map.getObjectLayer('CliffEdges')?.objects || [];
        cliffObjs.forEach(obj => {
            let edge = this.cliffEdges.create(obj.x * 3, obj.y * 3, null).setOrigin(0, 0);
            edge.setSize(obj.width * 3, obj.height * 3).setVisible(false);
            const tx = obj.properties?.find(p => p.name === 'landX')?.value || 0;
            const ty = obj.properties?.find(p => p.name === 'landY')?.value || 0;
            edge.landX = tx * 3; edge.landY = ty * 3;
        });
        this.physics.add.overlap(this.blocks, this.cliffEdges, (block, edge) => {
             if (edge.landX !== undefined) this.handleBlockDrop(block, edge.landX, edge.landY);
        }, null, this);

        // --- INIT MOBILE CONTROLS ---
        this.mobileControls = new MobileControls(this);
    }

    createBlocks() {
        let xPos = this.isCorrectionRoom ? 200 : this.currentLevelData.blockStart.x;
        let yPos = this.isCorrectionRoom ? 100 : this.currentLevelData.blockStart.y;
        let lvl = this.currentLevelData.level;
        
        let spriteKey = 'gem_blue';
        let animKey = 'gem-blue-spin';

        if (this.isCorrectionRoom) {
            spriteKey = 'gem_blue'; animKey = 'gem-blue-spin';
        } else if (lvl >= 19) {
            spriteKey = 'orb'; animKey = 'orb-spin';
        } else if (lvl >= 12) {
            spriteKey = 'gem_yellow'; animKey = 'gem-yellow-spin';
        } else if (lvl >= 6) {
            spriteKey = 'gem_green'; animKey = 'gem-green-spin';
        }

        this.currentLevelData.options.forEach((val, index) => {
            let blockPos;
            if (this.isCorrectionRoom) {
                blockPos = { x: xPos, y: yPos + (index * 50) };
            } else {
                 blockPos = (this.currentLevelData.blockPositions && this.currentLevelData.blockPositions[index]) 
                           ? this.currentLevelData.blockPositions[index] 
                           : { x: xPos, y: yPos + (index * 150) };
            }

            let block = this.blocks.create(blockPos.x, blockPos.y, spriteKey).setScale(3);
            if (animKey) block.play(animKey);

            block.setDrag(1000).setBounce(1).setCollideWorldBounds(true);
            block.setDepth(30); 
            block.body.setSize(10, 15).setOffset(3, 1);
            block.value = val;
            
            let text = this.add.text(0, 0, val, { fontSize: '24px', color: '#ffffff', stroke: '#000', strokeThickness: 4, fontFamily: 'Ithaca', fontStyle: 'bold' }).setOrigin(0.5);
            text.setDepth(30); 
            block.myText = text;
            block.updateText = function() { text.x = this.x; text.y = this.y; };
            yPos += 150;
        });
    }

    setupUI() {
        let restartBtn = this.add.image(40, 40, 'btn_restart').setInteractive().setScale(0.21).setScrollFactor(0);
        restartBtn.on('pointerdown', () => { 
            this.sound.play('click_sfx');
            this.physics.pause(); this.scene.restart(); 
        });
        this.input.keyboard.on('keydown-R', () => { this.physics.pause(); this.scene.restart(); });

        let pauseBtn = this.add.image(100, 40, 'btn_pause').setInteractive().setScale(0.21).setScrollFactor(0).setDepth(100);
        
        this.pauseMenuContainer = this.add.container(0, 0).setScrollFactor(0).setDepth(300).setVisible(false);
        
        let overlay = this.add.rectangle(400, 300, 800, 600, 0x000000, 0.7).setOrigin(0.5);
        overlay.setScrollFactor(0);
        overlay.setDepth(300);
        this.pauseMenuContainer.add(overlay);
        
        let pauseTitle = this.add.text(400, 100, 'PAUSED', { 
            fontSize: '48px', fontFamily: 'Ithaca', fill: '#ffffff', stroke: '#000', strokeThickness: 4 
        }).setOrigin(0.5);
        pauseTitle.setScrollFactor(0);
        pauseTitle.setDepth(310);
        this.pauseMenuContainer.add(pauseTitle);
        
        const createPauseButton = (screenY, text, callback) => {
            let btn = this.add.image(400, screenY, 'btn_long');
            btn.setScale(0.35);
            btn.setOrigin(0.5);
            btn.setInteractive();
            btn.setScrollFactor(0);
            btn.setDepth(310);
            
            let label = this.add.text(400, screenY, text, { 
                fontSize: '20px', fill: '#ffffff', fontFamily: 'Ithaca',
                stroke: '#000000', strokeThickness: 3
            });
            label.setOrigin(0.5);
            label.setScrollFactor(0);
            label.setDepth(311);
            
            btn.on('pointerover', () => { btn.setTint(0xcccccc); });
            btn.on('pointerout', () => { btn.clearTint(); });
            btn.on('pointerdown', () => {
                this.sound.play('click_sfx');
                callback();
            });
            
            this.pauseMenuContainer.add(btn);
            this.pauseMenuContainer.add(label);
        };
        
        createPauseButton(170, 'RESUME', () => {
            this.physics.resume();
            this.pauseMenuContainer.setVisible(false);
            pauseBtn.setTint(0xffffff);
        });
        
        createPauseButton(260, 'RESTART LEVEL', () => {
            this.pauseMenuContainer.setVisible(false);
            this.scene.restart();
        });
        
        createPauseButton(350, 'RESTART GAME', () => {
            this.pauseMenuContainer.setVisible(false);
            localStorage.setItem('lastPlayedLevel', 1);
            this.scene.start('GameLevel', { ...levels[0], isCorrectionRoom: false });
        });
        
        createPauseButton(440, 'BACK TO MENU', () => {
            this.pauseMenuContainer.setVisible(false);
            this.scene.start('MainMenu');
        });

        pauseBtn.on('pointerdown', () => {
            this.sound.play('click_sfx');
            if (this.physics.world.isPaused) { 
                this.physics.resume(); 
                this.pauseMenuContainer.setVisible(false);
                pauseBtn.setTint(0xffffff); 
            } else { 
                this.physics.pause(); 
                this.pauseMenuContainer.setVisible(true);
                pauseBtn.setTint(0x888888); 
            }
        });
        
        this.input.keyboard.on('keydown-ESC', () => {
            this.sound.play('click_sfx');
            if (this.physics.world.isPaused) { 
                this.physics.resume(); 
                this.pauseMenuContainer.setVisible(false);
                pauseBtn.setTint(0xffffff);
            } else { 
                this.physics.pause(); 
                this.pauseMenuContainer.setVisible(true);
                pauseBtn.setTint(0x888888);
            }
        });

        this.dialogContainer = this.add.container(400, 50).setScrollFactor(0).setDepth(200).setVisible(false);
        this.dialogContainer.add(this.add.nineslice(0, 0, 'dialog_bg', 0, 700, 150, 10, 10, 10, 10));
        this.dialogText = this.add.text(0, 0, '', { fontSize: '20px', fontFamily: 'Ithaca', color: '#4a3d2e', wordWrap: { width: 650 }, align: 'center' }).setOrigin(0.5);
        this.dialogContainer.add(this.dialogText);
        
        this.interactPrompt = this.add.text(0, 0, 'Press E to talk', { fontSize: '20px', fontFamily: 'Ithaca', backgroundColor: '#000' }).setOrigin(0.5).setDepth(101).setVisible(false);
        
        let levelTitle = this.isCorrectionRoom ? "CORRECTION ROOM" : `Level ${this.currentLevelData.level}`;
        const qContainer = this.add.container(400, 40).setScrollFactor(0).setDepth(100);
        qContainer.add(this.add.nineslice(0, 0, 'dialog_bg', 0, 500, 60, 10, 10, 10, 10));
        qContainer.add(this.add.text(0, 0, `${levelTitle}: ${this.currentLevelData.question}`, { fontSize: '28px', fontFamily: 'Ithaca', fill: '#4a3d2e', wordWrap: { width: 480 }, align: 'center' }).setOrigin(0.5));
    }

    handleInteraction() {
        if (this.npc && !this.isCorrectionRoom && this.currentLevelData.level === 1) {
            const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.npc.x, this.npc.y);
            if (dist < 80) {
                this.showDialogue("PROF. PRIME:\n----------------\nHurry! Use Arrow Keys to move.\nPush the correct Answer Gem into the Platform!");
            }
        }
    }

    update(time, delta) {
        if (this.isGameFinished || this.isLevelComplete) return; 

        // --- INTERACTION ---
        if (Phaser.Input.Keyboard.JustDown(this.keyE)) { this.handleInteraction(); }
        
        if (Phaser.Input.Keyboard.JustDown(this.keyN)) { this.handleWin(); }
        if (Phaser.Input.Keyboard.JustDown(this.keyD)) { 
            this.debugEnabled = !this.debugEnabled;
            if (!this.debugEnabled && this.debugText) {
                this.debugText.destroy();
                this.debugText = null;
            }
        }

        this.player.setVelocity(0);
        let moving = false;
        
        // --- MOVEMENT LOGIC (KEYBOARD OR MOBILE) ---
        const left = this.cursors.left.isDown || (this.mobileControls && this.mobileControls.left);
        const right = this.cursors.right.isDown || (this.mobileControls && this.mobileControls.right);
        const up = this.cursors.up.isDown || (this.mobileControls && this.mobileControls.up);
        const down = this.cursors.down.isDown || (this.mobileControls && this.mobileControls.down);

        if (left) {
            this.player.setVelocityX(-200); this.player.anims.play('run-side', true); this.player.setFlipX(true); moving = true;
        } else if (right) {
            this.player.setVelocityX(200); this.player.anims.play('run-side', true); this.player.setFlipX(false); moving = true;
        } else if (up) {
            this.player.setVelocityY(-200); this.player.anims.play('run-up', true); moving = true;
        } else if (down) {
            this.player.setVelocityY(200); this.player.anims.play('run-down', true); moving = true;
        } else {
            this.player.anims.play('idle-down', true);
        }

        if (moving) {
            this.footstepTimer += delta;
            if (this.footstepTimer > 350) { 
                this.sound.play('footstep_sfx', { volume: 0.3 });
                this.footstepTimer = 0;
            }
        } else {
            this.footstepTimer = 350; 
        }

        this.blocks.getChildren().forEach((block) => {
            if (!block.active) return;
            if (block.updateText) block.updateText();
            
            if (!block.isLocked) {
                this.answerSlots.forEach((plate) => {
                    if (Phaser.Math.Distance.Between(block.x, block.y, plate.x, plate.y) < 25) {
                        
                        let requiredVal = this.isMultiSlot ? plate.requiredValue : this.correctAnswer;
                        
                        if (block.value == requiredVal) {
                            block.x = plate.x;
                            block.y = plate.y;
                            block.body.setVelocity(0,0);
                            block.isLocked = true;
                            block.body.enable = false; 
                            
                            this.sound.play('snap_sfx'); 

                            if (plate.texture.key === 'floor_items') {
                                plate.setFrame(31); 
                            }
                            
                            if (this.isMultiSlot) {
                                let correctLockedCount = this.blocks.getChildren().filter(b => b.isLocked).length;
                                if (correctLockedCount === this.answerSlots.length) {
                                    this.activatePortal();
                                }
                            } else {
                                this.activatePortal();
                                if (block.myText) block.myText.destroy();
                                block.destroy(); 
                            }
                            
                        } else {
                            this.handleGameOver();
                        }
                    }
                });
            }
        });

        if (this.npc && !this.isCorrectionRoom && this.currentLevelData.level === 1) {
            const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.npc.x, this.npc.y);
            if (dist < 80) {
                if (this.player.x < this.npc.x) {
                    this.npc.setFlipX(true); 
                } else {
                    this.npc.setFlipX(false); 
                }

                this.interactPrompt.setPosition(this.npc.x, this.npc.y - 50).setVisible(true);
                if (this.npcMarker) this.npcMarker.setVisible(false);
            } else {
                this.interactPrompt.setVisible(false);
                if (this.npcMarker) this.npcMarker.setVisible(true);
                this.hideDialogue();
            }
        }

        if (this.debugEnabled) {
            const mouseX = this.input.mousePointer.worldX;
            const mouseY = this.input.mousePointer.worldY;
            const playerX = this.player.x;
            const playerY = this.player.y;
            
            if (!this.debugText) {
                this.debugText = this.add.text(0, 0, '', { fontSize: '16px', fontFamily: 'monospace', fill: '#00ff00', backgroundColor: '#000000', padding: { x: 10, y: 10 } }).setOrigin(0).setScrollFactor(0).setDepth(500);
            }
            this.debugText.setText(`Player: (${Math.round(playerX)}, ${Math.round(playerY)})\nMouse: (${Math.round(mouseX)}, ${Math.round(mouseY)})`);
            this.debugText.setPosition(10, 70);
        }
    }

    handleBlockDrop(block, destX, destY) {
        if (block.isFalling) return;
        block.isFalling = true;
        block.body.setVelocity(0, 0); block.body.enable = false;
        this.tweens.add({ targets: block, x: destX, y: destY, scaleX: { from: 4, to: 3 }, scaleY: { from: 4, to: 3 }, duration: 600, ease: 'Cubic.easeOut', onComplete: () => { block.body.enable = true; block.isFalling = false; } });
        this.tweens.add({ targets: block.myText, x: destX, y: destY, duration: 600, ease: 'Cubic.easeOut' });
    }

    activatePortal() {
        if (this.portal.visible) return;
        
        this.portal.setVisible(true); 
        this.portal.body.enable = true; 
        this.portal.play('portal-spin');
        
        this.stoneGates.children.iterate((gate) => { 
            if (gate) { 
                gate.setTexture('gate_open'); 
                gate.body.enable = false; 
            } 
        });
        
        this.add.text(400, 300, "GATE OPENED!", { fontSize: '32px', fontFamily: 'Ithaca', color: '#00ff00', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5).destroy({ fromScene: true, delay: 2000 });
    }

    handleWin() {
        this.isGameFinished = true;
        this.isLevelComplete = true;
        
        this.physics.pause();
        this.player.anims.stop();
        this.player.body.setVelocity(0); 
        this.sound.play('victory_sfx');
        
        let msg = this.isCorrectionRoom ? "DETENTION PASSED!" : `LEVEL ${this.currentLevelData.level}\nCOMPLETE!`;
        let color = this.isCorrectionRoom ? '#00ff00' : '#ffff00';

        const completeText = this.add.text(400, 250, msg, { fontSize: '64px', fill: color, backgroundColor: '#000', fontFamily: 'Ithaca', align: 'center' }).setOrigin(0.5).setScrollFactor(0).setDepth(300);
        this.tweens.add({ targets: completeText, scale: 1.2, duration: 500, yoyo: true, hold: 1000 });
        
        this.time.delayedCall(3000, () => {
            this.cameras.main.fade(500, 0, 0, 0);
            this.time.delayedCall(600, () => {
                if (this.isCorrectionRoom) {
                    localStorage.setItem('isInDetention', 'false');
                    localStorage.removeItem('detentionReturnLevel');
                    const levelToRetry = levels.find(l => l.level === this.returnToLevelNum);
                    if (levelToRetry) {
                        this.scene.start('GameLevel', { ...levelToRetry, isCorrectionRoom: false });
                    } else {
                        this.scene.start('MainMenu'); 
                    }
                } else {
                    if (this.currentLevelData.level === 20) {
                        this.scene.start('GameWon');
                    } else {
                        let nextLevelNum;
                        if (this.currentLevelData.level === 6) nextLevelNum = 12;
                        else if (this.currentLevelData.level === 12) nextLevelNum = 20;
                        else nextLevelNum = this.currentLevelData.level + 1;

                        const nextLevelData = levels.find(l => l.level === nextLevelNum);
                        if (nextLevelData) { 
                            this.scene.start('GameLevel', { ...nextLevelData, isCorrectionRoom: false }); 
                        } else { 
                            this.scene.start('MainMenu'); 
                        }
                    }
                }
            });
        });
    }

    handleGameOver() {
        this.isGameFinished = true;
        this.physics.pause();
        this.player.anims.stop();
        this.sound.play('gameover_sfx');

        if (this.isCorrectionRoom) {
            this.add.text(400, 300, 'EXPELLED!\n(GAME OVER)', { fontSize: '64px', fill: '#f00', backgroundColor: '#000', fontFamily: 'Ithaca', align: 'center' }).setOrigin(0.5).setScrollFactor(0).setDepth(300);
            this.time.delayedCall(3000, () => { 
                localStorage.setItem('lastPlayedLevel', 1);
                localStorage.setItem('isInDetention', 'false');
                localStorage.removeItem('detentionReturnLevel');
                this.scene.start('MainMenu'); 
            });
        } else {
            this.add.text(400, 300, 'WRONG ANSWER!\nTO DETENTION!', { fontSize: '48px', fill: '#ff6600', backgroundColor: '#000', fontFamily: 'Ithaca', align: 'center' }).setOrigin(0.5).setScrollFactor(0).setDepth(300);
            const myLevelNum = this.currentLevelData.level;
            this.time.delayedCall(2000, () => {
                this.cameras.main.fade(500, 0, 0, 0);
                this.time.delayedCall(600, () => {
                    localStorage.setItem('isInDetention', 'true');
                    localStorage.setItem('detentionReturnLevel', myLevelNum);
                    const randomEasyQuestion = correctionLevels[Math.floor(Math.random() * correctionLevels.length)];
                    this.scene.start('GameLevel', { 
                        ...randomEasyQuestion, 
                        level: "DETENTION", 
                        isCorrectionRoom: true,
                        returnToLevelNum: myLevelNum 
                    });
                });
            });
        }
    }

    showDialogue(fullText) {
        if (this.dialogContainer.y > 0) return;
        this.dialogContainer.setVisible(true);
        
        if (!this.talkSound || !this.talkSound.isPlaying) {
            this.talkSound = this.sound.add('talking_sfx', { volume: 0.5, loop: true });
            this.talkSound.play();
        }

        this.tweens.add({ targets: this.dialogContainer, y: 50, duration: 500, ease: 'Power2.out' });
        this.dialogText.setText('');
        let i = 0;
        if (this.typingTimer) this.typingTimer.remove();
        
        this.typingTimer = this.time.addEvent({ 
            delay: 30, 
            callback: () => { 
                this.dialogText.text += fullText[i]; 
                i++;
                if (i >= fullText.length) {
                    if (this.talkSound) this.talkSound.stop(); 
                }
            }, 
            repeat: fullText.length - 1 
        });
    }

    hideDialogue() {
        if (this.dialogContainer.y < 0) return;
        if (this.talkSound) this.talkSound.stop();
        if (this.typingTimer) this.typingTimer.remove();
        this.tweens.add({ targets: this.dialogContainer, y: -200, duration: 300, ease: 'Power2.in', onComplete: () => { this.dialogContainer.setVisible(false); this.dialogText.setText(''); } });
    }
}

class GameWon extends Phaser.Scene {
    constructor() { super('GameWon'); }

    create() {
        this.sound.play('victory_sfx'); 

        this.add.text(400, 200, 'CONGRATULATIONS!', { fontSize: '48px', fill: '#ffff00', fontFamily: 'Ithaca' }).setOrigin(0.5);
        this.add.text(400, 280, 'YOU HAVE MASTERED THE LABYRINTH!', { fontSize: '32px', fill: '#00ff00', fontFamily: 'Ithaca' }).setOrigin(0.5);
        this.add.text(400, 380, 'All Demo Levels Complete!', { fontSize: '24px', fill: '#ffffff', fontFamily: 'Ithaca' }).setOrigin(0.5);
        
        let returnBtn = this.add.text(400, 480, 'RETURN TO MENU', { fontSize: '20px', fill: '#0ff', fontFamily: 'Ithaca' }).setOrigin(0.5).setInteractive();

        returnBtn.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}

const config = {
    type: Phaser.AUTO,
    // IMPORTANT: Attach the game to our custom container
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    backgroundColor: '#222222',
    pixelArt: true,
    roundPixels: true,
    physics: { default: 'arcade', arcade: { debug: false } }, 
    scene: [MainMenu, GameLevel, GameWon] 
};

const game = new Phaser.Game(config);
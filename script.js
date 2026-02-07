
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
        background-color: #111;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        touch-action: none;
    }
    
    #game-container {
       
        width: 800px;
        height: 600px;
        box-shadow: 0 0 20px rgba(0,0,0,0.5);
    }

   
    @media (max-width: 800px), (max-height: 600px) {
        #game-container {
            width: 100vw;
            height: 100vh;
        }
    }
`;
document.head.appendChild(fontStyle);


const correctionLevels = [
    { question: "Solve: 5x + 10 = 35", answer: 5, options: [5, 25, 10] },
    { question: "Simplify: x^2 * x^3", answer: "x^5", options: ["x^5", "x^6", "2x^5"] },
    { question: "Derivative of y = 5", answer: 0, options: [0, 5, 1] },
    { question: "Evaluate: 12 * 12", answer: 144, options: [144, 124, 24] },
    { question: "Solve: 3(x - 2) = 9", answer: 5, options: [5, 3, 9] }
];


const levels = [
    
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
        options: ["12x^3", "3x^4", "12x", "4x^3"], 
        playerStart: { x: 620, y: 1620 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [{ x: 670, y: 1030 }, { x: 115, y: 790 }, { x: 798, y: 751 }, { x: 500, y: 900 }],
        answerZone: { x: 264, y: 695 },
        portalPos: { x: 621, y: 286 },
        gatePos: { x: 578, y: 480 } 
    },
    
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
    { 
        level: 7,
        question: "Find derivative: y = ln(x)", 
        answer: "1/x", 
        options: ["1/x", "ln(x)", "e^x", "x"], 
        playerStart: { x: 117, y: 400 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [{ x: 189, y: 360 }, { x: 93, y: 294 }, { x: 665, y: 125 }, { x: 841, y: 395 }], 
        answerZone: { x: 594, y: 666 },
        portalPos: { x: 864, y: 666 }
    },
    { 
        level: 8,
        question: "Find derivative: y = e^(2x)", 
        answer: "2e^(2x)", 
        options: ["2e^(2x)", "e^(2x)", "2x", "e^x"], 
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [{ x: 200, y: 600 }, { x: 300, y: 600 }, { x: 400, y: 600 }, { x: 500, y: 600 }],
        answerZone: { x: 790, y: 574 },
        portalPos: { x: 528, y: 90 }
    },
    { 
        level: 9,
        question: "Find derivative: y = ln(4x)", 
        answer: "1/x", 
        options: ["1/x", "4/x", "4", "ln(4)"], 
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [{ x: 798, y: 157 }, { x: 791, y: 287 }, { x: 409, y: 387 }, { x: 405, y: 580 }],
        answerZone: { x: 69, y: 337 },
        portalPos: { x: 421, y: 290 }
    },
    { 
        level: 10,
        question: "Find derivative: y = 3^x", 
        answer: "3^x ln(3)", 
        options: ["3^x ln(3)", "3^x", "x3^(x-1)", "ln(3)"], 
        playerStart: { x: 740, y: 553 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [{ x: 610, y: 97 }, { x: 143, y: 107 }, { x: 67, y: 557 }, { x: 253, y: 393 }],
        answerZone: { x: 343, y: 360 },
        portalPos: { x: 43, y: 347 }
    },
    { 
        level: 11,
        question: "Find derivative: y = 3e^(2x) - 5ln(x)", 
        answer: "6e^(2x)-5/x", 
        options: ["6e^(2x)-5/x", "3e^(2x)-5/x", "6e^(2x)-5", "e^(2x)"], 
        playerStart: { x: 361, y: 1533 },
        blockStart: { x: 200, y: 250 },
        blockPositions: [{ x: 224, y: 1283 }, { x: 391, y: 1150 }, { x: 1057, y: 1177 }, { x: 549, y: 1390 }],
        answerZone: { x: 694, y: 597 },
        gatePos: { x: 578, y: 480 },
        portalPos: { x: 363, y: 234 }
    },
    
    { 
        level: 12,
        question: "Derivative of y = ln(2x+1)", 
        answer: "2/(2x+1)", 
        options: ["2/(2x+1)", "1/(2x+1)", "2"],
        playerStart: { x: 463, y: 410 },
        blockStart: { x: 250, y: 100 },
        blockPositions: [{ x: 349, y: 568 }, { x: 420, y: 568 }, { x: 480, y: 568 }],
        answerZone: { x: 851, y: 437 },
        portalPos: { x: 500, y: 309 }
    },
    { 
        level: 13,
        question: "Derivative of y = log10(x)", 
        answer: "1/(x ln10)", 
        options: ["1/(x ln10)", "1/x", "ln10"],
        playerStart: { x: 463, y: 410 },
        blockStart: { x: 250, y: 100 },
        blockPositions: [{ x: 349, y: 568 }, { x: 420, y: 568 }, { x: 480, y: 568 }],
        answerZone: { x: 566, y: 280 },
        portalPos: { x: 547, y: 124 }
    },
    { 
        level: 14,
        question: "Derivative of y = log5(x)", 
        answer: "1/(x ln5)", 
        options: ["1/(x ln5)", "1/5x", "5/x"],
        playerStart: { x: 463, y: 410 },
        blockStart: { x: 250, y: 100 },
        blockPositions: [{ x: 90, y: 103 }, { x: 286, y: 103 }, { x: 886, y: 80 }],
        answerZone: { x: 610, y: 253 },
        portalPos: { x: 600, y: 103 }
    },
    { 
        level: 15,
        question: "Derivative of y = e^(x^2)", 
        answer: "2xe^(x^2)", 
        options: ["2xe^(x^2)", "e^(x^2)", "2x"],
        playerStart: { x: 463, y: 410 },
        blockStart: { x: 250, y: 100 },
        blockPositions: [{ x: 100, y: 287 }, { x: 856, y: 287 }, { x: 460, y: 583 }],
        answerZone: { x: 462, y: 120 },
        portalPos: { x: 462, y: 300 }
    },
    { 
        level: 16,
        question: "Derivative of y = 2^(3x)", 
        answer: "3(2^3x)ln2", 
        options: ["3(2^3x)ln2", "2^(3x)ln2", "6^x"],
        playerStart: { x: 890, y: 303 },
        blockStart: { x: 250, y: 100 },
        blockPositions: [{ x: 645, y: 119 }, { x: 343, y: 286 }, { x: 513, y: 590 }],
        answerZone: { x: 90, y: 310 },
        portalPos: { x: 553, y: 310 }
    },
    { 
        level: 17,
        question: "Derivative of y = log2(x)", 
        answer: "1/(x ln2)", 
        options: ["1/(x ln2)", "1/2x", "2/x"],
        playerStart: { x: 463, y: 410 },
        blockStart: { x: 250, y: 100 },
        blockPositions: [{ x: 535, y: 568 }, { x: 420, y: 568 }, { x: 480, y: 568 }],
        answerZone: { x: 153, y: 270 },
        portalPos: { x: 892, y: 251 }
    },
    { 
        level: 18,
        question: "Find y' if y = ln(4x^2) at x=3", 
        answer: "2/3", 
        options: ["2/3", "1/3", "1/4", "3/2"], 
        playerStart: { x: 220, y: 1553 },
        blockStart: { x: 250, y: 100 },
        blockPositions: [{ x: 1036, y: 1397 }, { x: 1026, y: 1070 }, { x: 973, y: 1553 }, { x: 1036, y: 1500 }],
        answerZone: { x: 630, y: 912 },
        portalPos: { x: 600, y: 102 },
        gatePos: { x: 452, y: 550 }
    },
    
    { 
        level: 19,
        question: "Find rate of change: y = 500e^(0.04t)", 
        answer: "20e^(0.04t)", 
        options: ["20e^(0.04t)", "500e", "0.04t", "20", "e", "t"], 
        playerStart: { x: 133, y: 230 },
        blockStart: { x: 100, y: 100 },
        blockPositions: [
            { x: 200, y: 620 }, { x: 400, y: 620 }, { x: 600, y: 620 },
            { x: 200, y: 660 }, { x: 400, y: 660 }, { x: 600, y: 660 }
        ],
        answerZone: { x: 363, y: 201 }, 
        portalPos: { x: 95, y: 220 }
    },
    { 
        level: 20,
        question: "Bacteria N(t)=500e^(0.04t). Rate at t=10?", 
        answer: "29.8", 
        multiAnswer: true,
        slots: [
            { x: 455, y: 146, requiredValue: "2" },
            { x: 502, y: 146, requiredValue: "9" },
            { x: 547, y: 146, requiredValue: ".8" }
        ],
        options: ["2", "9", ".8", "5", "0", "1", "3", "7", "4", "6", "8", "."], 
        playerStart: { x: 400, y: 500 },
        blockStart: { x: 100, y: 100 },
        blockPositions: [
            { x: 150, y: 200 }, { x: 250, y: 200 }, { x: 350, y: 200 }, { x: 450, y: 200 },
            { x: 150, y: 300 }, { x: 250, y: 300 }, { x: 350, y: 300 }, { x: 450, y: 300 },
            { x: 150, y: 400 }, { x: 250, y: 400 }, { x: 350, y: 400 }, { x: 450, y: 400 }
        ],
        answerZone: { x: 0, y: 0 }, 
        portalPos: { x: 860, y: 379 }
    },
    { 
        level: 21,
        question: "Richter R(x)=ln(x). Rate at x=5?", 
        answer: "0.2", 
        multiAnswer: true,
        slots: [
            { x: 600, y: 1400, requiredValue: "0" },
            { x: 650, y: 1400, requiredValue: "." },
            { x: 700, y: 1400, requiredValue: "2" }
        ],
        options: ["0", ".", "2", "5", "1", "9", "8", "3", "4", "7"], 
        playerStart: { x: 140, y: 183 },
        blockStart: { x: 100, y: 100 },
        blockPositions: [
            { x: 1027, y: 520 }, { x: 711, y: 140 }, { x: 360, y: 1470 }, { x: 500, y: 200 },
            { x: 878, y: 1530 }, { x: 325, y: 1270 }, { x: 287, y: 390 }, { x: 153, y: 470 },
            { x: 960, y: 260 }, { x: 1060, y: 260 }
        ],
        answerZone: { x: 0, y: 0 }, 
        portalPos: { x: 640, y: 1207 }
    },
    { 
        level: 22,
        question: "Lamp B(t)=log(3t^3). Rate at t=2?", 
        answer: "1.5", 
        multiAnswer: true,
        slots: [
            { x: 737, y: 1320, requiredValue: "1" },
            { x: 787, y: 1320, requiredValue: "." },
            { x: 837, y: 1320, requiredValue: "5" }
        ],
        options: ["1", ".", "5", "0", "2", "3", "7", "8", "9", "4"], 
        playerStart: { x: 127, y: 260 },
        blockStart: { x: 100, y: 100 },
        blockPositions: [
            { x: 151, y: 1393 }, { x: 791, y: 190 }, { x: 207, y: 839 }, { x: 395, y: 1510 },
            { x: 331, y: 717 }, { x: 982, y: 597 }, { x: 1089, y: 281 }, { x: 1056, y: 190 },
            { x: 504, y: 190 }, { x: 241, y: 190 }
        ],
        answerZone: { x: 0, y: 0 }, 
        portalPos: { x: 973, y: 1573 }
    },
    { 
        level: 23,
        question: "Acidity A(x)=log(7x^5). Rate at x=1?", 
        answer: "5", 
        multiAnswer: false, 
        options: ["5", "7", "1", "3", "0", "9", "2", "8"], 
        playerStart: { x: 593, y: 140 },
        blockStart: { x: 100, y: 100 },
        blockPositions: [
            { x: 207, y: 1293 }, { x: 900, y: 1293 }, { x: 983, y: 647 }, { x: 700, y: 647 },
            { x: 400, y: 647 }, { x: 606, y: 160 }, { x: 700, y: 1293 }, { x: 900, y: 1293 }
        ],
        answerZone: { x: 593, y: 1530 }, 
        portalPos: { x: 593, y: 1219 }
    },
    { 
        level: 24,
        question: "Pressure P(t)=log(2t^4). Rate at t=3?", 
        answer: "4/3", 
        multiAnswer: false,
        options: ["4/3", "3/4", "2", "1/2", "3", "4", "1", "0"], 
        playerStart: { x: 250, y: 197 },
        blockStart: { x: 100, y: 100 },
        blockPositions: [
            { x: 953, y: 178 }, { x: 249, y: 1189 }, { x: 139, y: 1165 }, { x: 1070, y: 178 },
            { x: 990, y: 595 }, { x: 633, y: 638 }, { x: 180, y: 190 }, { x: 177, y: 637 }
        ],
        answerZone: { x: 195, y: 1572 }, 
        portalPos: { x: 535, y: 1242 }
    },
    { 
        level: 25,
        question: "Pos s(t)=t^2. Find velocity v(t).", 
        answer: "2t", 
        multiAnswer: false,
        options: ["2t", "t", "t^2", "2", "t/2", "2t^2", "1", "0"], 
        playerStart: { x: 435, y: 2287 },
        blockStart: { x: 100, y: 100 },
        blockPositions: [
            { x: 1547, y: 1491 }, { x: 205, y: 2001 }, { x: 253, y: 2036 },
            { x: 1547, y: 1594 }, { x: 1060, y: 2237 }, { x: 107, y: 1544 },
            { x: 107, y: 1637 }, { x: 353, y: 1554 }
        ],
        answerZone: { x: 1368, y: 2067 }, 
        portalPos: { x: 860, y: 379 } 
    },
    { 
        level: 26,
        question: "Integration: Area under y=x from 0 to 4", 
        answer: "8", 
        multiAnswer: false, 
        options: [8, 4, 16], 
        playerStart: { x: 843, y: 590 }, 
        blockStart: { x: 100, y: 100 },
        blockPositions: [],
        answerZone: { x: 0, y: 0 }, 
        portalPos: { x: 860, y: 379 }
    }
];



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
        this.load.spritesheet('fireball', 'assets/spriteSheet_fireEffect03_21x26.png', { 
    frameWidth: 21, 
    frameHeight: 26 
});
    }

    create() {

        this.input.setDefaultCursor('url(assets/cursor.png), pointer');
        this.input.on('pointerup', () => { this.input.setDefaultCursor('url(assets/cursor.png), pointer'); });
        this.events.on('shutdown', () => {
            ['arrow_loop', 'cart_loop', 'fire_loop', 'laser_loop'].forEach(key => {
                this.sound.getAll(key).forEach(s => {
                    s.stop();
                    s.destroy();
                });
            });
            this.sound.getAll().forEach(sound => {
                if (!sound.key.includes('bgm') && sound.key !== 'title_music') {
                    sound.stop();
                    sound.destroy();
                }
            });
        });
            

        this.scrollingBg = this.add.tileSprite(400, 300, 800, 600, 'menu_bg');
        this.scrollingBg.setTileScale(0.5); 
        this.add.image(400, 150, 'title_img').setScale(0.15);

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

        const watermark = this.add.text(400, 300, 'DEMO VERSION', { 
            fontSize: '90px',       
            fontFamily: 'Ithaca',   
            fill: '#ffffff', 
            stroke: '#000000',
            strokeThickness: 4
        });

        watermark.setOrigin(0.5);      
        watermark.setAlpha(0.30);      
        watermark.setDepth(0);         
        watermark.setAngle(-25);       
        
        this.tweens.add({
            targets: watermark,
            alpha: 0.50,
            duration: 2000,
            yoyo: true,
            repeat: -1
        });

    }

    update() {
        if (this.scrollingBg) {
            this.scrollingBg.tilePositionX += 0.5;
            this.scrollingBg.tilePositionY += 0.2;
        }
    }
}


class MobileControls {
    constructor(scene) {
        this.scene = scene;
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;

        
        const isMobileOS = !this.scene.sys.game.device.os.desktop;

        if (isMobileOS) {
            this.createControls();
        }
    }

    createControls() {
        this.scene.input.addPointer(2); 
        const gameWidth = 800; 
        const gameHeight = 600;

        
        const dpadX = 110;
        const dpadY = gameHeight - 110; 
        const radius = 38;
        
        const createBtn = (x, y, rotation, propName) => {
            let btn = this.scene.add.circle(x, y, radius, 0xffffff, 0.2)
                .setScrollFactor(0) 
                .setDepth(9999)     
                .setInteractive();
            
            let arrow = this.scene.add.text(x, y, '➤', { fontSize: '24px', color: '#ffffff', fontStyle: 'bold' })
                .setOrigin(0.5)
                .setRotation(rotation)
                .setScrollFactor(0)
                .setDepth(10000);

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
            btn.on('pointerover', (pointer) => { if (pointer.isDown) press(); });
            btn.on('pointerup', release);
            btn.on('pointerout', release);
        };

        createBtn(dpadX, dpadY - 65, -Math.PI / 2, 'up');    
        createBtn(dpadX, dpadY + 65, Math.PI / 2, 'down');   
        createBtn(dpadX - 65, dpadY, Math.PI, 'left');       
        createBtn(dpadX + 65, dpadY, 0, 'right');            

        
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
        this.isBossRetry = data.isBossRetry || false;
        this.cutscenePlayed = false;      
    this.evilRevealPlayed = false;    
    this.isCutscenePlaying = false;   
    }

    preload() {
        this.load.image('scifi_gate_closed', 'assets/scifi_gate_closed.png');
        this.load.image('scifi_gate_open', 'assets/scifi_gate_open.png');
        this.load.spritesheet('floor_items', 'assets/atlas_floor-16x16.png', { frameWidth: 16, frameHeight: 16 });
        this.load.image('sunny_tiles_extruded', 'assets/sunny_tiles_extruded.png');
        this.load.spritesheet('portal', 'assets/Dimensional_Portal.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('gate_locked', 'assets/gate_locked.png');
        this.load.image('gate_open', 'assets/gate_open.png');
        this.load.image('dialog_bg', 'assets/dialog_box.png');
        this.load.spritesheet('hero_sheet', 'assets/player.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('wall', 'assets/wall.png');
        this.load.spritesheet('professor', 'assets/doctor.png', { frameWidth: 16, frameHeight: 32 });
        
        this.load.spritesheet('professor_new', 'assets/professor_new.png', { 
        frameWidth: 16, 
        frameHeight: 32 
        });
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
        this.load.image('laboratory_stuff', 'assets/tilesStuff.png');
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
        this.load.image('MovingCart', 'assets/MovingCart.png');
        this.load.audio('arrow_loop', 'assets/arrow_sfx.mp3');
        this.load.image('arrow', 'assets/arrow.png');
        this.load.image('vignette', 'assets/vignette.png');
        this.load.audio('boss_bgm', 'assets/boss_music.mp3');
        this.load.audio('laser_loop', 'assets/laser_hum.mp3'); 
        this.load.audio('cart_loop', 'assets/cart_rumble.mp3'); 
        this.load.audio('fire_loop', 'assets/fire_burning.mp3'); 
        this.load.spritesheet('laser', 'assets/lasers_spritesheet.png', { 
        frameWidth: 32, 
        frameHeight: 32 
        });

        for (let i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]) {
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
        } 
        else if (currentLvl === 26) {
            targetMusicKey = 'boss_bgm';
        } 
        else if (currentLvl >= 19) {
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

       let mapKey;

if (this.isCorrectionRoom) {
    mapKey = 'correction_room';
} else {
    
    
    if (this.currentLevelData.level === 26) {
        mapKey = 'level25'; 
    } else {
        
        mapKey = `level${this.currentLevelData.level}`;
    }

    
    if (!this.cache.tilemap.exists(mapKey)) mapKey = 'level1';
}
        
        const map = this.make.tilemap({ key: mapKey });
        const sunnyTiles = map.addTilesetImage('sunny_world', 'sunny_tiles_extruded', 16, 16, 1, 2);
        const dungeonTiles = map.addTilesetImage('dungeon_tiles', 'dungeon_tiles');
        const dungeonWalls = map.addTilesetImage('dungeon_walls', 'dungeon_walls');
        const labFloor = map.addTilesetImage('tilesFloor', 'laboratory_tiles') || map.addTilesetImage('laboratory_tiles', 'laboratory_tiles');
        const labStuff = map.addTilesetImage('laboratory_stuff', 'laboratory_stuff');
        const labWalls = map.addTilesetImage('tilesWalls', 'laboratory_walls') || map.addTilesetImage('laboratory_walls', 'laboratory_walls');
        const allTiles = [sunnyTiles, dungeonTiles, dungeonWalls, labFloor, labStuff, labWalls].filter(t => t !== null);

        const bridgesLayer = map.createLayer('Bridge', allTiles, 0, 0) || map.createLayer('around', allTiles, 0, 0);
        const groundLayer = map.createLayer('Ground', allTiles, 0, 0);
        const decorLayer = map.createLayer('Decoration', allTiles, 0, 0);
        const wallsLayer = map.createLayer('Walls', allTiles, 0, 0);
        const overheadLayer = map.createLayer('Overhead', allTiles, 0, 0);

if (overheadLayer) {
    overheadLayer.setScale(3);
    
    
    overheadLayer.setDepth(100); 
}

        if (bridgesLayer) { bridgesLayer.setScale(3); bridgesLayer.setDepth(5); }
        if (groundLayer) groundLayer.setScale(3);
        if (decorLayer) decorLayer.setScale(3);
        if (wallsLayer) { wallsLayer.setScale(3); wallsLayer.setCollisionByExclusion([-1]); }

        if (!this.anims.exists('fire-anim')) {
    this.anims.create({
        key: 'fire-anim',

        frames: this.anims.generateFrameNumbers('fireball', { start: 0, end: 24 }), 
        frameRate: 20, 
        repeat: -1     
    });
}

        if (!this.anims.exists('idle-down')) {
            this.anims.create({ key: 'idle-down', frames: this.anims.generateFrameNumbers('hero_sheet', { start: 0, end: 5 }), frameRate: 8, repeat: -1 });
            this.anims.create({ key: 'run-down', frames: this.anims.generateFrameNumbers('hero_sheet', { start: 18, end: 23 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: 'run-side', frames: this.anims.generateFrameNumbers('hero_sheet', { start: 24, end: 29 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: 'run-up', frames: this.anims.generateFrameNumbers('hero_sheet', { start: 30, end: 35 }), frameRate: 10, repeat: -1 });
        }
        
        if (!this.anims.exists('orb-spin')) { this.anims.create({ key: 'orb-spin', frames: this.anims.generateFrameNumbers('orb', { start: 0, end: 7 }), frameRate: 10, repeat: -1 }); }
       if (!this.anims.exists('lab-portal-idle')) {
    this.anims.create({
        key: 'lab-portal-idle',
        frames: this.anims.generateFrameNumbers('lab_portal', { start: 0, end: 3 }), 
        frameRate: 8,
        repeat: -1
    });
}
        if (!this.anims.exists('gem-blue-spin')) { this.anims.create({ key: 'gem-blue-spin', frames: this.anims.generateFrameNumbers('gem_blue', { start: 0, end: 3 }), frameRate: 8, repeat: -1 }); }
        if (!this.anims.exists('gem-green-spin')) { this.anims.create({ key: 'gem-green-spin', frames: this.anims.generateFrameNumbers('gem_green', { start: 0, end: 3 }), frameRate: 8, repeat: -1 }); }
        if (!this.anims.exists('gem-yellow-spin')) { this.anims.create({ key: 'gem-yellow-spin', frames: this.anims.generateFrameNumbers('gem_yellow', { start: 0, end: 3 }), frameRate: 8, repeat: -1 }); }

        let startX = this.isCorrectionRoom ? 400 : this.currentLevelData.playerStart.x;
        let startY = this.isCorrectionRoom ? 300 : this.currentLevelData.playerStart.y;

        this.movingPlatforms = this.physics.add.group({
        allowGravity: false, 
        immovable: true      
    });
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
            
            const isLab = (this.currentLevelData.level >= 18);
            const textureKey = isLab ? 'scifi_gate_closed' : 'gate_locked';
            let gate = this.stoneGates.create(
        this.currentLevelData.gatePos.x, 
        this.currentLevelData.gatePos.y, 
        textureKey
    );
    
            const size = isLab ? 4 : 3; 
    
    gate.setScale(size).setOrigin(0, 0).setDepth(40).setVisible(true);
    
    
    
    gate.body.setSize(gate.width, gate.height);

    
    gate.isSciFi = isLab;
        }
        this.physics.add.collider(this.player, this.stoneGates);

        this.keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.debugEnabled = false;
        this.setupUI(); 

        this.answerSlots = []; 
this.levelLabels = []; 

this.answerSlots = []; 
        this.levelLabels = []; 

        
        if (this.isMultiSlot) {
            this.currentLevelData.slots.forEach((slotData, index) => {
                
                const isLab = (this.currentLevelData.level >= 19);
                let textureKey = isLab ? 'lab_portal' : 'floor_items';
                
                let plate = this.physics.add.sprite(slotData.x, slotData.y, textureKey);
                plate.setScale(3).setImmovable(true).setDepth(5); 

                
                if (isLab) {
                    plate.play('lab-portal-idle'); 
                    plate.body.setSize(12, 12).setOffset(2, 2); 
                } else {
                    plate.setFrame(30); 
                    plate.body.setSize(10, 10).setOffset(3, 3);
                }

                plate.requiredValue = slotData.requiredValue; 
                
                
                let label = this.add.text(slotData.x, slotData.y - 40, `Part ${index + 1}`, { 
                    fontSize: '16px', fontFamily: 'Ithaca', fill: '#ffff00', stroke: '#000', strokeThickness: 3 
                }).setOrigin(0.5);

                this.levelLabels.push(label); 
                plate.myLabel = label;

                this.answerSlots.push(plate);
            });
        } 
        
        else {
            let ansX = this.isCorrectionRoom ? 600 : this.currentLevelData.answerZone.x;
            let ansY = this.isCorrectionRoom ? 400 : this.currentLevelData.answerZone.y;
            
            const isLab = (this.currentLevelData.level >= 19);
            
            
            if (isLab) {
                
                this.pressurePlate = this.physics.add.sprite(ansX, ansY, 'lab_portal');
                this.pressurePlate.play('lab-portal-idle');
                this.pressurePlate.body.setSize(12, 12).setOffset(2, 2);
            } else {
                
                this.pressurePlate = this.physics.add.sprite(ansX, ansY, 'floor_items');
                this.pressurePlate.setFrame(30);
                this.pressurePlate.body.setSize(10, 10).setOffset(3, 3);
            }

            
            this.pressurePlate.setScale(3).setImmovable(true).setDepth(5);
            
            
            if (isLab) {
                let label = this.add.text(ansX, ansY - 40, "ANSWER", { 
                    fontSize: '16px', fontFamily: 'Ithaca', fill: '#ffff00', stroke: '#000', strokeThickness: 3 
                }).setOrigin(0.5);
                this.levelLabels.push(label);
                this.pressurePlate.myLabel = label;
            }

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

      
if (this.currentLevelData.level === 25) {
    
    
    this.npc = this.physics.add.sprite(882, 1360, 'professor_new'); 
this.npc.setScale(3).setFrame(3);
this.npc.play('prof-idle-up'); 
this.npc.setImmovable(true).setDepth(20);

this.npcMarker = this.add.text(this.npc.x, this.npc.y - 50, '!', {
        fontSize: '32px', fontFamily: 'Ithaca', fill: '#ffff00', stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5).setDepth(60);
    
    
    this.tweens.add({ 
        targets: this.npcMarker, 
        y: this.npc.y - 60, 
        duration: 500, 
        yoyo: true, 
        repeat: -1 
    });

    
    
    this.storyGate = this.physics.add.sprite(865, 1255, 'scifi_gate_closed');
    this.storyGate.setScale(4).setImmovable(true).setDepth(19);
    
    
    this.storyGate.body.setSize(this.storyGate.width, this.storyGate.height);
    this.physics.add.collider(this.player, this.storyGate);

    let revealZone = this.add.zone(848, 427, 400, 50); 
this.physics.add.existing(revealZone);

this.physics.add.overlap(this.player, revealZone, () => {
    
    if (!this.evilRevealPlayed) {
        this.triggerEvilReveal();
        revealZone.destroy(); 
    }
});
}


if (!this.anims.exists('prof-run-up')) {
    
    
    this.anims.create({
        key: 'prof-run-up',
        frames: this.anims.generateFrameNumbers('professor_new', { frames: [52, 53, 54, 55, 56, 57] }), 
        frameRate: 6,
        repeat: -1
    });

    
    this.anims.create({
        key: 'prof-idle-up',
        frames: [ { key: 'professor_new', frame: 1 } ], 
        frameRate: 20
    });

    
    this.anims.create({
        key: 'prof-idle-down',
        frames: [ { key: 'professor_new', frame: 3 } ], 
        frameRate: 20
    });
}
        
        this.mobileControls = new MobileControls(this);

        if (this.currentLevelData.level === 26) {
    
    this.player.setPosition(843, 590); 
    
    
    this.npc = this.physics.add.sprite(845, 120, 'professor_new');
    this.npc.setScale(3).play('prof-idle-down');

    
    this.startLevel26Gameplay();
}

const watermark = this.add.text(400, 300, 'DEMO VERSION', { 
            fontSize: '90px',       
            fontFamily: 'Ithaca',   
            fill: '#ffffff', 
            stroke: '#000000',
            strokeThickness: 4
        });

        watermark.setOrigin(0.5);      
        watermark.setAlpha(0.35);      
        watermark.setScrollFactor(0); 
        watermark.setDepth(10000);     
        watermark.setAngle(-25);       
        
        // Optional: Make it pulse slowly
        this.tweens.add({
            targets: watermark,
            alpha: 0.25,
            duration: 2000,
            yoyo: true,
            repeat: -1
        });

        if (!this.anims.exists('laser-anim')) {
    this.anims.create({
        key: 'laser-anim',
        
        frames: this.anims.generateFrameNumbers('laser', { start: 0, end: 4 }), 
        frameRate: 15, 
        repeat: -1     
    });
}

this.carts = this.physics.add.group({
    allowGravity: false,
    immovable: true
});


const cartObjs = map.getObjectLayer('MovingCart')?.objects || map.getObjectLayer('MovingCart')?.objects || [];

cartObjs.forEach(obj => {
    
    let cart = this.carts.create(obj.x * 3, obj.y * 3, 'MovingCart');
    cart.setScale(3).setOrigin(0, 0);
    
    
    cart.body.setSize(cart.width * 0.8, cart.height * 0.8);
    cart.body.setOffset(cart.width * 0.1, cart.height * 0.1);
    cart.mySound = this.sound.add('cart_loop', { 
        loop: true, 
        volume: 0 
    });

    
    const moveX = obj.properties?.find(p => p.name === 'moveX')?.value || 0;
    const moveY = obj.properties?.find(p => p.name === 'moveY')?.value || 0;

    
    const pixelsPerSecond = 600; 
    const dist = Math.sqrt((moveX * 3) ** 2 + (moveY * 3) ** 2);
    const calculatedDuration = (dist > 0) ? (dist / pixelsPerSecond) * 1000 : 1000;

    
    this.tweens.add({
        targets: cart,
        x: cart.x + (moveX * 3),
        y: cart.y + (moveY * 3),
        duration: calculatedDuration,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
        hold: 0
        
    });
});


this.physics.add.overlap(this.player, this.carts, () => {
    
    this.sound.play('gameover_sfx'); 
    
    
    let respawnX = this.isCorrectionRoom ? 400 : this.currentLevelData.playerStart.x;
    let respawnY = this.isCorrectionRoom ? 300 : this.currentLevelData.playerStart.y;
    
    this.player.setPosition(respawnX, respawnY);
    
    
    this.cameras.main.shake(200, 0.01);
});
    
this.arrows = this.physics.add.group({
    allowGravity: false,
    immovable: true
});


const arrowObjs = map.getObjectLayer('Arrow')?.objects || map.getObjectLayer('Arrows')?.objects || [];
arrowObjs.forEach(obj => {
    
    let arrow = this.arrows.create(obj.x * 3, obj.y * 3, 'arrow');
    arrow.setScale(3).setOrigin(0.5, 0.5); 

    
    const moveX = obj.properties?.find(p => p.name === 'moveX')?.value || 0;
    const moveY = obj.properties?.find(p => p.name === 'moveY')?.value || 0;
    arrow.mySound = this.sound.add('arrow_loop', { 
        loop: true, 
        volume: 0 
    }); 

    
    
    const angle = Phaser.Math.RadToDeg(Math.atan2(moveY, moveX));
arrow.setAngle(angle + 90);

    
    
    
    if (Math.abs(angle) === -90) {
        arrow.body.setSize(10, 30); 
    } else {
        arrow.body.setSize(30, 10); 
    }
    
    arrow.body.setOffset(
        (arrow.width - arrow.body.width) / 2, 
        (arrow.height - arrow.body.height) / 2
    );

    
    const pixelsPerSecond = 1000; 
    const dist = Math.sqrt((moveX * 3) ** 2 + (moveY * 3) ** 2);
    const calculatedDuration = (dist > 0) ? (dist / pixelsPerSecond) * 1000 : 1000;

    const textureOffset = 90; 
const angleRad = Math.atan2(moveY, moveX);
const angleDeg = Phaser.Math.RadToDeg(angleRad);

const forwardAngle = angleDeg + textureOffset;
const returnAngle = angleDeg + textureOffset + 180;


arrow.setAngle(forwardAngle);


this.tweens.add({
    targets: arrow,
    x: arrow.x + (moveX * 3),
    y: arrow.y + (moveY * 3),
    duration: calculatedDuration,
    yoyo: true,
    repeat: -1,
    ease: 'Linear',
    hold: 200,

    
    onYoyo: () => {
        arrow.setAngle(returnAngle);
    },
    
    
    onRepeat: () => {
        arrow.setAngle(forwardAngle);
    }
});
});


this.physics.add.overlap(this.player, this.arrows, () => {
    this.sound.play('gameover_sfx'); 
    let respawnX = this.isCorrectionRoom ? 400 : this.currentLevelData.playerStart.x;
    let respawnY = this.isCorrectionRoom ? 300 : this.currentLevelData.playerStart.y;
    this.player.setPosition(respawnX, respawnY);
    this.cameras.main.shake(200, 0.01);
});




this.fireballs = this.physics.add.group({
    allowGravity: false,
    immovable: true
});


const fireObjs = map.getObjectLayer('Fireball')?.objects || map.getObjectLayer('Fireballs')?.objects || [];

fireObjs.forEach(obj => {
    
    let fire = this.fireballs.create(obj.x * 3, obj.y * 3, 'fireball');
    fire.setScale(3).setOrigin(0.5, 0.5);
    
    
    fire.play('fire-anim');

    
    const moveX = obj.properties?.find(p => p.name === 'moveX')?.value || 0;
    const moveY = obj.properties?.find(p => p.name === 'moveY')?.value || 0;

    
    
    const angle = Phaser.Math.RadToDeg(Math.atan2(moveY, moveX));
    fire.setAngle(angle + 90); 
    fire.mySound = this.sound.add('fire_loop', { 
        loop: true, 
        volume: 0 
    });

    
    fire.body.setSize(10, 10);
    fire.body.setCircle(5); 
    fire.body.setOffset(5, 8);

    
    const pixelsPerSecond = 250; 
    const dist = Math.sqrt((moveX * 3) ** 2 + (moveY * 3) ** 2);
    const calculatedDuration = (dist > 0) ? (dist / pixelsPerSecond) * 1000 : 1000;

    
    const startX = fire.x;
    const startY = fire.y;

    this.tweens.add({
        targets: fire,
        x: fire.x + (moveX * 3),
        y: fire.y + (moveY * 3),
        duration: calculatedDuration,
        repeat: -1,
        yoyo: false, 
        ease: 'Linear',
        hold: 200,
        
        
        onRepeat: () => {
            fire.x = startX;
            fire.y = startY;
        }
    });
});


this.physics.add.overlap(this.player, this.fireballs, () => {
    this.sound.play('gameover_sfx'); 
    let respawnX = this.isCorrectionRoom ? 400 : this.currentLevelData.playerStart.x;
    let respawnY = this.isCorrectionRoom ? 300 : this.currentLevelData.playerStart.y;
    this.player.setPosition(respawnX, respawnY);
    this.cameras.main.shake(200, 0.01);
});

this.lasers = this.physics.add.group({
    allowGravity: false,
    immovable: true
});


const laserObjs = map.getObjectLayer('Laser')?.objects || map.getObjectLayer('Lasers')?.objects || [];

laserObjs.forEach(obj => {
    
    let laser = this.lasers.create(obj.x * 3, obj.y * 3, 'laser');
    laser.setScale(7).setOrigin(0.5, 0.5);
    laser.play('laser-anim');
    laser.setDepth(10);

    laser.mySound = this.sound.add('laser_loop', { 
        loop: true, 
        volume: 0 
    });

    
    const moveX = obj.properties?.find(p => p.name === 'moveX')?.value || 0;
    const moveY = obj.properties?.find(p => p.name === 'moveY')?.value || 0;
    
    
    
    const interval = obj.properties?.find(p => p.name === 'interval')?.value || 0;
    const offset = obj.properties?.find(p => p.name === 'offset')?.value || 0;
    const customRotation = obj.properties?.find(p => p.name === 'rotation')?.value;
    const isHorizontal = (customRotation === 90) || (moveX === 0 && moveY !== 0);

    
   
    if (isHorizontal) {
        
        laser.setAngle(90); 
        
        
        laser.body.setSize(28, 28);
        laser.body.setOffset(4, 4); 
        
    } else {
        
        laser.setAngle(0);

        
        laser.body.setSize(28, 28);
        laser.body.setOffset(4, 4);
    }
    
    
    const pixelsPerSecond = 200; 
    const dist = Math.sqrt((moveX * 3) ** 2 + (moveY * 3) ** 2);
    const calculatedDuration = (dist > 0) ? (dist / pixelsPerSecond) * 1000 : 1000;

    if (dist > 0) {
        this.tweens.add({
            targets: laser,
            x: laser.x + (moveX * 3),
            y: laser.y + (moveY * 3),
            duration: calculatedDuration,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
            hold: 500
        });
    }

    
    if (interval > 0) {
        
        this.time.addEvent({
            delay: interval,
            loop: true,
            startAt: offset, 
            callback: () => {
                
                laser.setVisible(!laser.visible);
                
                
                
                
                laser.body.enable = laser.visible;
            }
        });
    }

    this.physics.add.overlap(this.player, this.lasers, () => {
    this.sound.play('gameover_sfx', { volume: 0.2 }); 
    let respawnX = this.isCorrectionRoom ? 500 : this.currentLevelData.playerStart.x;
    let respawnY = this.isCorrectionRoom ? 300 : this.currentLevelData.playerStart.y;
    this.player.setPosition(respawnX, respawnY);
    this.cameras.main.shake(200, 0.01);

    
});
});
        
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

            block.setDrag(1000).setBounce(1).setCollideWorldBounds(false);
            block.setDepth(30); 
            block.body.setSize(10, 15).setOffset(3, 1);
            block.value = val;
            
            let text = this.add.text(0, 0, val, { fontSize: '24px', color: '#ffffff', stroke: '#000', strokeThickness: 4, fontFamily: 'Ithaca', fontStyle: 'bold' }).setOrigin(0.5);
            text.setDepth(30); 
            block.myText = text;
            block.updateText = function() { text.x = this.x; text.y = this.y; };
            yPos += 150;
        });

        this.darknessOverlay = this.add.image(this.player.x, this.player.y, 'vignette')
    .setDepth(999) 
    .setAlpha(0);  
    }

    setupUI() {
        let restartBtn = this.add.image(40, 40, 'btn_restart').setInteractive().setScale(0.21).setScrollFactor(0).setDepth(1000);
        restartBtn.on('pointerdown', () => { 
            this.sound.play('click_sfx');
            this.physics.pause(); this.scene.restart(); 
        });
        this.input.keyboard.on('keydown-R', () => { this.physics.pause(); this.scene.restart(); });

        let pauseBtn = this.add.image(100, 40, 'btn_pause').setInteractive().setScale(0.21).setScrollFactor(0).setDepth(1000);
        
        this.pauseMenuContainer = this.add.container(0, 0).setScrollFactor(0).setDepth(3000).setVisible(false);
        
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

        this.dialogContainer = this.add.container(400, -200).setScrollFactor(0).setDepth(2001).setVisible(false);
        this.dialogContainer.add(this.add.nineslice(0, 0, 'dialog_bg', 0, 700, 150, 10, 10, 10, 10));
        this.dialogText = this.add.text(0, 0, '', { fontSize: '20px', fontFamily: 'Ithaca', color: '#4a3d2e', wordWrap: { width: 650 }, align: 'center' }).setOrigin(0.5);
        this.dialogContainer.add(this.dialogText);
        
        this.interactPrompt = this.add.text(0, 0, 'Press E to talk', { fontSize: '20px', fontFamily: 'Ithaca', backgroundColor: '#000' }).setOrigin(0.5).setDepth(101).setVisible(false);
        
        let levelTitle = this.isCorrectionRoom ? "CORRECTION ROOM" : `Level ${this.currentLevelData.level}`;
        const qContainer = this.add.container(400, 40).setScrollFactor(0).setDepth(2000);
        qContainer.add(this.add.nineslice(0, 0, 'dialog_bg', 0, 500, 60, 10, 10, 10, 10));
        this.missionLabel = this.add.text(0, 0, `${levelTitle}: ${this.currentLevelData.question}`, { 
    fontSize: '28px', 
    fontFamily: 'Ithaca', 
    fill: '#4a3d2e', 
    wordWrap: { width: 480 }, 
    align: 'center' 
}).setOrigin(0.5);

qContainer.add(this.missionLabel);
    }

    handleInteraction() {
    
    if (this.npc && !this.isCorrectionRoom) {
        
        
        const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.npc.x, this.npc.y);
        
        
        if (dist < 80) {
            
            if (this.currentLevelData.level === 1) {
                this.showDialogue("PROF. PRIME:\n----------------\nHurry! Use Arrow Keys to move.\nPush the correct Answer Gem into the Platform!");
            } 
            
            else if (this.currentLevelData.level === 25) {
                if (this.storyGate && this.storyGate.texture.key === 'scifi_gate_closed') {
                    this.showDialogue("PROF. PRIME:\n----------------\nI'm hacking the mainframe...\nThe firewall is tough!\nSolve the equation to override the lock!");
                }
            }
        }
    }
}

    update(time, delta) {

        if (!this.sys.settings.active) return;
        if (this.isGameFinished || this.isLevelComplete) return; 

        if (this.isCutscenePlaying) {
        this.player.setVelocity(0, 0);
        this.player.anims.play('idle-down', true); 
        if (this.npcMarker) this.npcMarker.destroy();
        return; 
    }

        
        if (Phaser.Input.Keyboard.JustDown(this.keyE)) { this.handleInteraction(); }
        
    

        this.player.setVelocity(0);
        let moving = false;
        
        
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
                    
                    
                    
                    let isForgivable = false;

                    if (this.isMultiSlot) {
                        
                        const lockedCount = this.blocks.getChildren().filter(b => b.isLocked).length;
                        const totalSlots = this.answerSlots.length;

                        
                        
                        if (lockedCount === totalSlots - 1) {
                            isForgivable = true;
                        }
                    }

                    if (isForgivable) {
                        
                        
                        this.sound.play('gameover_sfx', { volume: 0.3, rate: 1.5 }); 
                        
                        block.setTint(0xff0000);
                        this.time.delayedCall(300, () => block.clearTint());

                        
                        const angle = Phaser.Math.Angle.Between(plate.x, plate.y, block.x, block.y);
                        const bounceSpeed = 400;
                        let vx = (block.x === plate.x) ? bounceSpeed : Math.cos(angle) * bounceSpeed;
                        let vy = (block.y === plate.y) ? 0 : Math.sin(angle) * bounceSpeed;
                        block.body.setVelocity(vx, vy);

                    } else {
                        
                        
                        this.handleGameOver();
                    }
                }
            }
        });
            }
        });

        if (this.npc && !this.isCorrectionRoom && (this.currentLevelData.level === 1 || this.currentLevelData.level === 25)) {
            const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.npc.x, this.npc.y);
            if (dist < 80) {
                if (this.player.x < this.npc.x) this.npc.setFlipX(true); 
        else this.npc.setFlipX(false); 

        this.interactPrompt.setPosition(this.npc.x, this.npc.y - 50).setVisible(true);
        if (this.npcMarker) this.npcMarker.setVisible(false);
    } else {
        
        this.interactPrompt.setVisible(false);
        if (this.npcMarker) this.npcMarker.setVisible(true);
        this.hideDialogue();
    }
}


        if (this.darknessOverlay) {
    this.darknessOverlay.x = this.player.x;
    this.darknessOverlay.y = this.player.y;

    
const updateSpatialSound = (group, maxDistance) => {
        
        if (!this.sys.settings.active || !group) return; 

        group.children.each(obj => {
            
            
            
            
            if (!obj.mySound || !obj.mySound.manager) return;

            const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, obj.x, obj.y);

            
            if (dist < maxDistance && obj.visible) {
                const volume = 1 - (dist / maxDistance);
                
                
                if (!obj.mySound.isPlaying) {
                    obj.mySound.play();
                }
                
                
                obj.mySound.setVolume(volume);
            
            } else {
                
                if (obj.mySound.isPlaying) {
                    obj.mySound.stop();
                }
            }
        });
    };

    
    updateSpatialSound(this.lasers, 300);
    updateSpatialSound(this.carts, 400);     
    updateSpatialSound(this.fireballs, 250); 
    updateSpatialSound(this.arrows, 300);
}
    }

    handleBlockDrop(block, destX, destY) {
        if (block.isFalling) return;
        block.isFalling = true;
        block.body.setVelocity(0, 0); block.body.enable = false;
        this.tweens.add({ targets: block, x: destX, y: destY, scaleX: { from: 4, to: 3 }, scaleY: { from: 4, to: 3 }, duration: 600, ease: 'Cubic.easeOut', onComplete: () => { block.body.enable = true; block.isFalling = false; } });
        this.tweens.add({ targets: block.myText, x: destX, y: destY, duration: 600, ease: 'Cubic.easeOut' });
    }

   triggerGateCutscene() {
    if (this.cutscenePlayed) return;
    this.cutscenePlayed = true;
    this.isCutscenePlaying = true; 
    this.player.setVelocity(0,0);
    this.player.anims.play('idle-down', true);

    
    this.cameras.main.stopFollow();
    this.cameras.main.pan(this.npc.x, this.npc.y, 800, 'Sine.easeInOut');

    
    this.time.delayedCall(1000, () => {
        
        this.npc.play('prof-run-up'); 
        
        
        this.tweens.add({
            targets: this.npc,
            y: this.storyGate.y + 40, 
            duration: 1000,
            onComplete: () => {
                this.npc.play('prof-idle-up'); 
                this.showDialogue("PROF. PRIME:\nACCESS GRANTED!\nFOLLOW ME TO THE CORE!");

                
                this.time.delayedCall(2000, () => {
                    this.hideDialogue();
                    this.sound.play('snap_sfx'); 
                    this.storyGate.setTexture('scifi_gate_open');
                    this.storyGate.body.enable = false;

                    
                    this.time.delayedCall(500, () => {
                        this.npc.play('prof-run-up'); 

                        this.tweens.add({
                            targets: this.npc,
                            x: 845, 
                            y: 120, 
                            duration: 3500,
                            ease: 'Linear',
                            onComplete: () => {
                                this.npc.play('prof-idle-down'); 
                                
                                
                                this.cameras.main.pan(this.player.x, this.player.y, 1000, 'Sine.easeInOut', false, (camera, progress) => {
                                    if (progress === 1) {
                                        this.cameras.main.startFollow(this.player);
                                        this.isCutscenePlaying = false; 
                                    }
                                });
                            }
                        });
                    });
                });
            }
        });
    });
}

triggerEvilReveal() {
    this.evilRevealPlayed = true;
    this.isCutscenePlaying = true;
    this.player.setVelocity(0,0);
    this.player.anims.play('idle-up', true);

    this.cameras.main.stopFollow();
    this.cameras.main.pan(this.npc.x, this.npc.y, 1000, 'Power2');

    this.time.delayedCall(1200, () => {
        this.npc.play('prof-idle-down'); 
        this.sound.stopByKey('lab_bgm');
        this.sound.play('boss_bgm', { volume: 0.6, loop: true });

        this.showDialogue("PROF. PRIME:\nExcellent work... You have solved every variable... Except ONE.");

        this.time.delayedCall(4000, () => {
            this.showDialogue("PROF. PRIME:\nI am the outlier.\nAnd you are just a remainder.\nGoodbye.");
            
            
            this.time.delayedCall(3000, () => {
                this.hideDialogue();
                
                
                this.cameras.main.pan(this.player.x, this.player.y, 800, 'Power2', false, (camera, progress) => {
                    if (progress === 1) {
                        this.cameras.main.startFollow(this.player);
                        this.isCutscenePlaying = false; 
                        
                        
                        this.startLevel26Gameplay(); 
                    }
                });
            });
        });
    });
}

triggerFinaleCutscene() {
    this.isCutscenePlaying = true;
    this.player.setVelocity(0, 0);
    this.player.anims.play('idle-up', true);

    
    this.sound.stopByKey('boss_bgm'); 
    this.sound.play('victory_sfx', { volume: 0.8 }); 

    
    if (this.darknessOverlay) {
        this.tweens.killTweensOf(this.darknessOverlay); 
        this.darknessOverlay.destroy(); 
    }

    
    this.cameras.main.flash(1000, 255, 255, 255);
    this.cameras.main.shake(500, 0.02);

    
    this.npc.setPosition(848, 200); 
    this.npc.setAlpha(1);
    this.npc.play('prof-idle-down');

    
    this.time.delayedCall(1500, () => {
        this.showDialogue("PROF. PRIME:\nImpossible...\nThe Area under the curve... is exactly 8.");
        
        this.time.delayedCall(4000, () => {
            this.showDialogue("PROF. PRIME:\nMy calculations were... flawed.\nYou have balanced the equation.");

            
            this.tweens.add({
                targets: this.npc,
                alpha: 0,
                duration: 2000,
                ease: 'Power2',
                onComplete: () => {
                    this.npc.destroy(); 
                }
            });

            this.time.delayedCall(3000, () => {
                this.showDialogue("SYSTEM:\nERROR CLEARED.\nLOGIC RESTORED.\nYOU MAY LEAVE.");

                
                this.portal.setVisible(true);
                this.portal.play('portal-spin');
                this.portal.setTintFill(0xffd700); 
                this.time.delayedCall(3000, () => {
                    this.hideDialogue();

                    
                    this.tweens.add({
                        targets: this.player,
                        y: this.portal.y,
                        x: this.portal.x,
                        duration: 1500,
                        onComplete: () => {
                            
                            this.cameras.main.fade(1000, 255, 255, 255, false, (camera, progress) => {
                                if (progress === 1) {
                                    this.scene.start('GameWon');
                                }
                            });
                        }
                    });
                });
            });
        });
    });
}
    activatePortal() {
    if (this.portal.visible) return;

    if (this.currentLevelData.level === 26) {
            this.triggerFinaleCutscene();
            return; 
        }
    if (this.currentLevelData.level === 25) {
        this.triggerGateCutscene();
        
        
        
        
        return; 
    }
    
    this.portal.setVisible(true); 
    this.portal.body.enable = true; 
    this.portal.play('portal-spin');

    this.stoneGates.children.iterate((gate) => { 
        if (gate) { 
            
            if (gate.isSciFi) {
                gate.setTexture('scifi_gate_open'); 
            } else {
                gate.setTexture('gate_open');       
            }
            
            
            gate.body.enable = false; 
        } 
    });
    
    this.add.text(400, 300, "ACCESS GRANTED!", { fontSize: '32px', fontFamily: 'Ithaca', color: '#00ff00', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5).destroy({ fromScene: true, delay: 2000 });
}
    handleWin() {
        this.isGameFinished = true;
        this.isLevelComplete = true;
        
        this.physics.pause();
        this.player.anims.stop();
        this.player.body.setVelocity(0); 

        ['fire_loop', 'cart_loop', 'laser_loop', 'arrow_loop'].forEach(key => {
            this.sound.getAll(key).forEach(s => {
                s.stop();
                s.destroy();
            });
        });
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
    const returnLvl = this.returnToLevelNum; 
    localStorage.removeItem('detentionReturnLevel');
    
    const levelToRetry = levels.find(l => l.level === returnLvl);

    if (levelToRetry) {
        
        this.scene.start('GameLevel', { 
            ...levelToRetry, 
            isCorrectionRoom: false,
            isBossRetry: (returnLvl === 26) 
        });
    } else {
        this.scene.start('MainMenu'); 
    }
} else {
                    if (this.currentLevelData.level === 26) {
                        this.scene.start('GameWon');
                    } else {
                        let nextLevelNum;
                        if (this.currentLevelData.level === 11) nextLevelNum = 12;
                        else if (this.currentLevelData.level === 19) nextLevelNum = 20;
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

        ['fire_loop', 'cart_loop', 'laser_loop', 'arrow_loop'].forEach(key => {
            this.sound.getAll(key).forEach(s => {
                s.stop();
                s.destroy();
            });
        });

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

   startLevel26Gameplay() {
    
    
    const level26Data = {
        level: 26,
        question: "Integration: Area under y=x from 0 to 4", 
        answer: "8", 
        playerStart: { x: 800, y: 500 }
    };
    this.currentLevelData = level26Data; 

    this.correctAnswer = level26Data.answer; 
    this.isMultiSlot = false;

    localStorage.setItem('lastPlayedLevel', 26);

    
    if (this.missionLabel) {
        this.missionLabel.setText(`FINAL BOSS: ${level26Data.question}`);
        this.missionLabel.setColor('#ff0000'); 
        
        this.tweens.add({
            targets: this.missionLabel,
            alpha: 0,
            duration: 200,
            yoyo: true,
            repeat: 3
        });
    }

    
    this.blocks.children.each(block => {
        if (block.myText) block.myText.destroy();
    });
    this.blocks.clear(true, true); 

    if (this.levelLabels) {
        this.levelLabels.forEach(lbl => { if (lbl) lbl.destroy(); });
        this.levelLabels = [];
    }

    if (this.answerSlots) {
        this.answerSlots.forEach(slot => {
            if (slot.myLabel) slot.myLabel.destroy();
            slot.destroy();
        });
        this.answerSlots = [];
    }

    

    
    
    const slotX = 848; 
    const slotY = 300;
    
    let plate = this.physics.add.sprite(slotX, slotY, 'lab_portal');
    plate.play('lab-portal-idle');
    plate.setScale(3).setImmovable(true).setDepth(5);
    plate.body.setSize(12, 12).setOffset(2, 2);
    plate.requiredValue = "8"; 

    let label = this.add.text(slotX, slotY - 40, "FINAL ANSWER", { 
        fontSize: '16px', fontFamily: 'Ithaca', fill: '#ffff00', stroke: '#000', strokeThickness: 3 
    }).setOrigin(0.5);

    this.levelLabels.push(label);
    plate.myLabel = label; 
    this.answerSlots.push(plate);

    
    const newBlocks = [
        { x: 1577, y: 647, val: "8" },   
        { x: 1547, y: 183, val: "4" },   
        { x: 1467, y: 1070, val: "16" },  
        { x: 140, y: 657, val: "x" },   
        { x: 237, y: 1073, val: "0" }   
    ];

    newBlocks.forEach(blockData => {
        let block = this.blocks.create(blockData.x, blockData.y, 'orb').setScale(3);
        block.play('orb-spin');
        block.setDrag(1000).setBounce(1).setCollideWorldBounds(true);
        block.setDepth(30);
        block.body.setSize(10, 15).setOffset(3, 1);
        block.value = blockData.val;

        let text = this.add.text(0, 0, blockData.val, { 
            fontSize: '24px', color: '#ffffff', stroke: '#000', strokeThickness: 4, fontFamily: 'Ithaca', fontStyle: 'bold' 
        }).setOrigin(0.5).setDepth(30);
        
        block.myText = text;
        block.updateText = function() { text.x = this.x; text.y = this.y; };
    });

    
    this.startLightsOutMechanic();
}

startLightsOutMechanic() {
    
    this.tweens.add({
        targets: this.darknessOverlay,
        alpha: 0.95, 
        duration: 2000,
        ease: 'Power2'
    });

    
    this.time.addEvent({
        delay: 5000, 
        loop: true,
        callback: () => {
            
            if (Math.random() > 0.5) {
                
                this.tweens.add({
                    targets: this.darknessOverlay,
                    alpha: 0.2, 
                    duration: 50,
                    yoyo: true,
                    repeat: 5, 
                    onComplete: () => {
                        this.darknessOverlay.setAlpha(0.95); 
                    }
                });
            } else {
                
                this.tweens.add({
                    targets: this.darknessOverlay,
                    alpha: 1, 
                    duration: 100,
                    yoyo: true,
                    hold: 500
                });
            }
        }
    });
}

}

class GameWon extends Phaser.Scene {
    constructor() { super('GameWon'); }

    create() {
        this.cameras.main.fadeIn(1000, 255, 255, 255);
        this.sound.play('victory_sfx'); 

        this.add.text(400, 150, 'EQUATION BALANCED', { fontSize: '56px', fill: '#00ff00', fontFamily: 'Ithaca', fontStyle: 'bold' }).setOrigin(0.5);
        this.add.text(400, 250, 'The Professor has been corrected.', { fontSize: '28px', fill: '#ffffff', fontFamily: 'Ithaca' }).setOrigin(0.5);
        
        this.add.text(400, 350, 'YOU ARE THE MASTER OF CALCULUS!', { fontSize: '32px', fill: '#ffff00', fontFamily: 'Ithaca' }).setOrigin(0.5);
        
        let returnBtn = this.add.text(400, 500, 'RETURN TO MAIN MENU', { fontSize: '24px', fill: '#0ff', fontFamily: 'Ithaca' }).setOrigin(0.5).setInteractive();

        returnBtn.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}

const config = {
    type: Phaser.AUTO,
    
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
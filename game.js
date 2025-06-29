// game.js

const emojiData = [
    { group: '0 : Starting Point', items: ['00 - Œuf 🥚'] },
    { group: '1-10 : Places', items: ['01 - Ville 🏙️', '02 - Montagne 🏔️', '03 - Plage 🏖️', '04 - Forêt 🌲', '05 - Jardin 🌺', '06 - Rivière 💦', '07 - Île 🏝️', '08 - Lac 🌊', '09 - Désert 🏜️', '10 - Prairie 🌻'] },
    { group: '11-20 : People', items: ['11 - Enfant 👦', '12 - Femme 👩', '13 - Homme 👨', '14 - Vieil Homme 👴', '15 - Vieille Femme 👵', '16 - Adolescent 🧒', '17 - Bébé 👶', '18 - Amoureux ❤️', '19 - Groupe 👨‍👩‍👧‍👦', '20 - Famille 👪'] },
    { group: '21-30 : Construction', items: ['21 - Maison 🏠', '22 - Immeuble 🏢', '23 - Pont 🌉', '24 - Tour 🏙️', '25 - Château 🏰', '26 - Eglise 🕍', '27 - Temple 🛕', '28 - Musée 🏛️', '29 - Hôtel 🏨', '30 - Stade 🏟️'] },
    { group: '31-40 : Instruments', items: ['31 - Guitare 🎸', '32 - Piano 🎹', '33 - Violon 🎻', '34 - Batterie 🥁', '35 - Saxophone 🎷', '36 - Clarinette 🎵', '37 - Flûte 🎶', '38 - Harmonie 🎺', '39 - Trompette 🎺', '40 - Harpe 🎻'] },
    { group: '41-50 : Bien-être', items: ['41 - Yoga 🧘‍♀️', '42 - Méditation 🕉️', '43 - Massage 💆‍♂️', '44 - Spa 🛀', '45 - Gymnastique 🏋️‍♀️', '46 - Natation 🏊‍♂️', '47 - Course 🏃‍♀️', '48 - Marche 🚶‍♂️', '49 - Vélo 🚴‍♀️', '50 - Pilates 🧘‍♂️'] },
    { group: '51-60 : Corps', items: ['51 - Tête 🤯', '52 - Yeux 👀', '53 - Oreilles 👂', '54 - Nez 👃', '55 - Bouche 👄', '56 - Dents 🦷', '57 - Langue 👅', '58 - Main 👋', '59 - Pied 👣', '60 - Doigt 🖐'] },
    { group: '61-70 : Véhicules', items: ['61 - Voiture 🚗', '62 - Moto 🏍️', '63 - Bateau 🚣', '64 - Avion ✈️', '65 - Train 🚂', '66 - Bus 🚌', '67 - Camion 🚚', '68 - Tracteur 🚜', '69 - Vélo 🚴‍♂️', '70 - Skate 🛹'] },
    { group: '71-80 : Météo', items: ['71 - Soleil ☀️', '72 - Lune 🌕', '73 - Pluie 🌧️', '74 - Neige ❄️', '75 - Vent 🌬️', '76 - Orage ⛈️', '77 - Éclair ⚡', '78 - Brume 🌫️', '79 - Nuage ☁️', '80 - Arc-en-ciel 🌈'] },
    { group: '81-90 : Vêtements', items: ['81 - Chemise 🕶️', '82 - Pantalon 👖', '83 - Jupe 👗', '84 - Robe 👗', '85 - Chaussures 👠', '86 - Sandales 👡', '87 - Bottes 👢', '88 - Chapeau 🎩', '89 - Lunettes 👓', '90 - Sac à main 👜'] },
    { group: '91-100 : Amour', items: ['91 - Cœur ❤️', '92 - Câlin 🤗', '93 - Baiser 💋', '94 - Mariage 💍', '95 - Cadeau 🎁', '96 - Fleur 💐', '97 - Chocolat 🍫', '98 - Dîner 🍽️', '99 - Film 🎬', '100 - Rire 😂'] }
];

// Helper function to extract just the emoji character from the string
function getEmojiChar(emojiString) {
    if (!emojiString) return '';
    const match = emojiString.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu);
    return match ? match[0] : '';
}

// Flatten the emoji list for easier lookup
const flatEmojiList = emojiData.flatMap(group => group.items.map(item => getEmojiChar(item)));

let game;
let mainScene;

class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.map = [
            '####################',
            '#P                 #',
            '# ############### ##',
            '# #             # ##',
            '# # ### ##### # # ##',
            '# # # #     # # # ##',
            '# # # ##### ### # ##',
            '# # #     # # # # ##',
            '# # ##### # # # # ##',
            '# # #     # # # # ##',
            '# # ######### # # ##',
            '# #           # # ##',
            '# ############# # ##',
            '#S                #', // S for Start/First Emoji
            '####################'
        ];
        this.tileSize = 40; // Size of each tile in pixels
        this.player = null;
        this.cursors = null;
        this.emojisGroup = null;
        this.currentEmojiIndex = 0;
        this.targetEmojiText = null;
        this.scoreText = null;
        this.gameOverText = null;
        this.playerSpeed = 160;
    }

    preload() {
        // No assets to load yet, emojis will be text objects
    }

    create() {
        this.cameras.main.setBackgroundColor('#333');

        // Create map
        this.createMap();

        // Create player
        this.createPlayer();

        // Setup input
        this.cursors = this.input.keyboard.createCursorKeys();

        // Create Emojis
        this.emojisGroup = this.physics.add.group();
        this.placeEmojis();

        // UI Text
        this.targetEmojiText = this.add.text(10, 10, `Collect: ${flatEmojiList[this.currentEmojiIndex]}`, { fontSize: '24px', fill: '#fff' });
        this.scoreText = this.add.text(this.game.config.width - 150, 10, 'Score: 0', { fontSize: '24px', fill: '#fff' });

        // Collision detection
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.overlap(this.player, this.emojisGroup, this.collectEmoji, null, this);

        this.gameOverText = this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'GAME OVER', { fontSize: '48px', fill: '#ff0000' })
            .setOrigin(0.5)
            .setVisible(false);
    }

    update() {
        if (this.gameOverText.visible) {
            this.player.setVelocity(0,0); // Stop player on game over
            return;
        }

        this.player.body.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-this.playerSpeed);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(this.playerSpeed);
        }

        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-this.playerSpeed);
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(this.playerSpeed);
        }
    }

    createMap() {
        this.walls = this.physics.add.staticGroup();
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                if (this.map[y][x] === '#') {
                    this.walls.create(x * this.tileSize + this.tileSize / 2, y * this.tileSize + this.tileSize / 2, null)
                        .setSize(this.tileSize, this.tileSize)
                        .setDisplaySize(this.tileSize, this.tileSize)
                        .setVisible(false); // Walls are invisible but collidable

                    // For debugging, make walls visible
                    // this.add.rectangle(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize, 0x555555).setOrigin(0);
                }
            }
        }
    }

    createPlayer() {
        let playerPos = this.findCharInMap('P');
        if (!playerPos) playerPos = { x: 1, y: 1 }; // Default if P not found

        this.player = this.physics.add.sprite(
            playerPos.x * this.tileSize + this.tileSize / 2,
            playerPos.y * this.tileSize + this.tileSize / 2,
            null // No image, we'll use a text object for the player
        );
        this.player.setSize(this.tileSize * 0.8, this.tileSize * 0.8); // Collision box
        this.player.setCollideWorldBounds(true);

        // Add a text object as the player's visual
        const playerEmoji = this.add.text(0, 0, '😀', { fontSize: `${this.tileSize * 0.7}px`, fill: '#FFF' }).setOrigin(0.5);
        // Container to hold player and its emoji text
        const playerContainer = this.add.container(this.player.x, this.player.y, [playerEmoji]);
        this.player.setData('container', playerContainer); // Link container to sprite
        this.player.on('destroy', () => playerContainer.destroy()); // Cleanup

        // Make container follow the physics sprite
        this.player.update = () => { // Override sprite update
            Phaser.GameObjects.Sprite.prototype.update.call(this.player);
            playerContainer.setPosition(this.player.x, this.player.y);
        };
    }

    findCharInMap(char) {
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                if (this.map[y][x] === char) {
                    return { x, y };
                }
            }
        }
        return null;
    }

    placeEmojis() {
        // For now, let's place the first few emojis.
        // A more robust system would be needed for all 100, ensuring paths.
        const emojiPositions = [
            this.findCharInMap('S'), // For 'Œuf 🥚'
            { x: 18, y: 1 }, // For 'Ville 🏙️'
            { x: 18, y: 13 }, // For 'Montagne 🏔️'
            { x: 1, y: 13 }, // For 'Plage 🏖️'
            // ... add more positions as needed, matching the map layout
        ];

        flatEmojiList.forEach((emojiChar, index) => {
            let pos = emojiPositions[index];
            if (pos) { // Only place if we have a predefined position
                const emojiSprite = this.emojisGroup.create(
                    pos.x * this.tileSize + this.tileSize / 2,
                    pos.y * this.tileSize + this.tileSize / 2,
                    null
                ).setVisible(false); // Sprite is invisible, text is the visual

                emojiSprite.setData('emojiChar', emojiChar);
                emojiSprite.setData('emojiIndex', index);

                const emojiText = this.add.text(emojiSprite.x, emojiSprite.y, emojiChar, { fontSize: `${this.tileSize * 0.7}px`, fill: '#FFF' }).setOrigin(0.5);
                emojiSprite.setData('textVisual', emojiText); // Keep a reference to remove it later
            }
        });
    }

    collectEmoji(player, emojiSprite) {
        const collectedEmojiIndex = emojiSprite.getData('emojiIndex');
        const collectedEmojiChar = emojiSprite.getData('emojiChar');

        if (collectedEmojiIndex === this.currentEmojiIndex) {
            // Correct emoji collected
            emojiSprite.getData('textVisual').destroy(); // Remove text visual
            emojiSprite.destroy(); // Remove physics body

            this.currentEmojiIndex++;
            this.scoreText.setText(`Score: ${this.currentEmojiIndex}`);

            if (this.currentEmojiIndex >= flatEmojiList.length) {
                // All emojis collected - WIN!
                this.gameOverText.setText('YOU WIN!').setColor('#00ff00').setVisible(true);
                // Potentially add a restart button or next level logic here
            } else {
                this.targetEmojiText.setText(`Collect: ${flatEmojiList[this.currentEmojiIndex]}`);
            }
        } else {
            // Incorrect emoji collected - GAME OVER
            this.gameOverText.setText('GAME OVER\nWrong Emoji!').setColor('#ff0000').setVisible(true);
            this.player.setTint(0xff0000); // Indicate error
            this.physics.pause(); // Stop game
            // Consider adding a restart mechanism
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800, // 20 tiles * 40px
    height: 600, // 15 tiles * 40px
    parent: 'phaser-game', // ID of the div to inject the canvas
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false // Set to true for collision debugging
        }
    },
    scene: [MainScene]
};

// Wait for the DOM to be ready before creating the game
window.onload = () => {
    mainScene = new MainScene(); // This is not how scenes are typically added, but for now it's fine.
                                // Phaser will instantiate it from the config.
    game = new Phaser.Game(config);
};

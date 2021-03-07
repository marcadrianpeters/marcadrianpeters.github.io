var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload(){
    this.load.setBaseURL('https://i.imgur.com/');

    this.load.image('background', 'ImiXDQK.png');
    this.load.image('pixel', '6r49alP.png');
}

function create(){
    var background = this.add.sprite(400, 300, 'background').setInteractive();
    var pixel = this.add.image(400,300,'pixel');

    background.on('pointerdown', function (pointer) {
        pixel.visible= !pixel.visible;
    });

    background.on('pointerout', function (pointer) {
        pixel.visible= !pixel.visible;
    });

    background.on('pointerup', function (pointer) {
        pixel.visible= !pixel.visible;
    });
}

function update(){

}

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
    this.load.setBaseURL('http://mapeters.me');

    this.load.image('background', 'png/background.png');
    this.load.image('pixel', 'png/pixel.png');
}

function create(){
    this.add.image(0, 0, 'background');
}

function update(){

}

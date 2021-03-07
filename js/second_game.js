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
    this.add.image(400, 300, 'background');
}

function update(){

}

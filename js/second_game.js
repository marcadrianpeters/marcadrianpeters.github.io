var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
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
var pixel_counter = 75;
var pixel;
var physics;

function preload(){
    this.load.setBaseURL('https://i.imgur.com/');

    this.load.image('background', 'ImiXDQK.png');
    this.load.image('pixel', '6r49alP.png');
}

function create(){
    var background = this.add.sprite(400, 300, 'background').setInteractive();
    physics = this.physics;
    this.physics.pause();

    pixel = this.physics.add.group({
        key: 'pixel',
        frame: [ 0],
        frameQuantity: 81
    });

    Phaser.Actions.SetVisible(pixel.getChildren(),false);

    Phaser.Actions.GridAlign(pixel.getChildren(), {
        width: 9,
        height: 9,
        cellWidth: 20,
        cellHeight: 20,
        x: 320,
        y: 220
    });

    background.on('pointerdown', function (pointer) {
        add_pixel(1);
    });

    visualize_pixel();
}

function add_pixel(number){
    pixel_counter += number;

    if(pixel_counter>81){
        //pixel_counter = 1;
        physics.resume();
    }

    visualize_pixel();
}

function visualize_pixel(){
    for(var i = 0; i <= pixel_counter; i++){
        Phaser.Actions.SetVisible(pixel.getChildren().slice(i+1,81),false);
        Phaser.Actions.SetVisible(pixel.getChildren().slice(0,i),true);
    }
}

function update(){

}

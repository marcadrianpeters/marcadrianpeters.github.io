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
var pixel_dimension = 9;
var pixel_counter = 0;
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

    var pixel_array = new Array(pixel_dimension);
    var spiral_array = spiralPrint(generate_2d_square_array(pixel_dimension));

    for(var i = 0; i < pixel_dimension; i++){
        pixel_array[i] = new Array(pixel_dimension);

        for(var j = 0; j < pixel_dimension; j++){
            pixel_array[i][j] = this.physics.add.sprite(i*16+100,j*16+100,'pixel');
            pixel_array[i][j].data = (9*i+j);
            pixel_array[i][j].visible = false;
        }
    }

    background.on('pointerdown', function (pointer) {           
        for(var i = 0; i < pixel_dimension; i++){
            for(var j = 0; j < pixel_dimension; j++){
                data = pixel_array[i][j].data;
                if(pixel_array[i][j].data == spiral_array[Math.floor(pixel_counter/pixel_dimension)][pixel_counter%pixel_dimension]){
                    pixel_array[i][j].visible = true;
                }
            }
        }
    add_pixel(1);
    });
}



function add_pixel(number){
    pixel_counter += number;

    if(pixel_counter>pixel_dimension*pixel_dimension-1){
        pixel_counter = 1;
        this.physics.resume();
    }

}

function update(){

}

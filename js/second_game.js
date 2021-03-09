var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },      
    audio: {
        disableWebAudio: true
    }
};

var game = new Phaser.Game(config);
var pixel_dimension =9;
var pixel_counter = 0;
var physics;
var time;
var pixel_array;
var spiral_array = spiralPrint(generate_2d_square_array(pixel_dimension));
var clickpower = 1;
var score = 0;
var explosion_sound;    
var music_status = 'off';
//var music_button;

function preload(){
    this.load.setBaseURL('https://i.imgur.com/');
    this.load.image('background', 'OjCucZz.png');
    this.load.image('pixel', '6r49alP.png');
    this.load.image('test_picture','a6ON9pp.png');
    this.load.image('shader','bWaVTbq.png');
    this.load.audio('theme', 'https://labs.phaser.io/assets/audio/Andrea_Milana_-_Harlequin_-_The_Clockworks_-_Electribe_MX_REMIX.ogg');
    this.load.audio('click_sound','https://labs.phaser.io/assets/audio/SoundEffects/steps2.mp3');
    this.load.audio('explosion_sound','https://labs.phaser.io/assets/audio/SoundEffects/explode1.wav');
}

function create(){
    var background = this.add.sprite(400, 300, 'background').setInteractive();
    this.add.sprite(400,300,'shader');
    physics = this.physics;
    time = this.time;
    scene = this.scene;
    this.physics.pause();

    music_button = this.add.text(680,10, '').setInteractive();
    text = this.add.text(10, 10, '',);
    var theme = this.sound.add('theme', {volume: 0.1, loop: true});
    var click_sound = this.sound.add('click_sound', {volume: 0.1});
    explosion_sound = this.sound.add('explosion_sound', {volume: 0.05});

    /*
    graphics = this.add.graphics({ lineStyle: { width: 1, color: 0xaa00aa } });
    var line = new Phaser.Geom.Line(0, 300, 800, 300);
    var line2 = new Phaser.Geom.Line(400, 0, 400, 600);
    graphics.strokeLineShape(line);
    graphics.strokeLineShape(line2);
    */
    
    var physic_array = [];
    pixel_array = new Array(pixel_dimension);
 

    for(var i = 0; i < pixel_dimension; i++){
        pixel_array[i] = new Array(pixel_dimension);    

        for(var j = 0; j < pixel_dimension; j++){
            //pixel_array[i][j] = this.physics.add.sprite(i*16+400-(pixel_dimension-1)*8,j*16+300-(pixel_dimension-1)*8,'pixel').setBounce(0.9,0.9);
            pixel_array[i][j] = this.physics.add.sprite(400,300,'test_picture').setCrop(16*i,16*j,16,16).setBounce(0.9,0.9);
            pixel_array[i][j].data = (9*i+j);
            pixel_array[i][j].visible = false;
            pixel_array[i][j].setVelocity(Phaser.Math.Between(-350, 350),Phaser.Math.Between(-200, 200));
            //pixel_array[i][j].body.setCollideWorldBounds(true);
            pixel_array[i][j].body.setSize(16,16);
            pixel_array[i][j].body.setOffset(16*i, 16*j);
            physic_array.push(pixel_array[i][j]);
        }
    }

    this.physics.add.collider(physic_array);
    
    background.on('pointerdown', function(pointer){           
    add_pixel(clickpower);
    click_sound.play();
    });

    music_button.on('pointerdown', function(pointer){
        if(music_status == 'off'){
            music_status = 'on';
            theme.play();
        } else {
            music_status = 'off';
            theme.stop();
        }
    });

    music_button.on('pointerover',function(pointer){
        music_button.setStroke('black',2);
    });

    music_button.on('pointerout',function(pointer){
        music_button.setStroke('black',0);
    });
}

function add_pixel(number){
    pixel_counter += number;
}

function update(){
    if(pixel_counter>pixel_dimension*pixel_dimension-1){
        pixel_counter = 0;
        explosion_sound.play();
        this.physics.resume();
        score++;
        this.time.addEvent({delay:2000, callback: function(){
            physics.pause();
            for(var i = 0; i < pixel_dimension; i++){
                for(var j = 0; j < pixel_dimension; j++){
                    pixel_array[i][j].visible = false;
                    pixel_array[i][j].x = 400;
                    pixel_array[i][j].y = 300;
                    pixel_array[i][j].setVelocity(Phaser.Math.Between(-350, 350),Phaser.Math.Between(-200, 200));
                }
            }
        }, callBackScope: game, loop: false});
    }

    for(var i = 0; i < pixel_dimension; i++){
        for(var j = 0; j < pixel_dimension; j++){
            data = pixel_array[i][j].data;
            for(var k = Math.floor(pixel_counter); k >= 0; k--){
                if(pixel_array[i][j].data == spiral_array[Math.floor(k/pixel_dimension)][k%pixel_dimension]){
                    pixel_array[i][j].visible = true;
                }
            }
        }
    }

    clickpower = Math.log(score+1)+1;
    text.setText("Score: "+ score+"\n\nClickpower: "+clickpower);
    music_button.setText("music: "+ music_status);

}

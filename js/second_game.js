var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
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
var pixel_array = [];
var pixel_dimension =9;
var time;
var scene;
//var pixel_array;
var spiral_array = spiralPrint(generate_2d_square_array(pixel_dimension));
var clickpower = 1;
var score = 0;
var explosion_sound;    
var music_status = 'off';

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
    scene = this;
    //print_2d_array(spiralPrint(generate_2d_square_array(pixel_dimension)));
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
   
    
    pixel_array.push(new Picture(scene,400,300,pixel_dimension,'test_picture',144));
    
    background.on('pointerdown', function(pointer){   
        for(element of pixel_array){
            if(element.active){
                element.add_click(clickpower);
                click_sound.play();
            } else {
                pixel_array.shift();
                pixel_array.push(new Picture(scene,400,300,pixel_dimension,'test_picture',144));    
                score++;
            }
        }
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

function update(){
    clickpower = Math.log(score+1)+1;
    //clickpower = 20;
    text.setText("Score: "+ score+"\n\nClickpower: "+clickpower);
    music_button.setText("music: "+ music_status);
}
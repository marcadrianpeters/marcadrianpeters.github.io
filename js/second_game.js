var config = {
    type: Phaser.AUTO,
    pixelArt: true,
    scale: {
        width: window.innerWidth,
        height: window.innerHeight,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT,
    },
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
var cutter = 0;
var pixel_dimension = 4 + cutter;
var time;
var scene;
//var pixel_array;
var clickpower = 1;
var score = 1;
var explosion_sound;    
var music_status = 'off';
var text_size = 30;
var clickpower_cost = 1;


function preload(){
    this.load.setBaseURL('https://i.imgur.com/');
    this.load.image('background', 'OjCucZz.png');
    this.load.image('pixel', '6r49alP.png');
    this.load.image('test_picture','RNh7XSd.png');
    this.load.image('shader','bWaVTbq.png');
    this.load.audio('theme', 'https://labs.phaser.io/assets/audio/Andrea_Milana_-_Harlequin_-_The_Clockworks_-_Electribe_MX_REMIX.ogg');
    this.load.audio('click_sound','https://labs.phaser.io/assets/audio/SoundEffects/steps2.mp3');
    this.load.audio('explosion_sound','https://labs.phaser.io/assets/audio/SoundEffects/explode1.wav');
}

function create(){
    var background = this.add.sprite(game.config.width/2, game.config.height/2, 'background').setInteractive();
    background.scaleX = game.config.width/background.width;
    background.scaleY = game.config.height/background.height;
    this.input.mouse.disableContextMenu();
    
    this.add.sprite(game.config.width/2, game.config.height/2,'shader').setScale(2);

    physics = this.physics;
    time = this.time;
    scene = this;

    if(localStorage["save"]){
        var save_file = JSON.parse(localStorage["save"]);
        score = save_file["score"];
        clickpower = save_file["clickpower"];
        clickpower_cost = save_file["clickpower_cost"];
        cutter = save_file["cutter"];
        pixel_dimension = 4 + cutter;
    }

    music_button = this.add.text(game.config.width-20,10, '').setInteractive();
    music_button.setAlign('right');
    music_button.setOrigin(1,0);
    music_button.setFontSize(text_size);

    reset_button = this.add.text(game.config.width-20,10+1.5*text_size, 'reset').setInteractive();
    reset_button.setAlign('right');
    reset_button.setOrigin(1,0);
    reset_button.setFontSize(text_size);

    score_text = this.add.text(20, 10,"");
    score_text.setFontSize(text_size);

    clickpower_button = this.add.text(20,10+1.5*text_size, "" + clickpower).setInteractive();
    clickpower_button.setFontSize(text_size);

    cutter_button = this.add.text(20,10+2*1.5*text_size, "" + cutter).setInteractive();
    cutter_button.setFontSize(text_size);


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
   
    pixel_array.push(new Picture(scene,game.config.width/2, game.config.height/2,pixel_dimension,'test_picture',288));
    
    background.on('pointerdown', function(pointer){   
        for(element of pixel_array){            
            if(element.active){
                element.add_click(clickpower);
                click_sound.play();
            } 

            if(!element.active){
                pixel_array.shift();
                //pixel_dimension = Math.ceil(Math.random()*13+1);
                score += pixel_dimension * pixel_dimension - (1+7*(pixel_dimension-2));
                pixel_dimension = 4 + cutter;
                pixel_array.push(new Picture(scene,game.config.width/2, game.config.height/2,pixel_dimension,'test_picture',288));    
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
        music_button.setStroke('black',1);
    });

    music_button.on('pointerout',function(pointer){
        music_button.setStroke('black',0);
    });

    reset_button.on('pointerdown',function(pointer){
        score = 1;
        clickpower = 1;
        clickpower_cost = 1;
        cutter = 0;
    });

    reset_button.on('pointerover',function(pointer){
        reset_button.setStroke('black',1);
    });

    reset_button.on('pointerout',function(pointer){
        reset_button.setStroke('black',0);
    });

    cutter_button.on('pointerdown',function(pointer){
        if(score >  Math.pow(2,cutter+1)){
            score -=  Math.pow(2,cutter+1);
            cutter++;
       }
    });

    cutter_button.on('pointerover',function(pointer){
        cutter_button.setStroke('black',1);
    });

    cutter_button.on('pointerout',function(pointer){
        cutter_button.setStroke('black',0);
    });

    clickpower_button.on('pointerdown',function(pointer){
        if(score >  clickpower_cost){
            score -=  clickpower_cost;
            clickpower = 1+Math.log(clickpower_cost+1);
            clickpower_cost++;
       }
     });
 
     clickpower_button.on('pointerover',function(pointer){
        clickpower_button.setStroke('black',1);
     });
 
     clickpower_button.on('pointerout',function(pointer){
        clickpower_button.setStroke('black',0);
     });
}

function update(){
    score_text.setText("Credit: "+ score + " PXL  (+" + (pixel_dimension * pixel_dimension - (1+7*(pixel_dimension-2))) + " PXL)");
    clickpower_button.setText("Buy Clickpower (" + -clickpower_cost + " PXL): " + clickpower);
    cutter_button.setText( "Buy Cutter (" + -Math.pow(2,cutter+1) + " PXL): " + "add " + (2*(cutter+4)+1) + " more tiles and " + (2*(cutter+4)-6)  + " more PXL reward");
    music_button.setText("music: "+ music_status);
    
    localStorage["save"] = JSON.stringify({"score": score, "clickpower": clickpower, "clickpower_cost": clickpower_cost, "cutter": cutter});
}
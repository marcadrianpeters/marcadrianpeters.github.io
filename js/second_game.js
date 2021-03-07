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
    //this.load.setBaseURL('https://drive.google.com/drive/folders/1dHG8DJeliY95Uj1c-ZojEwHWqXQj914E?usp=sharing');

    this.load.image('background', 'https://i.imgur.com/RyLWxJc.png');
    this.load.image('pixel', 'https://drive.google.com/file/d/1vq7m35pBAP-Uwfo8EFeYK2NBKF9-Jjw3/view?usp=sharing');
}

function create(){
    this.add.image(0, 0, 'background');
}

function update(){

}

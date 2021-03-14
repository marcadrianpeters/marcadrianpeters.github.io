class Picture extends Phaser.GameObjects.Sprite{
    constructor(scene, x_position, y_position, squares_per_line, image, image_height){
        super(scene,x_position,y_position+1000,image);

        this.click_counter = 0;
        this.squares_per_line = squares_per_line;
        this.image_array = new Array(squares_per_line);
        this.active = true;
        this.visible = false;
        this.spiral_array = spiralPrint(generate_2d_square_array(pixel_dimension));
        scene.physics.add.existing(this);
        scene.add.existing(this);

        var square_height = image_height/squares_per_line;

        for(var i = 0; i < squares_per_line; i++){            
            this.image_array[i] = new Array(squares_per_line);

            for(var j = 0; j < squares_per_line; j++){  
                this.image_array[i][j] = scene.physics.add.sprite(x_position,y_position,image);
                this.image_array[i][j].setCrop(Math.floor(i*square_height),Math.floor(j*square_height),Math.floor((i+1)*square_height)-Math.floor(i*square_height),Math.floor((j+1)*square_height)-Math.floor(j*square_height));
                this.image_array[i][j].setBounce(0.9,0.9);
                this.image_array[i][j].data = (squares_per_line*i+j);
                this.image_array[i][j].visible = false;
                this.image_array[i][j].setAcceleration(0,-1000);
                this.image_array[i][j].body.setSize(Math.floor((i+1)*square_height)-Math.floor(i*square_height),Math.floor((j+1)*square_height)-Math.floor(j*square_height));
                this.image_array[i][j].body.setOffset(Math.floor(i*square_height), Math.floor(j*square_height));
            }
        }

        for(var i = 0; i < squares_per_line; i++){
            for(var j = 0; j < squares_per_line; j++){
                physics.add.collider(this.image_array[i],this.image_array[j]);
            }
        }

        this.update();
    }  
    
    add_click(number){
        this.click_counter += number;
        this.update();
    }

    visualize(){
        for(var i = 0; i < this.squares_per_line; i++){
            for(var j = 0; j < this.squares_per_line; j++){
                for(var k = Math.floor(this.click_counter); k >= 0; k--){
                    if(this.image_array[i][j].data == this.spiral_array[Math.floor(k/this.squares_per_line)][k%this.squares_per_line]){
                        this.image_array[i][j].visible = true;
                    }
                }
            }
        }
    }

    update(){
        if(this.click_counter>this.squares_per_line*this.squares_per_line-1){
            explosion_sound.play();
            this.active = false;

            for(var i = 0; i < this.squares_per_line; i++){
                for(var j = 0; j < this.squares_per_line; j++){
                    this.image_array[i][j].visible = true;
                    this.image_array[i][j].setVelocity(Phaser.Math.Between(-350, 350),Phaser.Math.Between(-200, 200));
                    this.image_array[i][j].setAcceleration(0,0);
                    //this.image_array[i][j].setVelocity(Phaser.Math.Between(-100, 100),Phaser.Math.Between(-100, 100));
                }
            }
        } else {
            this.visualize();
        }
    }
}

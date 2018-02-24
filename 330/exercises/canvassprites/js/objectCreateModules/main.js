import {createCircleSprites,createSquareSprites,createImageSprites, createImageShrinkSprites} from './classes.js';
export {init};

const ctx = document.querySelector("canvas").getContext("2d");
const screenWidth = 600;
const screenHeight = 400;
let sprites = [];

function init(){
    let margin = 50;
    let rect = {left: margin, top: margin, width: screenWidth - margin*2, height: screenHeight-100*2}
    sprites = sprites.concat(createCircleSprites(5, rect, 10, 'orange'),
                             createCircleSprites(5, rect, 15, 'green'),
                             createSquareSprites(3,rect, 20, 10, 'yellow'),
                             createSquareSprites(1,rect, 30, 30, 'white'),
                             createImageSprites(1, rect, 70, 70, 'images/reddit.png'),
                             createImageSprites(4, rect, 30, 30, 'images/downvote.png'),
                             createImageSprites(7, rect, 60, 60,
                             'images/ealogo.png'),
                             createImageShrinkSprites(10, rect, 70, 70, 10, 'images/money.png'),
                             createImageShrinkSprites(3, rect, 150, 50, 10, 'images/bf2logo.png')
                            );
    loop();
}

function loop(){
    // schedule a call to loop() in 1/60th of a second
    requestAnimationFrame(loop);

    // draw background
	ctx.fillStyle = 'black';
    ctx.fillRect(0,0,screenWidth,screenHeight)

    // loop through sprites
    for (let s of sprites){
        // move sprites
        s.move();

        // check sides and bounce
        if(s.radius)
        {
            // a circle
            if (s.x <= s.radius || s.x >= screenWidth-s.radius){
                s.reflectX();
                s.move();
            }
            if (s.y <= s.radius || s.y >= screenHeight-s.radius){
                s.reflectY();
                s.move();
            }
        }
        else
        { // `s` is NOT a circle
            // left and right
            if (s.x <= 0 || s.x >= screenWidth-s.width){
                s.reflectX();
                s.move();
            }

            // top and bottom
            if(s.y <=0 || s.y > screenHeight - s.height)
            {
                s.reflectY();
                s.move();
            }

        } // end if s.radius

        // draw sprites
        s.draw(ctx);

    } // end for
} // end loop()
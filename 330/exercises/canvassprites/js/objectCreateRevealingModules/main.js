"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

app.main = (function(){
	console.log("main.js module loaded");

const ctx = document.querySelector("canvas").getContext("2d");
const screenWidth = 600;
const screenHeight = 400;
let sprites = [];
let classes = app.classes; // ALIAS

function init(){
    let margin = 50;
    let rect = {left: margin, top: margin, width: screenWidth - margin*2, height: screenHeight-100*2}
    sprites = sprites.concat(classes.createCircleSprites(5, rect, 10, 'orange'),
                             classes.createCircleSprites(5, rect, 15, 'green'),
                             classes.createSquareSprites(3,rect, 20, 10, 'yellow'),
                             classes.createSquareSprites(1,rect, 30, 30, 'white'),
                             classes.createImageSprites(1, rect, 70, 70, 'images/reddit.png'),
                             classes.createImageSprites(4, rect, 30, 30, 'images/downvote.png'),
                             classes.createImageSprites(7, rect, 60, 60,
                             'images/ealogo.png'),
                             classes.createImageShrinkSprites(10, rect, 70, 70, 10, 'images/money.png'),
                             classes.createImageShrinkSprites(3, rect, 150, 50, 10, 'images/bf2logo.png')
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
	
	
	
	// export a public interface to this module
	return{
		init: init,
	};
	
}());
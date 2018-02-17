"use strict";
// these variables are in "Script scope" and will be available in this and other .js files
const ctx = document.querySelector("canvas").getContext("2d");
const screenWidth = 600;
const screenHeight = 400;
let sprites = []; // an array to hold all of our sprites


init();

function init()
{
	let sprites1 = createSprites(10,10,"fuchsia");
	let sprites2 = createSprites(20,20,"orange");
	let sprites3 = createSprites(2,50,"white");
	
	sprites = sprites1.concat(sprites2).concat(sprites3);
	loop();
}

function loop(){
	// schedule a call to loop() in 1/60th of a second
	requestAnimationFrame(loop);

	// draw background
	ctx.fillRect(0,0,screenWidth,screenHeight)

	// loop through sprites
	for (let s of sprites){

		// move sprites
		s.move();

		// check sides and bounce
		if (s.x <= s.radius || s.x >= screenWidth-s.radius){
			s.reflectX();
			s.move();
		}
		if (s.y <= s.radius || s.y >= screenHeight-s.radius){
			s.reflectY();
			s.move();
		}

		// draw sprites
		s.draw(ctx);

	} // end for
} // end loop()
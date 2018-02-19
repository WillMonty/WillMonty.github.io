//This script separates the bouncing circles from the main visualizer code
"use strict";

let sprites = []; // an array to hold all of our sprites


function circleInit()
{
	let sprites1 = createSprites(30,40,"green");
	let sprites2 = createSprites(4,70,"black");

	sprites = sprites1.concat(sprites2);
}

function circleUpdate()
{
	// loop through sprites
	for (let s of sprites)
	{

		// move sprites
		s.move();

		// check sides and bounce
		if (s.x <= s.radius || s.x >= backCanvas.width-s.radius){
			s.reflectX();
			s.move();
		}
		if (s.y <= s.radius || s.y >= backCanvas.height-(s.radius * 2)){
			s.reflectY();
			s.move();
		}

		s.speed = 10 * controls.speedFactor * bassPercent;

		//Make gradient for this circle
		let grad = ctx.createRadialGradient(s.x, s.y, s.radius, s.x, s.y, (s.radius/1.2 * bassPercent));
		// draw sprites
		s.draw(backCtx, grad);

	}
}

function createSprites(num=20, radius=20, color="red"){
	// create array to hold circles
	let sprites = [];
	for(let i=0;i<num;i++){
		// create Object literal
		let s = { };

		// add properties
		s.radius = radius;
		s.color = color;
		s.x = Math.random() * (backCanvas.width - (radius * 2));
		s.y = Math.random() * (backCanvas.height - (radius * 2));
		s.fwd = getRandomUnitVector();
		s.speed = 1;

		//add methods
		s.draw = function(ctx, gradient){
			ctx.save();
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
			ctx.closePath();

			gradient.addColorStop(0, 'white');
			gradient.addColorStop(1, color);

			ctx.fillStyle = gradient;
			ctx.fill();
			ctx.restore();
		};

		// move
		s.move = function(){
			this.x += this.fwd.x * this.speed;
			this.y += this.fwd.y * this.speed;
		};

		// bounce on left/right
		s.reflectX = function(){
			this.fwd.x *= -1;
		}

		// bounce on top/bottom
		s.reflectY = function(){
			this.fwd.y *= -1;
		}

		// add to array
		sprites.push(s);
	}

	// return entire array
	return sprites;
}


//Utility functions
function getRandomUnitVector(){
	let x = getRandom(-1,1);
	let y = getRandom(-1,1);
	let length = Math.sqrt(x*x + y*y);
	if(length == 0){ // very unlikely
		x=1; // point right
		y=0;
		length = 1;
	} else{
		x /= length;
		y /= length;
	}

	return {x:x, y:y};
}

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}
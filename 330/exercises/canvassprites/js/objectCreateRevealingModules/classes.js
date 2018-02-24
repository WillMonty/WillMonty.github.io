"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

app.classes = (function(){
	console.log("classes.js module loaded");

class Sprite{
	constructor(){
		this.x = 0;
		this.y = 0;
		this.fwd = {};
		this.speed = 0;
	}

	move()
	{
		this.x += this.fwd.x * this.speed;
		this.y += this.fwd.y * this.speed;
	}

	reflectX()
	{
		this.fwd.x *= -1;
	}

	reflectY()
	{
		this.fwd.y *= -1;
	}
}

class CircleSprite extends Sprite{
	constructor(rect={left,top,width,height}, radius = 20, color = 'red'){
		super();
		this.radius = radius;
		this.color = color;
		this.x = Math.random() * rect.width + rect.left;
		this.y = Math.random() * rect.height + rect.top;
		this.fwd = getRandomUnitVector();
		this.speed = 2;
	}

	draw(ctx){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		ctx.closePath();
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.restore();
	}
}

class SquareSprite extends CircleSprite{
	constructor(rect={left,top,width,height}, width = 25, height = 25, color = 'red'){
		super(rect, width, color);
		this.width = width;
		this.height = height;
	}

	draw(ctx){
		ctx.save();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.restore();
	}
}

class ImageSprite extends SquareSprite{
	constructor(rect={left,top,width,height}, width = 50, height = 50, url='images/Sean.png'){

		super(rect, width, height, 'red');
		this.image = new Image(width, height);
		this.image.src = url;
	}

	draw(ctx){
		ctx.save();
		ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
		ctx.restore();
	}
}

class ImageShrinkSprite extends ImageSprite{
	constructor(rect={left,top,width,height}, width = 50, height = 50, shrinkRate = 10, url='images/Sean.png'){
		super(rect, width, height, url);
		this.image = new Image(width, height);
		this.image.src = url;
		this.shrinkRate = shrinkRate;
	}
	
	reflectX(){
		this.fwd.x *= -1;
		this.width = this.width - this.shrinkRate;
		this.height = this.height - this.shrinkRate;
	}

	reflectY(){
		this.fwd.y *= -1;
		this.width = this.width - this.shrinkRate;
		this.height = this.height - this.shrinkRate;
	}

	draw(ctx){

		if(this.width <= 0 || this.height <= 0)
		{
			this.speed = 0;
			this.fwd.x = 0;
			this.fwd.y = 0;
			return;            
		}

		ctx.save();
		ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
		ctx.restore();

	}
}

function createCircleSprites(num=20, rect={left:0,top:0,width:300,height:300}, radius=20, color='red'){
	let sprites = [];
	for(let i=0;i<num;i++){

		let s = new CircleSprite(rect, radius, color);
		sprites.push(s);
	}

	return sprites; 
}

function createSquareSprites(num=20,rect={left:0,top:0,width:300,height:300}, width=25, height=25, color='red'){
	let sprites = [];
	for(let i=0;i<num;i++){

		let s = new SquareSprite(rect, width, height, color);
		sprites.push(s);
	}

	return sprites; 
}

function createImageSprites(num=20,rect={left:0,top:0,width:300,height:300}, width=50, height=50, url='images/Sean.png'){
	let sprites = [];
	for(let i=0;i<num;i++){

		let s = new ImageSprite(rect, width, height, url);
		sprites.push(s);
	}

	return sprites; 
}

//Makes an image that shrinks itself every bounce. Eventually stops drawing when small enough
function createImageShrinkSprites(num=20,rect={left:0,top:0,width:300,height:300}, width=50, height=50, shrinkRate=10, url='images/Sean.png'){
	let sprites = [];
	for(let i=0;i<num;i++){

		let s = new ImageShrinkSprite(rect, width, height, shrinkRate, url);
		sprites.push(s);
	}

	return sprites; 
}
	
	// export a public interface to this module
	return{
		createCircleSprites: createCircleSprites,
		createSquareSprites: createSquareSprites,
		createImageSprites:  createImageSprites,
		createImageShrinkSprites: createImageShrinkSprites
	};
	
}());
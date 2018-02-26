/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/classes.js":
/*!***********************!*\
  !*** ./js/classes.js ***!
  \***********************/
/*! exports provided: createCircleSprites, createSquareSprites, createImageSprites, createImageShrinkSprites */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createCircleSprites\", function() { return createCircleSprites; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createSquareSprites\", function() { return createSquareSprites; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createImageSprites\", function() { return createImageSprites; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createImageShrinkSprites\", function() { return createImageShrinkSprites; });\n/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities.js */ \"./js/utilities.js\");\n\n\n\nclass Sprite{\n\tconstructor(){\n\t\tthis.x = 0;\n\t\tthis.y = 0;\n\t\tthis.fwd = {};\n\t\tthis.speed = 0;\n\t}\n\n\tmove()\n\t{\n\t\tthis.x += this.fwd.x * this.speed;\n\t\tthis.y += this.fwd.y * this.speed;\n\t}\n\n\treflectX()\n\t{\n\t\tthis.fwd.x *= -1;\n\t}\n\n\treflectY()\n\t{\n\t\tthis.fwd.y *= -1;\n\t}\n}\n\nclass CircleSprite extends Sprite{\n\tconstructor(rect={left,top,width,height}, radius = 20, color = 'red'){\n\t\tsuper();\n\t\tthis.radius = radius;\n\t\tthis.color = color;\n\t\tthis.x = Math.random() * rect.width + rect.left;\n\t\tthis.y = Math.random() * rect.height + rect.top;\n\t\tthis.fwd = Object(_utilities_js__WEBPACK_IMPORTED_MODULE_0__[\"getRandomUnitVector\"])();\n\t\tthis.speed = 2;\n\t}\n\n\tdraw(ctx){\n\t\tctx.beginPath();\n\t\tctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);\n\t\tctx.closePath();\n\t\tctx.fillStyle = this.color;\n\t\tctx.fill();\n\t\tctx.restore();\n\t}\n}\n\nclass SquareSprite extends CircleSprite{\n\tconstructor(rect={left,top,width,height}, width = 25, height = 25, color = 'red'){\n\t\tsuper(rect, width, color);\n\t\tthis.width = width;\n\t\tthis.height = height;\n\t}\n\n\tdraw(ctx){\n\t\tctx.save();\n\t\tctx.fillStyle = this.color;\n\t\tctx.fillRect(this.x, this.y, this.width, this.height);\n\t\tctx.restore();\n\t}\n}\n\nclass ImageSprite extends SquareSprite{\n\tconstructor(rect={left,top,width,height}, width = 50, height = 50, url='images/Sean.png'){\n\n\t\tsuper(rect, width, height, 'red');\n\t\tthis.image = new Image(width, height);\n\t\tthis.image.src = url;\n\t}\n\n\tdraw(ctx){\n\t\tctx.save();\n\t\tctx.drawImage(this.image,this.x,this.y,this.width,this.height);\n\t\tctx.restore();\n\t}\n}\n\nclass ImageShrinkSprite extends ImageSprite{\n\tconstructor(rect={left,top,width,height}, width = 50, height = 50, shrinkRate = 10, url='images/Sean.png'){\n\t\tsuper(rect, width, height, url);\n\t\tthis.image = new Image(width, height);\n\t\tthis.image.src = url;\n\t\tthis.shrinkRate = shrinkRate;\n\t}\n\t\n\treflectX(){\n\t\tthis.fwd.x *= -1;\n\t\tthis.width = this.width - this.shrinkRate;\n\t\tthis.height = this.height - this.shrinkRate;\n\t}\n\n\treflectY(){\n\t\tthis.fwd.y *= -1;\n\t\tthis.width = this.width - this.shrinkRate;\n\t\tthis.height = this.height - this.shrinkRate;\n\t}\n\n\tdraw(ctx){\n\n\t\tif(this.width <= 0 || this.height <= 0)\n\t\t{\n\t\t\tthis.speed = 0;\n\t\t\tthis.fwd.x = 0;\n\t\t\tthis.fwd.y = 0;\n\t\t\treturn;            \n\t\t}\n\n\t\tctx.save();\n\t\tctx.drawImage(this.image,this.x,this.y,this.width,this.height);\n\t\tctx.restore();\n\n\t}\n}\n\nfunction createCircleSprites(num=20, rect={left:0,top:0,width:300,height:300}, radius=20, color='red'){\n\tlet sprites = [];\n\tfor(let i=0;i<num;i++){\n\n\t\tlet s = new CircleSprite(rect, radius, color);\n\t\tsprites.push(s);\n\t}\n\n\treturn sprites; \n}\n\nfunction createSquareSprites(num=20,rect={left:0,top:0,width:300,height:300}, width=25, height=25, color='red'){\n\tlet sprites = [];\n\tfor(let i=0;i<num;i++){\n\n\t\tlet s = new SquareSprite(rect, width, height, color);\n\t\tsprites.push(s);\n\t}\n\n\treturn sprites; \n}\n\nfunction createImageSprites(num=20,rect={left:0,top:0,width:300,height:300}, width=50, height=50, url='images/Sean.png'){\n\tlet sprites = [];\n\tfor(let i=0;i<num;i++){\n\n\t\tlet s = new ImageSprite(rect, width, height, url);\n\t\tsprites.push(s);\n\t}\n\n\treturn sprites; \n}\n\n//Makes an image that shrinks itself every bounce. Eventually stops drawing when small enough\nfunction createImageShrinkSprites(num=20,rect={left:0,top:0,width:300,height:300}, width=50, height=50, shrinkRate=10, url='images/Sean.png'){\n\tlet sprites = [];\n\tfor(let i=0;i<num;i++){\n\n\t\tlet s = new ImageShrinkSprite(rect, width, height, shrinkRate, url);\n\t\tsprites.push(s);\n\t}\n\n\treturn sprites; \n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9jbGFzc2VzLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vanMvY2xhc3Nlcy5qcz9iZDZiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Z2V0UmFuZG9tVW5pdFZlY3Rvcn0gZnJvbSAnLi91dGlsaXRpZXMuanMnO1xuZXhwb3J0IHtjcmVhdGVDaXJjbGVTcHJpdGVzLGNyZWF0ZVNxdWFyZVNwcml0ZXMsY3JlYXRlSW1hZ2VTcHJpdGVzLCBjcmVhdGVJbWFnZVNocmlua1Nwcml0ZXN9O1xuXG5jbGFzcyBTcHJpdGV7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0dGhpcy54ID0gMDtcblx0XHR0aGlzLnkgPSAwO1xuXHRcdHRoaXMuZndkID0ge307XG5cdFx0dGhpcy5zcGVlZCA9IDA7XG5cdH1cblxuXHRtb3ZlKClcblx0e1xuXHRcdHRoaXMueCArPSB0aGlzLmZ3ZC54ICogdGhpcy5zcGVlZDtcblx0XHR0aGlzLnkgKz0gdGhpcy5md2QueSAqIHRoaXMuc3BlZWQ7XG5cdH1cblxuXHRyZWZsZWN0WCgpXG5cdHtcblx0XHR0aGlzLmZ3ZC54ICo9IC0xO1xuXHR9XG5cblx0cmVmbGVjdFkoKVxuXHR7XG5cdFx0dGhpcy5md2QueSAqPSAtMTtcblx0fVxufVxuXG5jbGFzcyBDaXJjbGVTcHJpdGUgZXh0ZW5kcyBTcHJpdGV7XG5cdGNvbnN0cnVjdG9yKHJlY3Q9e2xlZnQsdG9wLHdpZHRoLGhlaWdodH0sIHJhZGl1cyA9IDIwLCBjb2xvciA9ICdyZWQnKXtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMucmFkaXVzID0gcmFkaXVzO1xuXHRcdHRoaXMuY29sb3IgPSBjb2xvcjtcblx0XHR0aGlzLnggPSBNYXRoLnJhbmRvbSgpICogcmVjdC53aWR0aCArIHJlY3QubGVmdDtcblx0XHR0aGlzLnkgPSBNYXRoLnJhbmRvbSgpICogcmVjdC5oZWlnaHQgKyByZWN0LnRvcDtcblx0XHR0aGlzLmZ3ZCA9IGdldFJhbmRvbVVuaXRWZWN0b3IoKTtcblx0XHR0aGlzLnNwZWVkID0gMjtcblx0fVxuXG5cdGRyYXcoY3R4KXtcblx0XHRjdHguYmVnaW5QYXRoKCk7XG5cdFx0Y3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIDAsIE1hdGguUEkqMiwgZmFsc2UpO1xuXHRcdGN0eC5jbG9zZVBhdGgoKTtcblx0XHRjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcblx0XHRjdHguZmlsbCgpO1xuXHRcdGN0eC5yZXN0b3JlKCk7XG5cdH1cbn1cblxuY2xhc3MgU3F1YXJlU3ByaXRlIGV4dGVuZHMgQ2lyY2xlU3ByaXRle1xuXHRjb25zdHJ1Y3RvcihyZWN0PXtsZWZ0LHRvcCx3aWR0aCxoZWlnaHR9LCB3aWR0aCA9IDI1LCBoZWlnaHQgPSAyNSwgY29sb3IgPSAncmVkJyl7XG5cdFx0c3VwZXIocmVjdCwgd2lkdGgsIGNvbG9yKTtcblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdH1cblxuXHRkcmF3KGN0eCl7XG5cdFx0Y3R4LnNhdmUoKTtcblx0XHRjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcblx0XHRjdHguZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcblx0XHRjdHgucmVzdG9yZSgpO1xuXHR9XG59XG5cbmNsYXNzIEltYWdlU3ByaXRlIGV4dGVuZHMgU3F1YXJlU3ByaXRle1xuXHRjb25zdHJ1Y3RvcihyZWN0PXtsZWZ0LHRvcCx3aWR0aCxoZWlnaHR9LCB3aWR0aCA9IDUwLCBoZWlnaHQgPSA1MCwgdXJsPSdpbWFnZXMvU2Vhbi5wbmcnKXtcblxuXHRcdHN1cGVyKHJlY3QsIHdpZHRoLCBoZWlnaHQsICdyZWQnKTtcblx0XHR0aGlzLmltYWdlID0gbmV3IEltYWdlKHdpZHRoLCBoZWlnaHQpO1xuXHRcdHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xuXHR9XG5cblx0ZHJhdyhjdHgpe1xuXHRcdGN0eC5zYXZlKCk7XG5cdFx0Y3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLHRoaXMueCx0aGlzLnksdGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XG5cdFx0Y3R4LnJlc3RvcmUoKTtcblx0fVxufVxuXG5jbGFzcyBJbWFnZVNocmlua1Nwcml0ZSBleHRlbmRzIEltYWdlU3ByaXRle1xuXHRjb25zdHJ1Y3RvcihyZWN0PXtsZWZ0LHRvcCx3aWR0aCxoZWlnaHR9LCB3aWR0aCA9IDUwLCBoZWlnaHQgPSA1MCwgc2hyaW5rUmF0ZSA9IDEwLCB1cmw9J2ltYWdlcy9TZWFuLnBuZycpe1xuXHRcdHN1cGVyKHJlY3QsIHdpZHRoLCBoZWlnaHQsIHVybCk7XG5cdFx0dGhpcy5pbWFnZSA9IG5ldyBJbWFnZSh3aWR0aCwgaGVpZ2h0KTtcblx0XHR0aGlzLmltYWdlLnNyYyA9IHVybDtcblx0XHR0aGlzLnNocmlua1JhdGUgPSBzaHJpbmtSYXRlO1xuXHR9XG5cdFxuXHRyZWZsZWN0WCgpe1xuXHRcdHRoaXMuZndkLnggKj0gLTE7XG5cdFx0dGhpcy53aWR0aCA9IHRoaXMud2lkdGggLSB0aGlzLnNocmlua1JhdGU7XG5cdFx0dGhpcy5oZWlnaHQgPSB0aGlzLmhlaWdodCAtIHRoaXMuc2hyaW5rUmF0ZTtcblx0fVxuXG5cdHJlZmxlY3RZKCl7XG5cdFx0dGhpcy5md2QueSAqPSAtMTtcblx0XHR0aGlzLndpZHRoID0gdGhpcy53aWR0aCAtIHRoaXMuc2hyaW5rUmF0ZTtcblx0XHR0aGlzLmhlaWdodCA9IHRoaXMuaGVpZ2h0IC0gdGhpcy5zaHJpbmtSYXRlO1xuXHR9XG5cblx0ZHJhdyhjdHgpe1xuXG5cdFx0aWYodGhpcy53aWR0aCA8PSAwIHx8IHRoaXMuaGVpZ2h0IDw9IDApXG5cdFx0e1xuXHRcdFx0dGhpcy5zcGVlZCA9IDA7XG5cdFx0XHR0aGlzLmZ3ZC54ID0gMDtcblx0XHRcdHRoaXMuZndkLnkgPSAwO1xuXHRcdFx0cmV0dXJuOyAgICAgICAgICAgIFxuXHRcdH1cblxuXHRcdGN0eC5zYXZlKCk7XG5cdFx0Y3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLHRoaXMueCx0aGlzLnksdGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XG5cdFx0Y3R4LnJlc3RvcmUoKTtcblxuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNpcmNsZVNwcml0ZXMobnVtPTIwLCByZWN0PXtsZWZ0OjAsdG9wOjAsd2lkdGg6MzAwLGhlaWdodDozMDB9LCByYWRpdXM9MjAsIGNvbG9yPSdyZWQnKXtcblx0bGV0IHNwcml0ZXMgPSBbXTtcblx0Zm9yKGxldCBpPTA7aTxudW07aSsrKXtcblxuXHRcdGxldCBzID0gbmV3IENpcmNsZVNwcml0ZShyZWN0LCByYWRpdXMsIGNvbG9yKTtcblx0XHRzcHJpdGVzLnB1c2gocyk7XG5cdH1cblxuXHRyZXR1cm4gc3ByaXRlczsgXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNxdWFyZVNwcml0ZXMobnVtPTIwLHJlY3Q9e2xlZnQ6MCx0b3A6MCx3aWR0aDozMDAsaGVpZ2h0OjMwMH0sIHdpZHRoPTI1LCBoZWlnaHQ9MjUsIGNvbG9yPSdyZWQnKXtcblx0bGV0IHNwcml0ZXMgPSBbXTtcblx0Zm9yKGxldCBpPTA7aTxudW07aSsrKXtcblxuXHRcdGxldCBzID0gbmV3IFNxdWFyZVNwcml0ZShyZWN0LCB3aWR0aCwgaGVpZ2h0LCBjb2xvcik7XG5cdFx0c3ByaXRlcy5wdXNoKHMpO1xuXHR9XG5cblx0cmV0dXJuIHNwcml0ZXM7IFxufVxuXG5mdW5jdGlvbiBjcmVhdGVJbWFnZVNwcml0ZXMobnVtPTIwLHJlY3Q9e2xlZnQ6MCx0b3A6MCx3aWR0aDozMDAsaGVpZ2h0OjMwMH0sIHdpZHRoPTUwLCBoZWlnaHQ9NTAsIHVybD0naW1hZ2VzL1NlYW4ucG5nJyl7XG5cdGxldCBzcHJpdGVzID0gW107XG5cdGZvcihsZXQgaT0wO2k8bnVtO2krKyl7XG5cblx0XHRsZXQgcyA9IG5ldyBJbWFnZVNwcml0ZShyZWN0LCB3aWR0aCwgaGVpZ2h0LCB1cmwpO1xuXHRcdHNwcml0ZXMucHVzaChzKTtcblx0fVxuXG5cdHJldHVybiBzcHJpdGVzOyBcbn1cblxuLy9NYWtlcyBhbiBpbWFnZSB0aGF0IHNocmlua3MgaXRzZWxmIGV2ZXJ5IGJvdW5jZS4gRXZlbnR1YWxseSBzdG9wcyBkcmF3aW5nIHdoZW4gc21hbGwgZW5vdWdoXG5mdW5jdGlvbiBjcmVhdGVJbWFnZVNocmlua1Nwcml0ZXMobnVtPTIwLHJlY3Q9e2xlZnQ6MCx0b3A6MCx3aWR0aDozMDAsaGVpZ2h0OjMwMH0sIHdpZHRoPTUwLCBoZWlnaHQ9NTAsIHNocmlua1JhdGU9MTAsIHVybD0naW1hZ2VzL1NlYW4ucG5nJyl7XG5cdGxldCBzcHJpdGVzID0gW107XG5cdGZvcihsZXQgaT0wO2k8bnVtO2krKyl7XG5cblx0XHRsZXQgcyA9IG5ldyBJbWFnZVNocmlua1Nwcml0ZShyZWN0LCB3aWR0aCwgaGVpZ2h0LCBzaHJpbmtSYXRlLCB1cmwpO1xuXHRcdHNwcml0ZXMucHVzaChzKTtcblx0fVxuXG5cdHJldHVybiBzcHJpdGVzOyBcbn0iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./js/classes.js\n");

/***/ }),

/***/ "./js/init.js":
/*!********************!*\
  !*** ./js/init.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.js */ \"./js/main.js\");\n\r\n// 1) this script a good place to load fonts, images, sounds and other resources\r\n// 2) start up app\r\nObject(_main_js__WEBPACK_IMPORTED_MODULE_0__[\"init\"])();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9pbml0LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vanMvaW5pdC5qcz82OWJjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5pdH0gZnJvbSAnLi9tYWluLmpzJztcclxuLy8gMSkgdGhpcyBzY3JpcHQgYSBnb29kIHBsYWNlIHRvIGxvYWQgZm9udHMsIGltYWdlcywgc291bmRzIGFuZCBvdGhlciByZXNvdXJjZXNcclxuLy8gMikgc3RhcnQgdXAgYXBwXHJcbmluaXQoKTsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./js/init.js\n");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! exports provided: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony import */ var _classes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes.js */ \"./js/classes.js\");\n\n\n\nconst ctx = document.querySelector(\"canvas\").getContext(\"2d\");\nconst screenWidth = 600;\nconst screenHeight = 400;\nlet sprites = [];\n\nfunction init(){\n    let margin = 50;\n    let rect = {left: margin, top: margin, width: screenWidth - margin*2, height: screenHeight-100*2}\n    sprites = sprites.concat(Object(_classes_js__WEBPACK_IMPORTED_MODULE_0__[\"createCircleSprites\"])(5, rect, 10, 'orange'),\n                             Object(_classes_js__WEBPACK_IMPORTED_MODULE_0__[\"createCircleSprites\"])(5, rect, 15, 'darkgreen'),\n                             Object(_classes_js__WEBPACK_IMPORTED_MODULE_0__[\"createSquareSprites\"])(3,rect, 20, 10, 'yellow'),\n                             Object(_classes_js__WEBPACK_IMPORTED_MODULE_0__[\"createSquareSprites\"])(1,rect, 30, 30, 'white'),\n                             Object(_classes_js__WEBPACK_IMPORTED_MODULE_0__[\"createImageSprites\"])(1, rect, 70, 70, 'images/reddit.png'),\n                             Object(_classes_js__WEBPACK_IMPORTED_MODULE_0__[\"createImageSprites\"])(4, rect, 30, 30, 'images/downvote.png'),\n                             Object(_classes_js__WEBPACK_IMPORTED_MODULE_0__[\"createImageSprites\"])(7, rect, 60, 60,\n                             'images/ealogo.png'),\n                             Object(_classes_js__WEBPACK_IMPORTED_MODULE_0__[\"createImageShrinkSprites\"])(10, rect, 70, 70, 10, 'images/money.png'),\n                             Object(_classes_js__WEBPACK_IMPORTED_MODULE_0__[\"createImageShrinkSprites\"])(3, rect, 150, 50, 10, 'images/bf2logo.png')\n                            );\n    loop();\n}\n\nfunction loop(){\n    // schedule a call to loop() in 1/60th of a second\n    requestAnimationFrame(loop);\n\n    // draw background\n\tctx.fillStyle = 'black';\n    ctx.fillRect(0,0,screenWidth,screenHeight)\n\n    // loop through sprites\n    for (let s of sprites){\n        // move sprites\n        s.move();\n\n        // check sides and bounce\n        if(s.radius)\n        {\n            // a circle\n            if (s.x <= s.radius || s.x >= screenWidth-s.radius){\n                s.reflectX();\n                s.move();\n            }\n            if (s.y <= s.radius || s.y >= screenHeight-s.radius){\n                s.reflectY();\n                s.move();\n            }\n        }\n        else\n        { // `s` is NOT a circle\n            // left and right\n            if (s.x <= 0 || s.x >= screenWidth-s.width){\n                s.reflectX();\n                s.move();\n            }\n\n            // top and bottom\n            if(s.y <=0 || s.y > screenHeight - s.height)\n            {\n                s.reflectY();\n                s.move();\n            }\n\n        } // end if s.radius\n\n        // draw sprites\n        s.draw(ctx);\n\n    } // end for\n} // end loop()//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9tYWluLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vanMvbWFpbi5qcz9lM2IxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3JlYXRlQ2lyY2xlU3ByaXRlcyxjcmVhdGVTcXVhcmVTcHJpdGVzLGNyZWF0ZUltYWdlU3ByaXRlcywgY3JlYXRlSW1hZ2VTaHJpbmtTcHJpdGVzfSBmcm9tICcuL2NsYXNzZXMuanMnO1xuZXhwb3J0IHtpbml0fTtcblxuY29uc3QgY3R4ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwiMmRcIik7XG5jb25zdCBzY3JlZW5XaWR0aCA9IDYwMDtcbmNvbnN0IHNjcmVlbkhlaWdodCA9IDQwMDtcbmxldCBzcHJpdGVzID0gW107XG5cbmZ1bmN0aW9uIGluaXQoKXtcbiAgICBsZXQgbWFyZ2luID0gNTA7XG4gICAgbGV0IHJlY3QgPSB7bGVmdDogbWFyZ2luLCB0b3A6IG1hcmdpbiwgd2lkdGg6IHNjcmVlbldpZHRoIC0gbWFyZ2luKjIsIGhlaWdodDogc2NyZWVuSGVpZ2h0LTEwMCoyfVxuICAgIHNwcml0ZXMgPSBzcHJpdGVzLmNvbmNhdChjcmVhdGVDaXJjbGVTcHJpdGVzKDUsIHJlY3QsIDEwLCAnb3JhbmdlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUNpcmNsZVNwcml0ZXMoNSwgcmVjdCwgMTUsICdkYXJrZ3JlZW4nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlU3F1YXJlU3ByaXRlcygzLHJlY3QsIDIwLCAxMCwgJ3llbGxvdycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVTcXVhcmVTcHJpdGVzKDEscmVjdCwgMzAsIDMwLCAnd2hpdGUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlSW1hZ2VTcHJpdGVzKDEsIHJlY3QsIDcwLCA3MCwgJ2ltYWdlcy9yZWRkaXQucG5nJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUltYWdlU3ByaXRlcyg0LCByZWN0LCAzMCwgMzAsICdpbWFnZXMvZG93bnZvdGUucG5nJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUltYWdlU3ByaXRlcyg3LCByZWN0LCA2MCwgNjAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpbWFnZXMvZWFsb2dvLnBuZycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVJbWFnZVNocmlua1Nwcml0ZXMoMTAsIHJlY3QsIDcwLCA3MCwgMTAsICdpbWFnZXMvbW9uZXkucG5nJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUltYWdlU2hyaW5rU3ByaXRlcygzLCByZWN0LCAxNTAsIDUwLCAxMCwgJ2ltYWdlcy9iZjJsb2dvLnBuZycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICBsb29wKCk7XG59XG5cbmZ1bmN0aW9uIGxvb3AoKXtcbiAgICAvLyBzY2hlZHVsZSBhIGNhbGwgdG8gbG9vcCgpIGluIDEvNjB0aCBvZiBhIHNlY29uZFxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcblxuICAgIC8vIGRyYXcgYmFja2dyb3VuZFxuXHRjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICBjdHguZmlsbFJlY3QoMCwwLHNjcmVlbldpZHRoLHNjcmVlbkhlaWdodClcblxuICAgIC8vIGxvb3AgdGhyb3VnaCBzcHJpdGVzXG4gICAgZm9yIChsZXQgcyBvZiBzcHJpdGVzKXtcbiAgICAgICAgLy8gbW92ZSBzcHJpdGVzXG4gICAgICAgIHMubW92ZSgpO1xuXG4gICAgICAgIC8vIGNoZWNrIHNpZGVzIGFuZCBib3VuY2VcbiAgICAgICAgaWYocy5yYWRpdXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIGEgY2lyY2xlXG4gICAgICAgICAgICBpZiAocy54IDw9IHMucmFkaXVzIHx8IHMueCA+PSBzY3JlZW5XaWR0aC1zLnJhZGl1cyl7XG4gICAgICAgICAgICAgICAgcy5yZWZsZWN0WCgpO1xuICAgICAgICAgICAgICAgIHMubW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMueSA8PSBzLnJhZGl1cyB8fCBzLnkgPj0gc2NyZWVuSGVpZ2h0LXMucmFkaXVzKXtcbiAgICAgICAgICAgICAgICBzLnJlZmxlY3RZKCk7XG4gICAgICAgICAgICAgICAgcy5tb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7IC8vIGBzYCBpcyBOT1QgYSBjaXJjbGVcbiAgICAgICAgICAgIC8vIGxlZnQgYW5kIHJpZ2h0XG4gICAgICAgICAgICBpZiAocy54IDw9IDAgfHwgcy54ID49IHNjcmVlbldpZHRoLXMud2lkdGgpe1xuICAgICAgICAgICAgICAgIHMucmVmbGVjdFgoKTtcbiAgICAgICAgICAgICAgICBzLm1vdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdG9wIGFuZCBib3R0b21cbiAgICAgICAgICAgIGlmKHMueSA8PTAgfHwgcy55ID4gc2NyZWVuSGVpZ2h0IC0gcy5oZWlnaHQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcy5yZWZsZWN0WSgpO1xuICAgICAgICAgICAgICAgIHMubW92ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gLy8gZW5kIGlmIHMucmFkaXVzXG5cbiAgICAgICAgLy8gZHJhdyBzcHJpdGVzXG4gICAgICAgIHMuZHJhdyhjdHgpO1xuXG4gICAgfSAvLyBlbmQgZm9yXG59IC8vIGVuZCBsb29wKCkiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./js/main.js\n");

/***/ }),

/***/ "./js/utilities.js":
/*!*************************!*\
  !*** ./js/utilities.js ***!
  \*************************/
/*! exports provided: getRandomUnitVector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getRandomUnitVector\", function() { return getRandomUnitVector; });\n\n\n// these 2 helpers are used by classes.js\nfunction getRandomUnitVector(){\n\tlet x = getRandom(-1,1);\n\tlet y = getRandom(-1,1);\n\tlet length = Math.sqrt(x*x + y*y);\n\tif(length == 0){ // very unlikely\n\t\tx=1; // point right\n\t\ty=0;\n\t\tlength = 1;\n\t} else{\n\t\tx /= length;\n\t\ty /= length;\n\t}\n\n\treturn {x:x, y:y};\n}\n\nfunction getRandom(min, max) {\n\treturn Math.random() * (max - min) + min;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy91dGlsaXRpZXMuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy91dGlsaXRpZXMuanM/ZDc4ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge2dldFJhbmRvbVVuaXRWZWN0b3J9O1xuXG4vLyB0aGVzZSAyIGhlbHBlcnMgYXJlIHVzZWQgYnkgY2xhc3Nlcy5qc1xuZnVuY3Rpb24gZ2V0UmFuZG9tVW5pdFZlY3Rvcigpe1xuXHRsZXQgeCA9IGdldFJhbmRvbSgtMSwxKTtcblx0bGV0IHkgPSBnZXRSYW5kb20oLTEsMSk7XG5cdGxldCBsZW5ndGggPSBNYXRoLnNxcnQoeCp4ICsgeSp5KTtcblx0aWYobGVuZ3RoID09IDApeyAvLyB2ZXJ5IHVubGlrZWx5XG5cdFx0eD0xOyAvLyBwb2ludCByaWdodFxuXHRcdHk9MDtcblx0XHRsZW5ndGggPSAxO1xuXHR9IGVsc2V7XG5cdFx0eCAvPSBsZW5ndGg7XG5cdFx0eSAvPSBsZW5ndGg7XG5cdH1cblxuXHRyZXR1cm4ge3g6eCwgeTp5fTtcbn1cblxuZnVuY3Rpb24gZ2V0UmFuZG9tKG1pbiwgbWF4KSB7XG5cdHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG59Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./js/utilities.js\n");

/***/ }),

/***/ 0:
/*!*************************************************************************!*\
  !*** multi ./js/init.js ./js/classes.js ./js/main.js ./js/utilities.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./js/init.js */"./js/init.js");
__webpack_require__(/*! ./js/classes.js */"./js/classes.js");
__webpack_require__(/*! ./js/main.js */"./js/main.js");
module.exports = __webpack_require__(/*! ./js/utilities.js */"./js/utilities.js");


/***/ })

/******/ });
!function (window) {
	window.app = window.app || {};

	app.COMPAREWORD = 'support';

	app.canvas = document.getElementById('gameCanvas');
	app.message = document.querySelector('#content > .message');
	app.stage = new createjs.Stage(app.canvas);

	init();

	createjs.Ticker.addEventListener("tick", tick);

	app.appleClick = function appleClick(handler) {
		/*
		 Проверяем Слово.
		 Если оно подходит - запускае синусоидную анимацию
		 Иаче меняем фрейм на fail
		 */

		var prevAnimationName = this.word.toLowerCase();

		if (this.isTween) {
			return;
		}

		this.isTween = true;
		this.gotoAndPlay(prevAnimationName);

		if (app.compareWord('support', this.word)) {
			this.step = randomNumber(90, 180);

			var cur = {x: this.x, y: this.y, w: this.getBounds().width, h: this.getBounds().height, step: this.step};
			createjs.Tween.get(this, {loop: false})
				.to({
					y: 790 - cur.h,
					step: -cur.step
				}, 1500, createjs.Ease.bounceInOut())
				.call(function () {
					if (this.finished) {
						finish();
					}

					return this;
				})
				.addEventListener("change", function handleChange(event) {
					var target = event.target._target;
					var sin = Math.sin(target.step * Math.PI / 180);

					target.x = (sin * (target.step)) + cur.x - cur.w;

					target.finished = true;
				})
			;
		} else {
			this.gotoAndPlay(prevAnimationName + 'fail');

			createjs.Tween.get(this, {loop: false})
				.wait(2000)
				.call(function () {
					this.gotoAndPlay(prevAnimationName);
					this.isTween = false;
				})
			;
		}
	};

	function finish() {
		if (app.COMPAREWORD.length === app.currentWord.length) {
			app.currentWord = '';
			alert('you won!');
		}
	}

	function init() {
		createjs.Ticker.setFPS(30);

		app.loadAssets('assets/images/', function () {
			/* background: */
			var backgroundImage = new createjs.Bitmap("assets/images/background.jpg");
			app.stage.addChild(backgroundImage);

			var timerImage = new createjs.Bitmap('assets/images/timer.png');
			timerImage.x = 32;
			timerImage.y = 32;
			app.stage.addChild(timerImage);

			var message01 = new createjs.Bitmap('assets/images/message01.png');
			message01.x = app.canvas.getBoundingClientRect().width - 352;
			app.stage.addChild(message01);

			var message02 = new createjs.Bitmap('assets/images/message02.png');
			message02.x = 264;
			message02.y = 96;
			app.stage.addChild(message02);

			var wordO = {
				images: ["assets/images/words/words.png"],
				frames: [
					// x, y, width, height, imageIndex*, regX*, regY*
					[0, 0, 55, 65, 0, 0], // t
					[55, 0, 56, 65, 0, 0], // t\

					[0, 65, 68, 85, 0, 0], // s
					[67, 65, 69, 85, 0, 0], // s\

					[0, 150, 60, 75, 0, 0], // p
					[59, 150, 61, 75, 0, 0], // p\

					[0, 229, 60, 64, 0, 0], // r
					[59, 229, 60, 64, 0, 0], // r\

					[0, 293, 90, 105, 0, 0], // u
					[89, 293, 91, 105, 0, 0], // u\

					[0, 396, 91, 102, 0, 0], // o
					[90, 396, 92, 102, 0, 0] // o\
					// etc.
				],
				animations: {
					t: {
						frames: [0]
					},
					tfail: {
						frames: [1]
					},
					s: {
						frames: [2]
					},
					sfail: {
						frames: [3]
					},
					p: {
						frames: [4]
					},
					pfail: {
						frames: [5]
					},
					r: {
						frames: [6]
					},
					rfail: {
						frames: [7]
					},
					u: {
						frames: [8]
					},
					ufail: {
						frames: [9]
					},
					o: {
						frames: [10]
					},
					ofail: {
						frames: [11]
					}
				}
			};

			var spriteSheet = new createjs.SpriteSheet(wordO);
			var wordOInstance = new createjs.Sprite(spriteSheet, 't');
			wordOInstance.x = 525;
			wordOInstance.y = 394;
			wordOInstance.word = 'T';
			wordOInstance.addEventListener("click", app.appleClick.bind(wordOInstance));
			app.stage.addChild(wordOInstance);

			var spriteSheet = new createjs.SpriteSheet(wordO);
			var wordOInstance = new createjs.Sprite(spriteSheet, 's');
			wordOInstance.x = 384;
			wordOInstance.y = 229;
			wordOInstance.word = 'S';
			wordOInstance.addEventListener("click", app.appleClick.bind(wordOInstance));
			app.stage.addChild(wordOInstance);

			var spriteSheet = new createjs.SpriteSheet(wordO);
			var wordOInstance = new createjs.Sprite(spriteSheet, 'p');
			wordOInstance.x = 334;
			wordOInstance.y = 486;
			wordOInstance.word = 'P';
			wordOInstance.addEventListener("click", app.appleClick.bind(wordOInstance));
			app.stage.addChild(wordOInstance);

			var spriteSheet = new createjs.SpriteSheet(wordO);
			var wordOInstance = new createjs.Sprite(spriteSheet, 'p');
			wordOInstance.x = 660;
			wordOInstance.y = 494;
			wordOInstance.word = 'P';
			wordOInstance.addEventListener("click", app.appleClick.bind(wordOInstance));
			app.stage.addChild(wordOInstance);

			var spriteSheet = new createjs.SpriteSheet(wordO);
			var wordOInstance = new createjs.Sprite(spriteSheet, 'r');
			wordOInstance.x = 993;
			wordOInstance.y = 491;
			wordOInstance.word = 'R';
			wordOInstance.addEventListener("click", app.appleClick.bind(wordOInstance));
			app.stage.addChild(wordOInstance);

			var spriteSheet = new createjs.SpriteSheet(wordO);
			var wordOInstance = new createjs.Sprite(spriteSheet, 'u');
			wordOInstance.x = 663;
			wordOInstance.y = 278;
			wordOInstance.word = 'U';
			wordOInstance.addEventListener("click", app.appleClick.bind(wordOInstance));
			app.stage.addChild(wordOInstance);

			var spriteSheet = new createjs.SpriteSheet(wordO);
			var wordOInstance = new createjs.Sprite(spriteSheet, 'o');
			wordOInstance.x = 772;
			wordOInstance.y = 371;
			wordOInstance.word = 'O';
			wordOInstance.addEventListener("click", app.appleClick.bind(wordOInstance));
			app.stage.addChild(wordOInstance);

			var filter = new createjs.Bitmap('assets/images/filter.png');
			filter.x = 0;
			filter.y = 0;
			filter.alpha = 0.2;

			var scale = Math.min(gameCanvas.getBoundingClientRect().width / 2, gameCanvas.getBoundingClientRect().height / 2);
			filter.scaleX = scale;
			filter.scaleY = scale;
			app.stage.addChild(filter);

			var myBorderLeft = new createjs.Bitmap('assets/images/border.png');
			myBorderLeft.x = 0;
			myBorderLeft.y = 0;
			myBorderLeft.scaleX = 0.1;
			myBorderLeft.scaleY = 8;

			var myBorderTop = new createjs.Bitmap('assets/images/border.png');
			myBorderTop.x = 0;
			myBorderTop.y = 0;
			myBorderTop.scaleX = 20;
			myBorderTop.scaleY = 0.1;

			var myBorderRight = new createjs.Bitmap('assets/images/border.png');
			myBorderRight.x = gameCanvas.getBoundingClientRect().width - 10;
			myBorderRight.y = 0;
			myBorderRight.scaleX = 0.1;
			myBorderRight.scaleY = 8;

			var myBorderBottom = new createjs.Bitmap('assets/images/border.png');
			myBorderBottom.x = 0;
			myBorderBottom.y = gameCanvas.getBoundingClientRect().height - 10;
			myBorderBottom.scaleX = 20;
			myBorderBottom.scaleY = 0.1;

			app.stage.addChild(myBorderLeft, myBorderRight, myBorderTop, myBorderBottom);
		});
	}

	function tick(event) {
		app.stage.update(event);
	}

}(window);
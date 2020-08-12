!function (window) {

	window.randomNumber = function randomNumber(a, b) {
		return a + (b - a) * Math.random()
	};

}(window);
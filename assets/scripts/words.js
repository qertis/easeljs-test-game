!function (window) {
	window.app = window.app || {};
	app.currentWord = '';

	app.compareWord = function compareWord(word1, word2) {
		app.currentWord += word2;

		if (word1.match(new RegExp('^' + app.currentWord, 'gi'))) {
			return true;
		}

		app.currentWord = app.currentWord.substring(0, app.currentWord.length - 1);

		return false;
	}

}(window);
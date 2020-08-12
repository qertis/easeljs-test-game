!function (window) {
	window.app = window.app || {};

	app.loadAssets = function loadAssets(assetsPath, callback) {
		// begin loading content (only sounds to load)
		var assetsPath = assetsPath || "/";
		var manifest = [
			{id: "background", src: "background.jpg"},
			{id: "message01", src: "message01.png"},
			{id: "message02", src: "message02.png"},
			{id: "timer", src: "timer.png"},
			{src: "words/words.png"},
			{src: "filter.png"}
		];
		var preload = new createjs.LoadQueue(true, assetsPath);

		preload.addEventListener("complete", doneLoading);
		preload.addEventListener("progress", updateLoading);
		preload.loadManifest(manifest);

		function doneLoading() {
			if (callback) callback();
		}

		function updateLoading(e) {
			if(e.loaded === 1) {
				app.message.style.display = 'none';
			}
		}
	}

}(window);
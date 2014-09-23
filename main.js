// initialize custom namespace or use existing
var lifeApp = lifeApp || {};

// this function will be run on page load
lifeApp.autorun = function() {
    var width = 40;
    var height = 40;
    var game = lifeApp.Game(width,height);
    game.init();
    return game;
};

$(document).ready(function() {

    var game = lifeApp.autorun();

    $('#play-button').click(function(event) {
	game.run();
    });

    $('#pause-button').click(function(event) {
	game.pause();
    });

    $('.cell').click(function(event) {
	var cell = $(this);
	var x = cell.data('col');
	var y = cell.data('row');
	game.toggleCellState(x, y);
    });
});

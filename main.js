// initialize custom namespace or use existing
var lifeApp = lifeApp || {};

// this function will be run on page load
lifeApp.autorun = function() {
    var width = 45;
    var height = 45;
    var game = lifeApp.Game(width,height);
    game.init();
    return game;
};

lifeApp.saved_states = {};

$(document).ready(function() {

    game = lifeApp.autorun();

    $('#play-button').click(function(event) {
	game.run();
    });

    $('#pause-button').click(function(event) {
	game.pause();
    });

    $('#save-button').click(function(event) {
	var state = game.grabBoard();
	var name = prompt("Name the saved state:", "savedState1");
	lifeApp.saved_states[name] = state;
    });

    $('#restore-button').click(function(event) {
	var prompt_text = "Type the name of the state to restore.\nThe following saved states are available:\n";
	for(var state in lifeApp.saved_states)
	    prompt_text += "\n" + state;
	var selected_state = prompt(prompt_text);
	var board = lifeApp.saved_states[selected_state];
	console.log(lifeApp.saved_states);
	console.log(selected_state);
	console.log(board);
	game.restoreBoard(board);
    })

    $('.cell').click(function(event) {
	var cell = $(this);
	var x = cell.data('col');
	var y = cell.data('row');
	game.toggleCellState(x, y);
    });
});

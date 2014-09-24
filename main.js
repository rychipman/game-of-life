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

lifeApp.saved_states = {
    glider_gun : [[0,4],[0,5],[1,4],[1,5], [10,4],[10,5],[10,6],[11,3],[11,7],[12,2],[12,8],[13,2],[13,8],[14,5],[15,3],[15,7],[16,4],[16,5],[16,6],[17,5], [20,2],[20,3],[20,4],[21,2],[21,3],[21,4],[22,1],[22,5],[24,0],[24,1],[24,5],[24,6], [34,2],[34,3],[35,2],[35,3]]
};

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
	game.restoreBoard(board);
    })

    $('.cell').click(function(event) {
	var cell = $(this);
	var x = cell.data('col');
	var y = cell.data('row');
	game.toggleCellState(x, y);
    });
});

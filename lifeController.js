// initialize the custom namespace or use the existing one
var lifeApp = lifeApp || {};

lifeApp.LifeViewController = function(board_width, board_height, dead_color, alive_color) {
    // the pad upon which the board is drawn
    var pad = Pad(document.getElementById("lifeCanvas"));
    // use default colors if none given
    var alive_color = alive_color ? alive_color : Color(44, 44, 44);
    var dead_color = dead_color ? dead_color : Color(255, 255, 255);

    // color a certain cell to reflect its state
    var setSquareAlive = function(x, y, alive) {
	var w = pad.get_width()/board_width;
	var h = pad.get_height()/board_height;
	var top_left = Coord(x*w, y*h);
	var line_width = 2;
	var fill_color = alive ? alive_color : dead_color;
	var color = fill_color;
	pad.draw_rectangle(top_left, w, h, line_width, color, fill_color);
    };

    // update the screen to reflect the given new
    // state of the board
    var updateBoard = function(newBoard) {
	for(var x=0; x<newBoard.length; x++) {
	    for(var y=0; y<newBoard[x].length; y++) {
		var alive = false;
		if(newBoard[x][y] == 1)
		    alive = true;
		setSquareAlive(x, y, alive);
	    }
	}
    };

    // the public interface for the viewController
    var public = {
	updateBoard : updateBoard
    };

    Object.freeze(public);
    return public;
};

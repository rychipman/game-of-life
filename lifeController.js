// initialize the custom namespace or use the existing one
var lifeApp = lifeApp || {};

lifeApp.LifeViewController = function(board_width, board_height, dead_color, alive_color) {

    var cells = [];
    var width = board_width;
    var height = board_height;

    var createBoard = function(width, height, pxWidth, pxHeight) {
	var board = document.createElement('div');
	board.style.width = pxWidth;
	board.style.height = pxHeight;
	board.className = 'board';
	var cellWidth = pxWidth / width - 2;
	var cellHeight = pxHeight / height - 2;
	for(var y=0; y<width; y++) {
	    var row = document.createElement('div');
	    row.className = 'row';
	    row.dataset.row = y;
	    for(var x=0; x<height; x++) {
		var div = document.createElement('div');
		div.className = 'cell';
		div.dataset.col = x;
		div.dataset.row = y;
		div.style.width = cellWidth;
		div.style.height = cellHeight;
		row.appendChild(div);
		cells.push(div);
	    }
	    board.appendChild(row);
	}
	$('body').prepend($(board));
    };

    // update the screen to reflect the given new
    // state of the board
    var updateBoard = function(changes) {
	changes.forEach(function(cell) {
	    var state = cell.getState();
	    var x = cell.getX();
	    var y = cell.getY();
	    var div = $(cells[x * height + y]);
	    if(state == 1)
		div.addClass('live');
	    else
		div.removeClass('live');
	});

    };

    // the public interface for the viewController
    var public = {
	updateBoard : updateBoard
    };

    createBoard(board_width, board_height, 1000, 1000);
    Object.freeze(public);
    return public;
};

// initialize the custom namespace or use the existing one
var lifeApp = lifeApp || {};

lifeApp.LifeViewController = function(board_width, board_height, dead_color, alive_color) {

    var createBoard = function(width, height, pxWidth, pxHeight) {
	var board = document.createElement('div');
	board.style.width = pxWidth;
	board.style.height = pxHeight;
	board.className = 'board';
	var cellWidth = pxWidth / width - 2;
	var cellHeight = pxHeight / height - 2;
	for(var x=0; x<width; x++) {
	    var col = document.createElement('div');
	    col.className = 'row';
	    col.dataset.col = x;
	    for(var y=0; y<height; y++) {
		var div = document.createElement('div');
		div.className = 'cell';
		div.dataset.col = x;
		div.dataset.row = y;
		div.style.width = cellWidth;
		div.style.height = cellHeight;
		col.appendChild(div);
	    }
	    board.appendChild(col);
	}
	$('body').prepend($(board));
    };

    // update the screen to reflect the given new
    // state of the board
    var updateBoard = function(newBoard) {
	// add the 'live' class to any newly-live cell
	$('.cell').filter(function(idx, elt) {
	    var x = $(elt).data('col');
	    var y = $(elt).data('row');
	    var live = $(elt).hasClass('live');
	    return newBoard[x][y] == 1 && !live;
	}).addClass('live');

	// remove the 'live' class from any newly-dead cell
	$('.cell').filter(function(idx, elt) {
	    var x = $(elt).data('col');
	    var y = $(elt).data('row');
	    var live = $(elt).hasClass('live');
	    return newBoard[x][y] == 0 && live;
	}).removeClass('live');
    };

    // the public interface for the viewController
    var public = {
	updateBoard : updateBoard
    };

    createBoard(board_width, board_height, 1000, 1000);
    Object.freeze(public);
    return public;
};

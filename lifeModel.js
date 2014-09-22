// initialize the custom namespace or use the existing one
var lifeApp = lifeApp || {};

// This is the class that represents a Board.
lifeApp.Board = function(width, height, wrap) {
    // width and height of the board abstraction
    // (i.e. not the height in pixels)
    var width = width ? width : 25;
    var height = height ? height : 25;
    // columns is the variable holding the representation of
    // the board. It is a 2D-array, meaning the top-level array
    // is an array of the "columns". In this representation, live
    // cells are represented by 1, and dead cells by 0
    var columns;

    // get the neighbors of a given cell. Depends on the value of "wrap"
    // if wrap is true, the edges of the boards wrap.
    // if not, the method may return fewer than 8 neighbors
    var getNeighbors = function(x, y) {
        if(wrap) {
	    var right = (x == width-1) ? 0 : x + 1;
	    var left = (x == 0) ? width-1 : x - 1;
	    var down = (y == height-1) ? 0 : y + 1;
	    var up = (y == 0) ? height-1 : y - 1;
        } else {
	    var right = x + 1;
	    var left = x - 1;
	    var up = y - 1;
	    var down = y + 1;
        }
        var all_neighbors = [[right,down], [right,y], [x,down], [left,up], [left,y], [x,up], [right,up], [left,down]];
	var valid_neighbors = all_neighbors.filter(function(neighbor) {
	    var x = neighbor[0];
	    var y = neighbor[1];
	    if(x >= 0 && x < columns.length && y >= 0 && y < columns[0].length)
		return true;
	    else
		return false;
	});
	return valid_neighbors;
    };

    // apply a function of the form fn(x, y, value){...}
    // to every cell on the board
    var mapBoard = function(map_fn) {
	var mapColumn = function(column, currentCol) {
            return column.map(function(cell_value, currentRow) {
	        return map_fn(currentCol, currentRow, cell_value);
            });
	};
	var c = columns;
	var new_board = columns.map(mapColumn);
	return new_board;
    };

    // helper function that copies the board, which is
    // accomplished by calling mapBoard with the identity
    // function
    var copyBoard = function(board) {
	return mapBoard(function(col, row, square) {
	    return square;
	});
    };

    // get the next state of a cell at the given location
    var getNextState = function(x, y) {
	// get the state of all the neighboring cells
	var currentState = columns[x][y];
	var neighbors = getNeighbors(x, y);
	var live_neighbors = neighbors.reduce(function(prevVal, currVal, idx, arr) {
	    var x = currVal[0];
	    var y = currVal[1];
	    var is_alive = columns[x][y];
            return prevVal + is_alive;
	}, 0);
	// find the next state based on the rules of Life
	var nextState = 0;
	if(live_neighbors === 3) {
	    nextState = 1;
	} else if(live_neighbors === 2) {
	    nextState = currentState;
	}
	return nextState;
    }

    // initialize a board. A list of strings formatted "x,y" can
    // be given to represent which cells should be alive initially
    // if no list is given, each cell is assigned alive or dead
    // with a 50% probability.
    // this function is designed to be exposed as part of the
    // public interface
    var init = function(live_squares) {
	columns = [];
	for(var x=0; x<width; x++) {
	    columns[x] = [];
	    for(var y=0; y<height; y++) {
		var str = x + "," + y;
		if(live_squares) {
		    if(live_squares.indexOf(str)>=0)
			columns[x].push(1);
		    else
			columns[x].push(0);
		} else {
		    columns[x].push(Math.floor(Math.random()*2));
		}
	    }
	}
	return columns;
    };

    // take one step in the game. This function is designed
    // to be exposed as part of the public interface.
    var step = function() {
	columns = mapBoard(getNextState);
	return columns;
    };

    // the Board object's public interface
    var public = {
	    // These are the intended public methods
	    step : step,
	    init : init,
    };

    Object.freeze(public);
    return public;
};

// This is the class that represents a Game of Life
lifeApp.Game = function(width, height) {
    // how long, in millis, each step of the game should last
    var timestep = 200;
    // the LifeViewController that provides an interface to
    // a graphics library
    var ctl;
    // the board that this game is being played on
    var board;
    // the timer that calls the step function at a
    // repeated interval. saved as a field so that
    // it can be stopped.
    var timer;
    var running;

    // create a new Game of life. This includes a board
    // and a graphics controller
    var init= function(live_squares, wrap) {
	ctl = lifeApp.LifeViewController(width, height);
	board = lifeApp.Board(width, height, wrap);
	var start_state = board.init(live_squares);
	ctl.updateBoard(start_state);
    };

    // step the game, which involves stepping the board &
    // sending the update to the graphics controller
    var step = function() {
	var next_state = board.step();
	ctl.updateBoard(next_state);
	return next_state;
    };

    // start running the game, with the specified timestep
    var run = function(t_step) {
	running = true;
	var interval = t_step ? t_step : timestep;
	timer = window.setInterval(step, interval);
	running = true;
    };

    // pause the game if currently running
    var pause = function() {
	if(running) {
	    window.clearInterval(timer);
	    running = false;
	}
    };

    // the public interface for the Game class
    var public = {
        init : init,
        step : step,
        run : run,
        pause : pause
    };

    Object.freeze(public);
    return public;
};



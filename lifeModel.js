// initialize the custom namespace or use the existing one
var lifeApp = lifeApp || {};

// this class represents a single cell on the board
lifeApp.Cell = function(x_coord, y_coord, is_alive) {
    // the x and y coordinates of the
    // cell within the board
    var x = x_coord;
    var y = y_coord;

    // whether the cell is alive or not
    // 0=dead, 1=alive
    var live = is_alive;

    // this is a variable used to temporarily hold
    // the next state of this cell while the state of
    // the rest of the board is being calculated
    var new_state;

    // the Cells that neighbor this one.
    var neighbors = [];

    // Returns the state (1 or 0) of this cell
    var getState = function() {
	return live;
    };

    // Toggles the state of this cell. Works immediately,
    // and so should not be used when neighbor calculations
    // will need to be done
    var toggleState = function() {
	if(live == 1)
	    live = 0;
	else
	    live = 1;
    };

    // calculates the next state of this cell based on its
    // neighbors and stores it in a temporary variable (as
    // well as returning it)
    var stageStep = function() {
	var live_neighbors = neighbors.reduce(function(prev, curr) {
	    return prev + curr.getState();
	}, 0);
	var next = 0;
	if(live_neighbors == 2)
	    next = live;
	else if(live_neighbors == 3)
	    next = 1;
	new_state = next;
	return next;
    };

    // this should be called after stageStep has been called
    // for this cell and for all its neighbors. Applies the
    // calculated next value
    var applyStep = function() {
	if(new_state != undefined) {
	    live = new_state;
	    new_state = undefined;
	}
    }

    // provide a list of neighboring cells
    var setNeighbors = function(neighbor_cells) {
	neighbors = neighbor_cells;
    };

    // return a list of this cell's neighbors
    var getNeighbors = function() {
	return neighbors;
    };

    // return the x-coordinate of this cell
    var getX = function() {
	return x;
    };

    // return the y-coordinate of this cell
    var getY = function() {
	return y;
    };

    // the public interface for the Cell class
    var public = {
	getState : getState,
	toggleState : toggleState,
	stageStep : stageStep,
	applyStep : applyStep,
	setNeighbors : setNeighbors,
	getNeighbors : getNeighbors,
	getX : getX,
	getY : getY
    };

    // prevent users from changing the public
    // interface before returning it
    Object.freeze(public);
    return public;
};

// This is the class that represents a Board.
lifeApp.Board = function(width, height) {
    // width and height of the board abstraction
    // (i.e. not the height in pixels)
    var width = width ? width : 25;
    var height = height ? height : 25;

    // cells is a list of all the cells in the Board.
    // it is ordered as a concatenation of all the rows
    // of the Board in sequence -- e.g:
    // (0,0), (1,0), ... , (0,1), (1,1), ...
    var cells;

    // this dictionary records which cells may change in
    // the next iteration. This includes all cells that
    // changed in the previous iteration and their
    // neighbors. Only looking at these cells increases
    // the game's computational efficiency
    // An object is used instead of a list so that
    // avoiding duplicates is not a concern
    var lookat;

    // initialize a board.
    // all of the squares are created and initialized
    // to dead, and each is provided with the list of
    // its neighbors
    var init = function() {
	cells = [];
	// create cells with corresponding coordinates
	for(var y=0; y<width; y++) {
	    for(var x=0; x<height; x++) {
		var new_cell = lifeApp.Cell(x, y, 0);
		cells.push(new_cell);
	    }
	}
	var changed = [];
	// Give each cell a reference to its neighbors. This means
	// we are only calculating neighbors once, as opposed to
	// every step
	cells.forEach(function(cell, idx) {
	    var mod = function(num, modulus) {
		return ((num % modulus) + modulus) % modulus;
	    };
	    var left = cells[mod(idx - 1, width*height)];
	    var right = cells[mod(idx + 1, width*height)];
	    var up = cells[mod(idx - width, width*height)];
	    var down = cells[mod(idx + width, width*height)];
	    var t_left = cells[mod(idx - width - 1, width*height)];
	    var t_right = cells[mod(idx - width + 1, width*height)];
	    var b_left = cells[mod(idx + width - 1, width*height)];
	    var b_right = cells[mod(idx + width + 1, width*height)];
	    cell.setNeighbors([left, right, up, down, t_left, t_right, b_left, b_right]);
	    changed.push(cell);
	});
	return changed;
    };

    // take one step in the game.
    // for every cell that may have changed since the previous
    // iteration, find its next state, and return the list of
    // all changed cells.
    var step = function() {
	// the list of all cells that change this iteration
	var changed = [];
	// the list of all cells that may change next iteration
	var newlookat = {};
	// first, we calculate what the new value will be for
	// each cell that may change. We don't actually set it
	// yet (it is stored in a temporary instance field of Cell)
	// so that a changed cell does not affect its neighbors'
	// counts & calculations
	for(var key in lookat) {
	    var cell = lookat[key];
	    var current = cell.getState();
	    var next = cell.stageStep();
	    if(current != next) {
		changed.push(cell);
		var changeable_cells = cell.getNeighbors().concat([cell]);
		changeable_cells.forEach(function(cell) {
		    newlookat[cell.getX() + "," + cell.getY()] = cell;
		});
	    }
	}
	// we apply the changes that were calculated in the previous step
	for(var key in lookat) {
	    var cell = lookat[key];
	    cell.applyStep();
	}
	// assign out new lookat object and return the changed cells
	lookat = newlookat;
	return changed;
    };

    // Toggles the state of the given cell. Works immediately,
    // and so should not be used when neighbor calculations
    // will need to be done. Adds the cell and its neighbors
    // to the lookat object (to be checked for changes next step),
    // and returns the changed cell
    var toggleCellState = function(x, y) {
	var cell = cells[y * width + x];
	cell.toggleState();
	var changeable_cells = cell.getNeighbors().concat([cell]);
	changeable_cells.forEach(function(cell) {
	    lookat[cell.getX() + "," + cell.getY()] = cell;
	});
	return cell;
    }

    // the Board object's public interface
    var public = {
	step : step,
	init : init,
	toggleCellState : toggleCellState
    };

    // prevent the public interface from being modified
    Object.freeze(public);
    // return public interface
    return public;
};

// This is the class that represents a Game of Life
lifeApp.Game = function(width, height) {
    // how long, in millis, each step of the game should last by default
    var timestep = 200;

    // the LifeViewController that provides an interface to
    // a graphics library
    var ctl;

    // the Board that this game is being played on
    var board;

    // the timer that calls the step function at a
    // repeated interval. saved as a field so that
    // it can be stopped.
    var timer;

    // Whether the timer is currently running
    var running;

    // create a new Game of life. This includes a board
    // and a graphics controller
    var init= function() {
	ctl = lifeApp.LifeViewController(width, height);
	board = lifeApp.Board(width, height);
	var start_state = board.init();
	ctl.updateBoard(start_state);
    };

    // step the game, which involves stepping the board &
    // sending the update to the graphics controller
    var step = function() {
	var changes = board.step();
	ctl.updateBoard(changes);
	return changes;
    };

    // start running the game, with the specified timestep
    var run = function(t_step) {
	if(!running) {
	    var interval = t_step ? t_step : timestep;
	    timer = window.setInterval(step, interval);
	    running = true;
	}
    };

    // pause the game if currently running
    var pause = function() {
	if(running) {
	    window.clearInterval(timer);
	    running = false;
	}
    };

    // toggle the state of the given cell. This is
    // only allowed when the game is paused
    var toggleCellState = function(x, y) {
	if(!running) {
	    var toggled_cell = board.toggleCellState(x, y);
	    ctl.updateBoard([toggled_cell]);
	}
    };

    // the public interface for the Game class
    var public = {
        init : init,
        step : step,
        run : run,
        pause : pause,
	toggleCellState : toggleCellState
    };

    Object.freeze(public);
    return public;
};



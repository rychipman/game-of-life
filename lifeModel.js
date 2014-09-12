
var Board = function(width, height, wrap) {
    // private instance variables
    var width = width ? width : 25;
    var height = height ? height : 25;
    var wrap = wrap ? wrap : true;
    var columns = null; // to be assigned later

    // private methods
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
        return [[right,down], [right,y], [x,down], [left,up], [left,y], [x,up], [right,up], [left,down]];
    };

    var mapBoard = function(map_fn) {
	var mapColumn = function(column, currentCol) {
            return column.map(function(square, currentRow) {
	        return map_fn(currentCol, currentRow, square);
            });
	};
	var c = columns;
	var new_board = columns.map(mapColumn);
	return new_board;
    };

    var copyBoard = function(board) {
	return mapBoard(function(square) {
	    return square;
	});
    };

    var getNextState = function(x, y) {
	var currentState = columns[x][y];
	var neighbors = getNeighbors(x, y);
	var live_neighbors = neighbors.reduce(function(prevVal, currVal, idx, arr) {
	    var x = currVal[0];
	    var y = currVal[1];
            return prevVal + columns[x][y];
	}, 0);
	var nextState = 0;
	if(live_neighbors === 3) {
	    nextState = 1;
	} else if(live_neighbors === 2) {
	    nextState = currentState;
	}
	return nextState;
    }

    // the Board object's public interface
    var public = {

	    step : function() {
		var columns_new = mapBoard(getNextState);
		columns = copyBoard(columns_new);
		return columns_new;
	    },

	    init : function(live_squares) {
		columns = [];
		for(var x=0; x<width; x++) {
		    columns[x] = [];
		    for(var y=0; y<height; y++) {
			var str = x + "," + y;
			if(live_squares) {
	     		    if(live_squares.indexOf(str)<=0)
			        columns[x].push(1);
			    else
			        columns[x].push(0);
			} else {
			    columns[x].push(Math.floor(Math.random()*2));
			}
		    }
		}
		return columns;
	    },

            mapBoard : mapBoard
    };
    Object.freeze(public);
    return public;
};

var Game = function(width, height) {
    var running = false;
    var timestep = 200;
    var ctl;
    var board;
    var timer;

    var step_game = function() {
	var next_state = board.step();
	ctl.updateBoard(next_state);
    };

    var public = {

        init : function(live_squares) {
	    ctl = LifeViewController(width, height);
	    board = Board(width, height, true);
	    board.init(live_squares);
        },

        step : step_game,

        run : function(t_step) {
	    running = true;
	    var interval = t_step ? t_step : timestep;
	    timer = window.setInterval(step_game, interval);
        },

        pause : function() {
	    window.clearInterval(timer);
        }

    };
    Object.freeze(public);
    return public;
}


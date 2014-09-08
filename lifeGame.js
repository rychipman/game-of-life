
//TODO: provide a few methods of initialization:
// - Random
// - List of coords for live cells
// - 2D array of 0/1

//TODO: make these not constants
var BOARD_WIDTH = 25;
var BOARD_HEIGHT = 25;

var board = [];
var newBoard = [];

var clone = function(object) {
    return JSON.parse(JSON.stringify(object));
};

var lifeInit = function() {
    board = new Array(BOARD_WIDTH);
    for(var i=0; i<BOARD_WIDTH; i++) {
        var column = new Array(BOARD_HEIGHT);
        for(var j=0; j<BOARD_HEIGHT; j++) {
            column[j] = Math.floor(Math.random() * 2);
        }
        board[i] = column;
    }
    newBoard = clone(board);
};

var getNeighbors = function(x, y) {
    var right = x == BOARD_WIDTH - 1 ? 0 : x + 1;
    var left = x == 0 ? BOARD_WIDTH - 1 : x - 1;
    var down = y == BOARD_HEIGHT - 1 ? 0 : y + 1;
    var up = y == 0 ? BOARD_HEIGHT - 1 : y - 1;
    return [[right,down], [right,y], [x,down], [left,up], [left,y], [x,up], [right,up], [left,down]];
};

var liveNeighbors = function(x, y) {
    live = 0;
    var neighbors_array = getNeighbors(x, y);
    for(var idx=0; idx<neighbors_array.length; idx++) {
        var neighbor = neighbors_array[idx];
        live += board[neighbor[0]][neighbor[1]];
    }
    return live;
};

var lifeStep = function() {
    for(var x=0; x<BOARD_WIDTH; x++) {
        for(var y=0; y<BOARD_HEIGHT; y++) {
            var wasLive = board[x][y];
            var neighbors = liveNeighbors(x, y);
            if(neighbors < 2 || neighbors > 3) {
                newBoard[x][y] = 0;
            } else if(neighbors === 2) {
                newBoard[x][y] = board[x][y];
            } else {
                newBoard[x][y] = 1;
            }
        }
    }
    board = clone(newBoard);
};

var playLife = function() {
    lifeInit();
    drawGrid(board);
    window.setInterval(function() {
        lifeStep();
        drawGrid(board);
    }, 500);
}

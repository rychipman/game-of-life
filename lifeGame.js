
//TODO: provide a few methods of initialization:
// - Random
// - List of coords for live cells
// - 2D array of 0/1

//TODO: make these not constants

// from stackoverflow.com/questions/8486099/how-do-i-parse-a-url-query-parameters-in-javascript
var getJsonFromUrl = function() {
    var query = location.search.substr(1);
    var result = {};
    query.split("&").forEach(function(part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
};

var params = getJsonFromUrl();

var BOARD_WIDTH = params.grid_w ? params.grid_w : 25;
var BOARD_HEIGHT = params.grid_h ? params.grid_h : 25;
var WRAP = params.wrap ? params.wrap : true;
var LIVE_COLOR = params.color_live ? params.color_live : "#222222";
var DEAD_COLOR = params.color_dead ? params.color_dead : "#FFFFFF";
var TIMESTEP = params.timestep ? params.timestep : 400;
var INITIAL_STATE = params.start ? params.start : [];

var board = [];
var newBoard = [];

var clone = function(object) {
    return JSON.parse(JSON.stringify(object));
};

var lifeInit = function(startLive) {
    board = new Array(BOARD_WIDTH);
    for(var x=0; x<BOARD_WIDTH; x++) {
        var column = new Array(BOARD_HEIGHT);
        for(var y=0; y<BOARD_HEIGHT; y++) {
            if(startLive.length == 0) {
                column[y] = Math.floor(Math.random() * 2);
            } else if(startLive.indexOf(x + "," + y) > -1) {
                column[y] = 1;
            } else {
                column[y] = 0;
            }
        }
        board[x] = column;
    }
    newBoard = clone(board);
};

var getNeighbors = function(x, y) {
    if(WRAP) {
        var right = x == BOARD_WIDTH - 1 ? 0 : x + 1;
        var left = x == 0 ? BOARD_WIDTH - 1 : x - 1;
        var down = y == BOARD_HEIGHT - 1 ? 0 : y + 1;
        var up = y == 0 ? BOARD_HEIGHT - 1 : y - 1;
    } else {
        var right = x + 1;
        var left = x - 1;
        var down = y + 1;
        var up = y - 1;
    }
    return [[right,down], [right,y], [x,down], [left,up], [left,y], [x,up], [right,up], [left,down]];
};

var liveNeighbors = function(x, y) {
    live = 0;
    var neighbors_array = getNeighbors(x, y);
    for(var idx=0; idx<neighbors_array.length; idx++) {
        var neighbor = neighbors_array[idx];
        if(neighbor)
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
    lifeInit(INITIAL_STATE);
    drawGrid(board);
    window.setInterval(function() {
        lifeStep();
        drawGrid(board);
    }, TIMESTEP);
}

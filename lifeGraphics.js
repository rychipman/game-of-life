
// Set up canvas and drawing options
var canvas = document.getElementById("lifeCanvas");
var ctx = canvas.getContext("2d");

// Methods for drawing
// Assume for now that we work with a 500x500 canvas
// and a 25 by 25 life grid
// TODO: handle that stuff dynamically, maybe based on URL

var BOARD_COLORS = [DEAD_COLOR, LIVE_COLOR];

var CANVAS_HEIGHT = 500;
var CANVAS_WIDTH = 500;
var X_MAX = BOARD_WIDTH - 1;
var Y_MAX = BOARD_HEIGHT - 1;

var cellHeight = CANVAS_HEIGHT / (X_MAX + 1);
var cellWidth = CANVAS_WIDTH / (Y_MAX + 1);

var colorCell = function(grid_x, grid_y, cellColor) {
    if(grid_x > X_MAX || grid_y > Y_MAX || grid_x < 0 || grid_y < 0)
        throw new Error("Attempted to draw out-of-bounds cell");
    ctx.fillStyle = cellColor;
    var x = grid_x * cellWidth;
    var y = grid_y * cellHeight;
    ctx.fillRect(x, y, cellWidth, cellHeight);
};

var drawGrid = function(gridArray) {
    for(var x=0; x<gridArray.length; x++) {
        for(var y=0; y<gridArray[x].length; y++) {
            colorCell(x, y, BOARD_COLORS[gridArray[x][y]]);
        }
    }
};

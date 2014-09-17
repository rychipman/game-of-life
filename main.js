// initialize custom namespace or use existing
var lifeApp = lifeApp || {};

// this function will be run on page load
lifeApp.autorun = function() {
    var params = lifeApp.getJsonFromUrl();

    // if specifying a custom start state, these squares will
    // be alive. Format: ///&alive_squares=["0,0","1,1",...]...
    var alive_squares = params.alive_squares;
    if(alive_squares)
	// split into an array of strings formatted how we want them
	alive_squares = alive_squares.substr(2,params.alive_squares.length-4).split('","');

    // whether the board should wrap
    var wrap = (params.wrap === 'true');
    var timestep = parseInt(params.timestep);

    // if choosing a preset configuration, specify here
    // this overrides alive_squares
    var preset = params.preset;

    // width and height of the board, in cells
    var width = params.width ? params.width : 50;
    var height = params.height ? params.height : 50;

    var alive;
    if(preset)
	alive = presets[preset];
    else if(alive_squares)
	alive = alive_squares;

    // start the game with the specified params
    var game = lifeApp.Game(width,height);
    game.init(alive, wrap);
    game.run(timestep);
};

// parses URL parameters into JSON
lifeApp.getJsonFromUrl = function() {
    // from stackoverflow.com/questions/8486099/how-do-i-parse-a-url-query-parameters-in-javascript
    var query = location.search.substr(1);
    var result = {};
    query.split("&").forEach(function(part) {
	var item = part.split("=");
	result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
};

// preset states for the board
lifeApp.presets = {

    glider_gun : ["0,4","0,5","1,4","1,5",   "10,4","10,5","10,6","11,3","11,7","12,2","12,8","13,2","13,8","14,5","15,3","15,7","16,4","16,5","16,6","17,5",    "20,2","20,3","20,4","21,2","21,3","21,4","22,1","22,5","24,0","24,1","24,5","24,6",   "34,2","34,3","35,2","35,3"],

    switch_engine : ["0,5","2,5","2,4","4,3","4,2","4,1","6,0","6,1","6,2","7,1"],

    oscillators : []

};

//run the autorun function when the page has loaded
window.onload = lifeApp.autorun;

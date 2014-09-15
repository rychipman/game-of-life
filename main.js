window.onload = function() {
    var params = getJsonFromUrl();
    var alive_squares = params.alive_squares;
    if(alive_squares)
	alive_squares = alive_squares.substr(2,params.alive_squares.length-4).split('","');
    var wrap = (params.wrap === 'true');
    var timestep = parseInt(params.timestep);
    var preset = params.preset;

    var alive;
    if(preset)
	alive = presets[preset];
    else if(alive_squares)
	alive = alive_squares;

    var game = Game(40, 40);
    game.init(alive, wrap);
    game.run(timestep);
};

var getJsonFromUrl = function() {
    // from stackoverflow.com/questions/8486099/how-do-i-parse-a-url-query-parameters-in-javascript
    var query = location.search.substr(1);
    var result = {};
    query.split("&").forEach(function(part) {
	var item = part.split("=");
	result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
};

var glider_gun = ["0,4","0,5","1,4","1,5",   "10,4","10,5","10,6","11,3","11,7","12,2","12,8","13,2","13,8","14,5","15,3","15,7","16,4","16,5","16,6","17,5",    "20,2","20,3","20,4","21,2","21,3","21,4","22,1","22,5","24,0","24,1","24,5","24,6",   "34,2","34,3","35,2","35,3"];

var presets = {
    glider_gun : glider_gun
};

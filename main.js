window.onload = function() {
    var params = getJsonFromUrl();
    game = Game(40, 40);
    game.init();
    game.run();
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


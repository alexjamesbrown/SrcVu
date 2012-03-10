var request = require('request'),
	express = require('express');

var app = express.createServer(
	express.favicon()
);

app.get('/', function(req, resp){
	resp.writeHeader(200, {"Content-Type": "text/plain"}); 
	resp.write("no url set");
	resp.end();
});

app.get('/:url', function(req, resp){
	
	var url = req.params.url;

	//ensure url starts with http:// (or we get an invalid protocol exception from request)
	if (url.substring(0, 7) != "http://") {
	    url="http://"+url;
	}
		
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			resp.writeHeader(200, {"Content-Type": "text/plain"}); 
			resp.write(body);
			resp.end();
		}
	})
});

var port = process.env.PORT || 8080;
//console.log(port);
app.listen(port);
var http = require('http'),
	request = require('request');

var server = http.createServer(function (req, resp) {
	
	var url = req.url.slice(1);

	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			resp.writeHeader(200, {"Content-Type": "text/plain"}); 
			resp.write(body);
			resp.end();
		}
	})
});

server.listen(8080);
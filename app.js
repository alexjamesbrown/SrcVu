var http = require('http'),
	request = require('request');

var server = http.createServer(function (req, resp) {
	
	var url = req.url.slice(1);
	
	// control for favicon
	  if (url === 'favicon.ico') {
	    r.writeHead(200, {'Content-Type': 'image/x-icon'} );
	    r.end();
	    return;
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

server.listen(port);
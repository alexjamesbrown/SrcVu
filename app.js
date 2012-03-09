var http = require('http'),
	request = require('request');

var server = http.createServer(function (req, resp) {
	
	var url = req.url.slice(1);
	
	// control for favicon
	  if (url === 'favicon.ico') {
	    resp.writeHead(200, {'Content-Type': 'image/x-icon'} );
	    resp.end();
	    return;
	  }

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
server.listen(port);
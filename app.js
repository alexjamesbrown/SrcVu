var request = require('request'),
express = require('express');

var app = express.createServer();

//config
var port = process.env.PORT || 8080;

app.configure(function(){
	app.set("view options", { layout: false, pretty: true });
	app.use(express.bodyParser());
	app.use(express.favicon());
	app.use(express.static(__dirname + '/public'));
}
);

// Routes
app.get('/', function(req, resp){
	resp.render('index.jade');
});

app.get('/:url', function(req, resp){
	getSource(req.params.url, resp);
});

app.post('/', function(req, resp){
	getSource(req.param('url', null), resp);
});

function getSource(url, resp)
{
	//ensure url starts with http:// (or we get an invalid protocol exception from request)
	if (url.substring(0, 7) != "http://") {
		url="http://"+url;
	}

	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {			
			resp.render('src.jade', {pageTitle: 'Source of: '+url, content: body})
		}
	})	
}

app.listen(port);
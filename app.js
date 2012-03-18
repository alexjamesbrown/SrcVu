var request = require('request'),
	express = require('express'),
	getSource = require('./modules/getsource'),
	app = express.createServer(),
	port = process.env.PORT || 5000;

app.configure(function(){
	app.set("view options", { layout: false, pretty: true });
	app.use(express.bodyParser());
	app.use(express.favicon());
	app.use(express.static(__dirname + '/public'));
});

// Routes
app.get('/', function(req, resp){
	resp.render('index.jade');
});

app.get('/:url', function(req, resp){
	getSource(req.params.url, resp);
});

app.post('/', function(req, resp){
	resp.redirect('/' + req.param('url', null));
});

app.listen(port);
console.log('Listening on port '+port);
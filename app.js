var request = require('request'),
    express = require('express'),
    app = express.createServer(),
    port = process.env.PORT || 5000;

app.configure(function() {
    app.set('view options', {
        layout: false,
        pretty: true
    });
    app.set('view engine', 'ejs')
    app.use(express.bodyParser());
    app.use(express.favicon());
    app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, resp) {
    resp.render('index.ejs');
});

app.get('/:url*', function(req, res) {
    var url = req.param('url');

    //ensure url starts with http:// (or we get an invalid protocol exception from request)
    if (url.substring(0, 7) != "http://") {
        url = "http://" + url;
    }

    request(url, function(err, response, body) {

        if (err) {
            return res.render('error.ejs', {
                error: err
            });
        }

        if (!response) {
            return res.render('error.ejs', {
                error: 'Not Found'
            });
        }

        if (response.statusCode == 200) {
            return res.render('src.ejs', {
                url: url,
                content: body
            })
        }
    })
});

app.post('/', function(req, resp) {
    resp.redirect('/' + req.param('url', null));
});

app.listen(port);
console.log('Listening on port ' + port);

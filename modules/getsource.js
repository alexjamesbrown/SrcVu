var request = require('request');

module.exports = function(url, res)
{
	//ensure url starts with http:// (or we get an invalid protocol exception from request)
	if (url.substring(0, 7) != "http://") {
		url="http://"+url;
	}

	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {			
			res.render('src.jade', {pageTitle: 'Source of: '+req.params.url, content: body})
		}
	})	
}
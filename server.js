var port = 8060;
var http = require('http');
var URL = require('url');
var server = http.createServer(function(req, res) {
    var query = unescape(URL.parse(req.url).pathname).substring(1);
    var dateToParse;
    if (Number(query)) {
        //query is a unix timestamp
        dateToParse = new Date(Number(query) * 1000);
    }
    else if (Date.parse(query)){
        //query is readable
        dateToParse = new Date(query);
    }
    else if (! query){
        res.end('This is a timeservice endpoint. I wrote this as a FreeCodeCamp baseline');
        return true;
    }
    else {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({'unix': null, 'natural': null}));
        return true;
    }
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({'unix': dateToParse.getTime() / 1000, 'natural': dateToParse.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric' })}));
});
server.listen(port);

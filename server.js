var express = require('express');
var body_parser = require('body-parser');
var app = express();

app.use(body_parser.json());

app.head('/heartbeat', function(request, response){
    response.status(204).end();
});

const port = 2643;
app.listen(port, function(){
    console.log('listening on port %s', port);
});

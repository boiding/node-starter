var express = require('express');
var body_parser = require('body-parser');
var app = express();

app.use(body_parser.json());

app.head('/heartbeat', function(request, response) {
    console.log('heartbeat request received');
    response.status(204).end();
});

app.post('/brain', function(request, response) {
    console.log('brain is picked');
    var intent = process(request.body);
    response.status(200).send(intent).end();
});

function process(flock) {
    var result = {};
    for (name in flock.boids) {
        var b = behavior(flock[name], flock);
        if (b) {
            result[name] = b;
        }
    } 
    return result;
}

function behavior(boid, flock) {
    return {
        'heading': 0,
        'speed': 1
    };
}

const port = 8081;
app.listen(port, function(){
    console.log('listening on port %s', port);
});

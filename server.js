const fastify = require('fastify');
var app = fastify({
  logger: {
      prettyPrint: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname'
      }
  }
});

app.head('/heartbeat', function(request, reply) {
    console.log('heartbeat request received');
    reply.code(204).send();
});

app.post('/brain', function(request, reply) {
    console.log('brain is picked');
    var intent = process(request.body);
    reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(intent);
});

function process(flock) {
    var result = {};
    for (name in flock.boids) {
        var b = behavior(flock.boids[name], flock);
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
app.listen(port, "0.0.0.0", function(err, address) {
    if (err) throw err
});

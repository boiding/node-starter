var express = require('express');
var body_parser = require('body-parser');
var app = express();

app.use(body_parser.json());

app.post('/register', function(request, response){
    console.log(request.body);
    response.send('Ok');
});

app.listen(2643, function(){
    console.log('listening on port 2643');
});

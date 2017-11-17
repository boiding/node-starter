var ip = require('ip');
var request = require('request');

var script_arguments = process.argv.slice(2);

if (script_arguments.length != 1) {
    console.log('usage: npm run register <team-name>');
    process.exit(1);
}

var data = {
    "ip_address": ip.address(),
    "name": script_arguments[0]
}

request({
    url: 'http://localhost:2643/register',
    method: 'POST',
    json: data
}, function(error, response, body){
    console.log(response);
});

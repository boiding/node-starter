var ip = require('ip');
var request = require('request');
var command_line_arguments = require('command-line-args');

var command_options_definitions = [
    { name: 'unregister', alias: 'u', type: Boolean },
    { name: 'name', type: String, defaultOption: true }
];

var command_options;
try {
    command_options = command_line_arguments(command_options_definitions);
} catch(error) {
    usage_and_quit('could not parse command line arguments');
}

if (!command_options.name) {
    usage_and_quit('missing require option \'team-name\'');
}

if (!command_options.unregister) {
    register(command_options);
} else {
    unregister(command_options);
}

function usage_and_quit(reason) {
    console.log(reason);
    console.log('usage: npm run register [--unregister] <team-name>');
    process.exit(1);
}

function register(command_options) {
    var data = {
        'ip_address': ip.address(),
        'name': command_options.name
    };

    request({
        url: 'http://localhost:2643/register',
        method: 'POST',
        json: data
    }, function(error, response, body){
        if (error) {
            console.log('whoops');
            return;
        }
        if (response && response.statusCode === 204) {
            console.log('successfully registered \'%s\' at %s', data.name, data.ip_address);
        } else {
            console.log('could not register: \'%s\'', response.body.reason);
        }
    });
}

function unregister(command_options) {
    var data = {
        "name": command_options.name
    };

    request({
        url: 'http://localhost:2643/register',
        method: 'DELETE',
        json: data
    }, function(error, response, body){
        if (error) {
            console.log('whoops');
            return;
        }
        if (response && response.statusCode === 204) {
            console.log('successfully unregistered \'%s\'', data.name);
        } else {
            console.log('could not unregister: \'%s\'', response.body.reason);
        }
    });
}

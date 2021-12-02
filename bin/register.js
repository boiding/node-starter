const ip = require('ip');
const fetch = require('node-fetch');
const command_line_arguments = require('command-line-args');

const command_options_definitions = [
    { name: 'unregister', alias: 'u', type: Boolean },
    { name: 'port', alias: 'p', type: Number, defaultValue: 2643 },
    { name: 'server', alias: 's', type: String, defaultValue: '192.168.1.101' },
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
    console.log('usage: npm run register [--unregister] [--port 2643] [--server 192.168.1.101] --name <team-name>');
    process.exit(1);
}

function register(command_options) {
    var data = {
        'ip_address': ip.address(),
        'port': command_options.port,
        'name': command_options.name
    };

    var url = 'http://' + command_options.server + ':2643/register'
    fetch(url, {
        method: 'POST',
        body:    JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    }).then(response => {
        if (response.ok) {
            console.log('successfully registered \'%s\' at %s', data.name, data.ip_address);
        } else {
            console.log('could not register: \'%s\'', response.body.reason);
        }
    }).catch(error => {
        console.log('whoops');
    });
}

function unregister(command_options) {
    var data = {
        "name": command_options.name
    };

    var url = 'http://' + command_options.server + ':2643/register'
    request({
        url: url,
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

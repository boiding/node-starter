var script_arguments = process.argv.slice(2);

if (script_arguments.length != 1) {
    console.log('usage: npm run register <team-name>');
    process.exit(1);
}

console.log(script_arguments[0]);

# node-starter
A Boiding workshop starter kit using node.

For feedback and improvements go to the [repository][repo]

## Registering to the Workshop Server
The `package.json` describes a `register` script that can be used to register
your team. It can be invoked via

```sh
npm run register -- <team-name>
```

The script needs an argument; the team name. If you are looking for inspiration,
why not join your favorite color, your favorite city and your favorite animal
with dashes. E.g. my team name would be yellow-nijmegen-ant.

### Unregistering
When you want to unregister, for what every reason. Pass the `--unregister` flag
to the above command.

```sh
npm run register -- --unregister <team-name>
```

## Starting Brain Server
To start the node brain server run the command

```sh
node server.js
```

Remember to restart your server everytime you made some changes.

[repo]: https://github.com/boiding/node-starter 
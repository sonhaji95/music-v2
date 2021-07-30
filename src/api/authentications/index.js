const AuthenticationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'authentications',
  version: '1.0.0',
  register: async (server, {
    authenticationService,
    userService,
    tokenManager,
    validator,
  }) => {
    // eslint-disable-next-line no-undef
    const authenticationsHandler = new AuthenticationsHandler(
      authenticationService,
      userService,
      tokenManager,
      validator,
    );
    // eslint-disable-next-line no-undef
    server.route(routes(authenticationsHandler));
  },
};

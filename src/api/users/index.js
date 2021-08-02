const UsersHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'users',
    version: '1.0.0',
    register: async (server, { userService, validator }) => {
        const userHandler = new UsersHandler(userService, validator);
        server.route(routes(userHandler));
    },
};

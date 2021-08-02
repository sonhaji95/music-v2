const PlaylistsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlists',
  version: '1.0.0',
  register: async (server, { playlistService, validator }) => {
    const playlistHandler = new PlaylistsHandler(playlistService, validator);
    server.route(routes(playlistHandler));
  },
};

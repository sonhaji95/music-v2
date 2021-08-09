const routes = (handler) => [
    {
        method: 'POST',
        path: '/exports/playlists/{playlistId}',
        handler: handler.postExportPlaylistsHandler,
        options: {
            auth: 'musicapps_jwt',
        },
    },
];

module.exports = routes;

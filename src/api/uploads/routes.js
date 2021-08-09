const routes = (handler) => [
    {
        method: 'POST',
        path: '/upload/pictures',
        handler: handler.postUploadImageHandler,
        options: {
            payload: {
                allow: 'multipart/form-data',
                maxBytes: 500 * 1024,
                multipart: true,
                output: 'stream',
            },
        },
    },
];

module.exports = routes;

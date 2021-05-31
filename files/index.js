(() => {
    'use strict';
    const handlers = require('./handlers');

    const plugin = {
        "name": "files",
        "version": "1.0.0.",
        register: async function (server, options) {
            server.route([{
                method: 'POST',
                path: '/file',
                handler: handlers.upload,
                options: {
                    plugins: {
                        'hapi-swagger': {
                            payloadType: 'form'
                        }
                    },
                    description: 'Upload files',
                    notes: 'Uploading files',
                    tags: ['api'],
                    payload: {
                        maxBytes: 1024 * 1024 * 500,
                        parse: true,
                        output: 'stream',
                        allow: 'multipart/form-data'
                    }
                }
            }]);
        }
    };

    module.exports = plugin;
})();
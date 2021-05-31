(() => {
    'use strict';
    const Hapi = require('hapi')
    const prefix = '/api/fm';

    const server = new Hapi.Server({
        host: '0.0.0.0',
        port: 3000
    });

    const swaggerOptions = {
        info: {
            title: 'Test API Documentation'
        },
        basePath: prefix
    };

    const start = async function () {
        await server.register([{
            plugin: require('inert')
        }, {
            plugin: require('vision')
        }, {
            plugin: require('hapi-swagger'),
            options: swaggerOptions
        }, {
            plugin: require('hapi-cors'),
            options: {
                methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS']
            }
        },{
            plugin: require('./files/index'),
            routes: { prefix: prefix }
        }]);
    };

    const init = async () => {
        try {
            await start();
            await server.start();
            console.log(`Server running at: ${server.info.uri}`);
        }
        catch (err) {
            console.log(err)
        }
    };

    process.on('unhandledRejection', () => {
        //console.log(err);
        process.exist(1);
    });

    init();


})();
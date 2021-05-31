(() => {
    'use strict';

    const fs = require('fs');
    const Boom = require('boom');
    const shell = require('shelljs');
    const path = require('path');
    const dirTree = require("directory-tree");
    const FileType = require('file-type');

    const root = "test/";

    exports.upload = async (request, h) => {
        try {
            let { payload } = request;

            if (Array.isArray(payload.file)) {
                for (let i = 0; i < payload.file.length; i++) {
                    payload.file[i].pipe(fs.createWriteStream(root + payload.file[i].hapi.filename));
                }
            } else {
                payload.file.pipe(fs.createWriteStream(root + payload.file.hapi.filename));
            }

            return {status: 'ok'};
        } catch (error) {
            console.log(error);
            return Boom.unauthorized(error);
        };
    }
})();
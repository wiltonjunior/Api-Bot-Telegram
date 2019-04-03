
'use strict';

class VersionController {
    constructor() {
        this.getVersion = this.getVersion.bind(this);
        this.package = require('../../../../../package.json')
    }
    getVersion(req, res) {
        try {
            res.json({
                "name": this.package.name,
                "version": this.package.version
            });
        } catch (error) {
            res.sendStatus(400).json(error);
        }
    }
}

module.exports = new VersionController();
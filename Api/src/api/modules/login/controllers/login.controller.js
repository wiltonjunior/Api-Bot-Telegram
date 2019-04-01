
'use strict';

class LoginController {
    constructor() {
        this.post = this.post.bind(this);
        this.Login = require('../../../models/Login.model');
        this.authService = require('../../../service/auth.Service');
        this.post = this.post.bind(this);
        this.createKey = this.createKey.bind(this);
    }

    async post({ body: { key } }, res) {
        try {
            await this.Login.findOne({ key });
            res.json({
                token: this.authService.generaterToken({ key })
            });
        } catch (error) {
            res.sendStatus(400).json(error);
        }
    }

    async createKey({ body }, res) {
        try {
            await new this.Login(body).save();
            res.json({
                key: body.key,
                token: this.authService.generaterToken({ key: body.key })
            });
        } catch (error) {
            res.sendStatus(400).json(error);
        }
    }

}

module.exports = new LoginController();
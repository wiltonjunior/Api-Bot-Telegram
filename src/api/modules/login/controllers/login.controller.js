
'use strict';

class LoginController {
    constructor() {
        this.post = this.post.bind(this);
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
}

module.exports = new LoginController();
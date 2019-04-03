
class AuthService {
    constructor() {
        this.jwt = require('jsonwebtoken');
        this.secret = process.env.JWT_SECRET;
        this.expiresIntime = process.env.JWT_EPIRES_IN;
        this.generaterToken = this.generaterToken.bind(this);
    }

    generaterToken(params = {}) {
        return `Bearer ${this.jwt.sign(params, this.secret, {
            expiresIn: this.expiresIntime
        })}`;
    }

}

module.exports = new AuthService();


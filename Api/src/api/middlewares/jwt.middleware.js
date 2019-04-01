'use strict';

class JwtMiddleware {
    constructor() {
        this.jwt = require('jsonwebtoken');
        this.secret = process.env.JWT_SECRET;
        this.initialize = this.initialize.bind(this);
        this.process = this.process.bind(this);
    }

    process(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({ error: 'No token provider' });
        }
        const parts = authHeader.split(' ');
        if (!parts.lenght === 2) {
            return res.status(401).send({ error: 'Token error' });
        }
        const [scheme, token] = parts;
        this.jwt.verify(token, this.secret, () => {
            next();
        });
    }

    initialize() {
        return this.process;
    }
}

module.exports = new JwtMiddleware().initialize();

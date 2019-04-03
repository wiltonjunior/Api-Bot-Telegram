
'use strict';

class AxiosController {
    constructor() {
        this.axios = require('axios');
        this.token = process.env.TELEGRAM_TOKEN;
        this.sendMessage = this.sendMessage.bind(this);
        this.api = this.axios.create({
            baseURL: `https://api.telegram.org/bot${this.token}`,
        });
    }

    async sendMessage(message, text) {
        const { chat: { id } } = message
        try {
            await this.api.get('/sendMessage',
                {
                    params: {
                        text,
                        chat_id: id,
                    }
                }
            )
        } catch (error) {
            await this.sendMessage(message, `Error: ${error} 😅😐.`);
        }
    }

}

module.exports = AxiosController;
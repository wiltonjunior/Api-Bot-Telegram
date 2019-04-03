
'use strict';

const AxiosController = require('./axios.controller');

class TelegramController extends AxiosController {
    constructor() {
        super();
        this.post = this.post.bind(this);
        this.Command = require('./command.controller');
        this.operators = ["/start", "/key", "/tarefa", "/tarefas", "/editar", "/deletar", "/stop"];
    }

    _verifyCommand(text) {
        for (const operador of this.operators) {
            if (operador.toLowerCase() === text.toLowerCase()) {
                return operador;
            }
        }
        return '';
    }

    async post({ body: { message } }, res) {
        let words = String(message.text).trim().split(' ');
        const command = String(this._verifyCommand(words[0])).replace('/', '');
        if ((['start', 'key', 'tarefas'].indexOf(command) !== -1) && words.length == 1) {
             this.sendMessage(message, await this.Command[command](message.text))
        } else if ((['tarefa', 'editar', 'deletar'].indexOf(command) !== -1) && words.length > 1) {
             this.sendMessage(message, await this.Command[command](message.text))
        } else if (command) {
             this.sendMessage(message, 'Comando mal formatado!!\nExemplo: /key ou /editar {{task}} ')
        } else {
             this.sendMessage(message, 'Olá! Sou seu assistente virtual para tarefas!')
        }
        res.sendStatus(200);
    }

}

module.exports = new TelegramController();
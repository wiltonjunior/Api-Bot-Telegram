

'use strict';

class CommandController {

    constructor() {
        this.key = this.key.bind(this);
        this.stop = this.stop.bind(this);
        this.start = this.start.bind(this);
        this.editar = this.editar.bind(this);
        this.tarefa = this.tarefa.bind(this);
        this.deletar = this.deletar.bind(this);
        this.tarefas = this.tarefas.bind(this);
        this.Ultis = require('../../../../utils/ultis');
        this.ToDo = require('../../../models/ToDo.model')
        this.Login = require('../../../models/Login.model');
        this.authService = require('../../../service/auth.Service');
    }

    async start() {
        const array = ['/key - Gerar chave de autenticação',
            '/tarefas - Lista de tarefas',
            '/tarefa - Cria uma nova tafera',
            '/editar - Alterar o status da tarefa para concluida',
            '/deletar - Para apagar uma tarefa da lista',
            '/stop - Finaliza conexão'
        ];
        var text = '';
        for (const e of array) text += `${e} \n`;
        return `Seja bem vindo ao Bot de Tasks!\nDigite um comando para realizar uma ação: \n\n${text}`;
    }

    async key() {
        try {
            const key = this.Ultis.serialGenerator();
            await new this.Login({ key }).save();
            return `Sua Key de acesso é: "${key}"! 👌`
        } catch (error) {
            return `Falha na conexão! 😅`;
        }
    }

    async tarefas() {
        try {
            const result = await this.ToDo.find().lean();
            if (result.length) {
                let text = '';
                for (const e of result) text += `${e.name} - ${e.done ? '👍' : '👎'} \n`;
                return `Lista de tarefas: \n${text}`;
            } else {
                return `Lista de Vazia! 😅`;
            }
        } catch (error) {
            return `Error ${error}! 😅`;
        }
    }

    async tarefa(text) {
        try {
            let task = text.replace('/tarefa', '').trim();
            const body = {
                name: task,
                done: false,
            }
            await new this.ToDo(body).save();
            return `A tarefa ${task} foi adicionada com sucesso! 👍`;
        } catch (error) {
            return `Parâmetro não encontrado!`;           
        }
    }

    async editar(text) {
        try {
            const name = text.replace('/editar', '').trim();
            let result = await this.ToDo.findOne({ name }).lean();
            result.done = !result.done;
            delete result._id
            await this.ToDo.findOneAndUpdate(result);
            return `A tarefa ${name} foi editada com sucesso! 👍`;
        } catch (error) {
            return `Parâmetro não encontrado!`;
        }
    }

    async deletar(text) {
        try {
            const name = text.replace('/deletar', '').trim();
            let result = await this.ToDo.findOne({ name }).lean();
            await this.ToDo.findByIdAndDelete(result._id);
            return `A tarefa ${name} foi deletada com sucesso! 👍`;
        } catch (error) {
            return `Parâmetro não encontrado!`;
        }
    }

    async stop() {
        return `Conexão finalizada!`;
    };

}

module.exports = new CommandController();
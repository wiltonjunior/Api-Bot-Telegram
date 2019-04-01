'use strict';

require('dotenv').config();

const http = require('./http');
const ultis = require('./utils/ultis');
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/start/, ({ chat: { id } }) => {
    const array = ['/key - Gerar chave de autenticação',
        '/tarefas - Lista de tarefas',
        '/tarefa - Cria uma nova tafera',
        '/editar - Alterar o status da tarefa para concluida',
        '/deletar - Para apagar uma tarefa da lista',
        '/stop - Finaliza conexão'
    ];
    var text = '';
    for (const e of array) text += `${e} \n`;
    bot.sendMessage(id, `Seja bem vindo ao Bot de Tasks!\nDigite um comando para realizar uma ação:\n\n${text}`);
});

// Gerar chave de autenticação !
bot.onText(/\/key/, async ({ chat: { id } }) => {
    try {
        const { data: { key, token } } = await http.post('/login/newKey', { key: ultis.serialGenerator() });
        let text = `Sua Key de acesso é: "${key}"!`
        global.TOKEN = token;
        bot.sendMessage(id, `Atenticação concluida!\n${text}`);
    } catch (error) {
        bot.sendMessage(id, `Error: ${error}`);
    }
});

// Finaliza Conexão ! 
bot.onText(/\/stop/, async ({ chat: { id } }) => {
    global.TOKEN = '';
    bot.sendMessage(id, `Conexão finalizada!`);
});

// Lista de tarefas !
bot.onText(/\/tarefas/, async ({ chat: { id } }) => {
    try {
        let text = '';
        const result = await http.get('/todo');
        for (const e of result.data) text += `${e.name} - ${e.done ? '👍' : '👎'} \n`;
        bot.sendMessage(id, `Lista de tarefas: \n${text}`);
    } catch (error) {
        bot.sendMessage(id, `Antes de acessar as informações, você precisa se autenticar!\nUtilize o comando /key.`);
    };
});


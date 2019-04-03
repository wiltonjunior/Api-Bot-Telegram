# Api-Bot-Telegram

#### Preparando ambiente

Start API - npm start

#### Rotas da aplicação

GET localhost:3000/api/v1 - Retornar a versão; 

POST localhost:3000/api/v1/login - Retorna Token;

GET localhost:3000/api/v1/todo - Lista de tarefas; 

POST localhost:3000/api/v1/todo - Adiciona Tafera; 

GET localhost:3000/api/v1/todo:id - Retornar Tafera; 

PUT localhost:3000/api/v1/todo:id - Atualiza Tafera;

POST localhost:3000/api/v1/telegram - Conexão com a api do telegram. 

#### Sobre o Bot

Os comandos do Bot são listatos através do comando **/start**.

#### Configurações do Bot

Cadastrar o web Hook da API, para estabaler a comunicação com o telegram.

https://api.telegram.org/bot{{TOKEN}}/setWebhook?url={{POST PARA API}}

Link do Bot

https://web.telegram.org/#/im?p=@wiltonjuniorBot
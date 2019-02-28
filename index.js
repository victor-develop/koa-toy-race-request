const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const writeToDb = require('./write-to-db')
const app = new Koa();

app
    .use(bodyParser())
    .use(async ctx => {
        ctx.type = 'application/json';
        const {req_id, user_id} = ctx.request.body;
        await writeToDb(user_id+req_id);
        ctx.body = ctx.request.body;
    });

app.listen(3000);

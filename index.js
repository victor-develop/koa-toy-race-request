const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const writeToDb = require('./write-to-db')
const app = new Koa();

app
    .use(bodyParser())
    .use(async ctx => {
        ctx.type = 'application/json';
        await writeToDb();
        ctx.body = ctx.request.body;
    });

app.listen(3000);

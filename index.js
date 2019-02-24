const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

app
    .use(bodyParser())
    .use(async ctx => {
        ctx.type = 'application/json';
        ctx.body = ctx.request.body;
    });

app.listen(3000);

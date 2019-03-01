const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const writeToDb = require('./write-to-db')
const app = new Koa();

const key = (...args) => args.join('-')

app
    .use(bodyParser())
    .use(async ctx => {
        ctx.type = 'application/json';
        const {req_id, user_id} = ctx.request.body;
        await writeToDb(req_id +'___'+user_id);
        ctx.body = ctx.request.body;
    });

app.listen(3000);

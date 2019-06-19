const { canUserChangeStatus } = require("./canUserChangeStatus");

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const User = require('./user');
const app = new Koa();

const chargeUser = async () => {
    console.log('apply charge $100')
}

app
    .use(bodyParser())
    .use(async ctx => {
        ctx.type = 'application/json';
        const {status} = ctx.request.body;
        const current_status = await User.getSubscriptionStatus()
        if (!canUserChangeStatus(current_status, status)) {
            ctx.status = 422
            ctx.body = {success: false, msg: `cannot change from ${current_status} to ${status}`}
        } else {
            await User.updateSubscriptionStatus(status)
            if (status === 'active') { 
                await chargeUser()
            }
            ctx.body = {
                success: true,
                status
            }
        }
    });

app.listen(3001);

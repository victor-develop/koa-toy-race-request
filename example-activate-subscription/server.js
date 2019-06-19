const canUserChangeStatus = require("./canUserChangeStatus");
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const User = require('./user');
const app = new Koa();

// Storage service operation


const chargeUser = async () => {
    console.log('apply charge $100')
}

app
    .use(bodyParser())
    .use(async ctx => {
        ctx.type = 'application/json';
        const {status} = ctx.request.body;

        // ----- Command Section-----
        const event_id = await User.requestToUpdateSubscriptionStatus(status) // Command
        // --------------------------


        // ----- Query Section -----
        const [success, events] = await User.readRequestResult(event_id)
        // --------------------------

        console.log({events, event_id})

        if (!success) {
            console.log('no charge')
            ctx.status = 422
            ctx.body = {success: false, msg: `cannot change from ${events[event_id - 1]} to ${status}`}
        } else {
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

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
require('dotenv').config()
const writeToDb = require('./write-to-db')
const app = new Koa();

const pubSub = require('./pub_sub');

const {AWS_REGION, AWS_FIFO_URL: QueueUrl} = process.env
const AWS = require('aws-sdk');
AWS.config.update({AWS_REGION});
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});


const topic = (req_id) => `topic_${req_id}`

setInterval(async () => {
    const {Messages} = await sqs.receiveMessage({
        QueueUrl,
    }).promise()

    if (!Messages) return;

    const tasks = Messages.map(async m => {
        const {ReceiptHandle, Body} = m
        const {user_id, req_id} = JSON.parse(Body)
        await writeToDb(req_id +'___'+user_id);
        await sqs.deleteMessage({QueueUrl, ReceiptHandle}).promise()
        pubSub.emit(topic(req_id))
    })
    await Promise.all(tasks)
}, 1000)

app
    .use(bodyParser())
    .use(ctx => {
        ctx.type = 'application/json';
        const {user_id, req_id} = ctx.request.body;

        return new Promise((resolve) => {
            
            pubSub.on(topic(req_id), () => {
                ctx.body = ctx.request.body;
                resolve()
            })

            sqs.sendMessage({
                QueueUrl,
                MessageBody: JSON.stringify({user_id, req_id}),
                MessageGroupId: user_id
            })
            .promise()
        })
    });

app.listen(3000);

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
require('dotenv').config()
const writeToDb = require('./write-to-db')
const app = new Koa();

const pubSub = require('./pub_sub');

const {AWS_REGION, AWS_FIFO_URL} = process.env
const AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_REGION});
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

const params = {
    MessageGroupId: 'SAMPLE',
    MessageBody: Math.random() + 'hello-world-sample',
    QueueUrl: AWS_FIFO_URL
  };

//  sqs.sendMessage(params).promise()

const topic = (req_id) => `topic_${req_id}`

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
            writeToDb()
            .then(() => {
                pubSub.emit(topic(req_id))
            })
        })
    });

app.listen(3000);

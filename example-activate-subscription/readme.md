# Event Sourcing, CQRS, DDD

This is a tech sharing presentation and the code demo for concepts of event sourcing and how it solves race condition problem.

Demo problem background: a billing api service charge user multiple times due to two requests reaching server simultaneously.

## Run the demo

Start the server in one terminal

```js
cd $repository_root // root path of this code repo
// start the server and check output in 1 terminal
node example-activate-subscription/server.js
```

Fire requests in another terminal

```js
cd $repository_root // root path of this code repo
// activate (and get charged)
node example-activate-subscription/activate.js
// cancel your activation
node example-activate-subscription/cancel.js
// fire two activation requests at almost the same time
node example-activate-subscription/clickTwiceQuickly.js
```

Code branches:

 - race condition problem: `git checkout base-case`
 - solve with event sourcing + CQS: `git checkout evt-src-cqs`
 - solve with event sourcing + CQRS: `git checkout evt-src-cqrs`
 - solve with event sourcing + CQRS optimization: `git checkout evt-src-cqrs-cronjob`

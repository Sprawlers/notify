const line = require('@line/bot-sdk')
const config = require('./config')
const mongoose = require('mongoose')

const mongoDB = config.db_host
const db = mongoose
    .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(console.log('Connected to database'))
    .catch((e) => console.error(e))

const lineConfig = config.line
const client = new line.Client(lineConfig)

const msg = {
    type: 'text',
    text: "test notification"
}

client.broadcast(msg).catch(e => console.error(e))


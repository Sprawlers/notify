// Imports
const {getHomeworkNotifyString} = require("./controller/functions")
const {getAllHomework} = require("./model/functions")

// Packages
const line = require('@line/bot-sdk')
const config = require('./config')
const mongoose = require('mongoose')

// Async Run Function
const run = async () => {
    // Connect to MongoDB
    await mongoose
        .connect(config.db_host, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    console.log("Successfully connected")

    // Instantiate line client
    const client = new line.Client(config.line)

    /**
     * Define phase dictionary for phase with values stored in hours
     *
     * 'urgent' = 12 hours
     * 'warning' = 1 day
     * 'notify' = 3 days
     */
    const phaseDic = {
        'urgent': 12,
        'warning': 24,
        'notify': 72
    }

    // Get all homework nearing deadline and create a JSON message containing it
    const hw = await getAllHomework()
    const msg = {
        type: 'text',
        text: getHomeworkNotifyString(hw, phaseDic[config.phase], 'hours')
    }

    console.log(msg)

    // Broadcast to all users
    // client.broadcast(msg).catch(e => console.error(e))
}

// Call run function with error catching
run().catch(e => console.error(e))
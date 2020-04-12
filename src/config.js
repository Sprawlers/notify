const dotenv = require('dotenv')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === development) {
    const envFound = dotenv.config({ path: './.env' })
    if (!envFound) throw new Error("⚠️  Couldn't find .env file")
}

module.exports = {
    db_host: process.env.DB_HOST,
    line: {
        channelAccessToken: process.env.DEV_CHANNEL_TOKEN,
        channelSecret: process.env.DEV_CHANNEL_SECRET,
    },
    phase: process.env.PHASE
}

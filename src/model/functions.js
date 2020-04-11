// Schema imports
const Homework = require('./schema/Homework')

// Gets all homework documents, called with hw()
async function getAllHomework() {
    return await Homework.find({})
}

// Exports
module.exports = {
    getAllHomework
}

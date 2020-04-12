// *******************************
// *** Text Generator Function ***
// *******************************

function createText(title) {
    switch (title) {
    case "URGENT":
        return "" +
        `🔥${title.toUpperCase()} \n\n` +
        "These assignments will be due in 12 hours. Make sure that you all complete these assignments before time!"
    case "WARNNING":
        return "" +
        `🔥${title.toUpperCase()} \n\n` +
        "These assignment will be due in 24 hours. Continue or start working right away!`"
    case "NOTIFY":
        return "" +
        `🔥${title.toUpperCase()} \n\n`+
        "It seems that planning to work early is beneficial. 🧐🧐 \n" +
        "These homeworks will be due in soon."
    default:
        return "" +
        `🔥${title.toUpperCase()} \n\n` + 
        "Below is the list of the homeworks that is due soon! 📅 Make sure that you all complete it! 🤓✔️"
    }
}

module.exports.createText = createText

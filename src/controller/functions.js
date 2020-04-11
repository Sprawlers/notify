const Subject = require("./subject")

/**
 *
 * Gets a string message of subjects contained in {arr} that are {timeUntil} {timeUnit}
 *
 * @param phase Phase of the notification
 * @param arr Array of subject objects
 * @param timeUntil Duration of time before the deadline (Default = 0)
 * @param timeUnit Unit of time to use - select between 'days' or 'hours' (Default = days)
 * @returns {string} String payload containing formatted message
 *
 */
const createBubble = (phase, arr, timeUntil = 0, timeUnit = "days") => {
    timeUntil = checkUnit(timeUntil, timeUnit)
    // Obtain array of subjects nearing deadline
    const subjects = arr.map(subject => {
        // Subject assignments list
        // Must use parse and stringify in order to make assignments parameter work
        const list = Object
            .keys(safeParse(subject)["assignments"])
            .map(task => ({
                // Obtain milliseconds of difference between deadline and now and store it as a new parameter in object clone
                "title": task,
                "diff": new Date(safeParse(subject)["assignments"][task]["deadline"]) - new Date(Date.now())
            }))
            // Filter only subjects withing timeUntil and not overdue
            .filter(task => task["diff"] < timeUntil && task["diff"] > 0)
            .map(task => ({
                    title:  task.title,
                    time:   convertMillisToDaysAndHours(task.diff)
            }))
        return new Subject(subject["title"], ...list)
    }).filter(subject => subject.homeworks.length != 0)
    const contents = []
    subjects.map(subject => contents.push({ type: "separator" }, ...(subject.createFlexSubject())))
    contents.push({ type: "separator" })
    return {
        type:       "flex",
        altText:    "DueSoon",
        contents:   {
            type:   "bubble",
            body:   {
                type:       "box",
                layout:     "vertical",
                spacing:    "md",
                contents:   contents,
            },
            styles:  {
                body:   {
                    backgroundColor: "#344955"
                }
            }
        }
    }
}

// Utility functions
const safeParse = obj => JSON.parse(JSON.stringify(obj))
const checkUnit = (timeUntil, timeUnit) => {
    switch (timeUnit) {
    case 'days':
        timeUntil = convertDaysToMillis(timeUntil)
        break;
    case 'hours':
        timeUntil = convertHoursToMillis(timeUntil)
        break;
    }
    return timeUntil
}

// Time conversion functions
const convertDaysToMillis = days => convertHoursToMillis(days * 24)
const convertMillisToDays = millis => convertMillisToHours(millis) / 24
const convertHoursToMillis = hours => hours * 60 * 60 * 1000
const convertMillisToHours = millis => millis / (60 * 60 * 1000)

// Special function to format millis to "{x}d(ays) {y}h(ours)" format
const convertMillisToDaysAndHours = millis => {
    // Obtains a floored number of days
    const days = Math.floor(convertMillisToDays(millis)) > 0 ? Math.floor(convertMillisToDays(millis)) : null
    // Obtain hours, after subtracted from days
    const hours = Math.round(
        convertMillisToHours(
            convertDaysToMillis(convertMillisToDays(millis) - (days || 0))
        )
    )

    // Returns properly formatted string
    return `${days ? days + 'd ' : ""}${hours < 1 ? "< 1" : hours}h`
}

module.exports.createBubble = createBubble

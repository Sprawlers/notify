/**
 *
 * Gets a string message of subjects contained in {arr} that are {timeUntil} {timeUnit}
 *
 * @param arr Array of subject objects
 * @param timeUntil Duration of time before the deadline (Default = 0)
 * @param timeUnit Unit of time to use - select between 'days' or 'hours' (Default = days)
 * @returns {string} String payload containing formatted message
 */
const getHomeworkNotifyString = (arr, timeUntil = 0, timeUnit = "days") => {

    // Check input time unit
    switch (timeUnit) {
        case 'days':
            // Convert timeUntil to milliseconds
            timeUntil = convertDaysToMillis(timeUntil)
            break;
        case 'hours':
            // Convert timeUntil to milliseconds
            timeUntil = convertHoursToMillis(timeUntil)
            break;
    }

    // Obtain array of subjects nearing deadline
    const subjects = arr.map(subject => (
        // Loop through all subjects
        // Subject title
        `> ${subject["title"]}\n`
            // Subject assignments
        + Object
            .keys(subject["title"]["assignments"])
            .map(task => ({
                // Obtain milliseconds of difference between deadline and now and store it as a new parameter in object clone
                "title": task,
                "diff": new Date(subject["title"]["assignments"][task]["deadline"]) - new Date(Date.now())
            }))
            // Filter only subjects withing timeUntil and not overdue
            .filter(task => task["diff"] < timeUntil && task["diff"] > 0)
            // Format array to string message
            .map(task => ` - ${task["title"]} ${convertMillisToDaysAndHours(task["diff"])}`)
            .join("\n")
    )).join("\n")

    // Adds header to message and returns
    return `*(WARNING)*\nAssignments nearing deadline:\n${subjects}`
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
    return `( ${days ? days + 'd ' : ""}${hours < 1 ? "< 1" : hours}h )`
}

// Exports
module.exports = {
    getHomeworkNotifyString
}
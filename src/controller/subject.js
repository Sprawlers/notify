// *************************
// ***** Subject Class *****
// *************************

class Subject {

    constructor(name, ...homeworks) {
        this.name = name
        this.homeworks = homeworks
    }

    createFlexSubject() {
        const keys = Object.keys(this.homeworks)
        const list = keys.map(key => createFlexHomework(key))
        const flex = [{
            type:   "text",
            text:   this.name.toUpperCase(),
            weight: "bold",
            color:  "#FFFFFF",
        }];
        flex.push(...list)
        return flex
    }

    createFlexHomework(index) {
        return {
            type:   "box",
            layout: "basline",
            contents: [
                {
                    type:   "text",
                    text:   this.homework[index].title,
                    align:  "start",
                    weight: "bold",
                    color:  "#F9AA33",
                },
                {
                    type:   "text",
                    text:   `Due in ${this.homework[index].time}`,
                    align:  "end",
                    weight: "bold",
                    color:  "#F9AA33",
                }
            ],
        }
    }

}

module.exports = Subject

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
        const list = keys.map(key => this.createFlexHomework(key))
        const flex = [{
            type:   "text",
            text:   this.name.toUpperCase(),
            weight: "bold",
            color:  "#FFFFFF",
        }];
        flex.push(...list)
        console.log(flex)
        return flex
    }

    createFlexHomework(index) {
        return {
            type:   "box",
            layout: "baseline",
            contents: [
                {
                    type:   "text",
                    text:   this.homeworks[index].title,
                    align:  "start",
                    weight: "bold",
                    color:  "#F9AA33",
                },
                {
                    type:   "text",
                    text:   `Due in ${this.homeworks[index].time}`,
                    align:  "end",
                    weight: "bold",
                    color:  "#F9AA33",
                }
            ],
        }
    }

}

module.exports = Subject

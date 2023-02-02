class StaffQuestions {

    constructor(role){
        this.role = role;

        this.questions = [
            {
                type: "input",
                name: "mName",
                message: `Enter team ${this.role} name:`
            },
            {
                type: "input",
                name: "mId",
                message: `Enter team ${this.role} ID:`
            },
            {
                type: "input",
                name: "mEmail",
                message: `Enter team ${this.role}'s email:`
            },
        ];

    };


    addQuestion(type, name, message, choices) {

        if(choices && Array.isArray(choices)) {

            let newQuestion = {

                type: type,

                name: name,

                message: message,

                choices: choices

            }

            this.questions.push(newQuestion);

        }

        else {

            let newQuestion = {

                type: type,

                name: name,

                message: message

            }

            this.questions.push(newQuestion);

        }

    }

}

module.exports = StaffQuestions;
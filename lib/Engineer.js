const Employee = require("./Employee");

class Engineer extends Employee {

    constructor(name, email, id, gitHub) {
        super(name, id, email);

        this.gitHub = gitHub;
    };

    getGithub() {

        return this.gitHub;

    };

    getRole() {
        
        return "Engineer";

    };

};

module.exports = Engineer;
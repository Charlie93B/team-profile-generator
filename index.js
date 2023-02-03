const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const StaffQuestions = require("./lib/StaffQuestions");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

let employeeList = [];


// returns promise
const askQuestions = (emplyeeType) => {

    switch (emplyeeType){


        case "manager": {

            let managerQuestions = new StaffQuestions(emplyeeType);
            managerQuestions.addQuestion("input", "mOffice", "Enter team managers office number:");
    
            inquirer.prompt(

                managerQuestions.questions
            
            ).then((answers) => {
    
                let { mName, mId, mEmail, mOffice } = answers;
            
                const manager = new Manager(mName, mId, mEmail, mOffice);

                employeeList.push(manager);
            
                addEmployeePrompt();
            
            });

            break;
            
        };

        case "Add Engineer": {

            let engineerQuestions = new StaffQuestions(emplyeeType);
            engineerQuestions.addQuestion("input", "mGithub", "Enter Engineers github username:");

            inquirer.prompt(

                engineerQuestions.questions

            ).then((answers) => {

                let { mName, mId, mEmail, mGithub } = answers;

                const engineer = new Engineer(mName, mEmail, mId, mGithub);

                employeeList.push(engineer);

                addEmployeePrompt();

            })

            break;

        };

        case "Add Intern": {

            let internQuestions = new StaffQuestions(emplyeeType);
            internQuestions.addQuestion("input", "mSchool", "Enter school name:");

            inquirer.prompt(

                internQuestions.questions

            ).then((answers) => {

                let { mName, mId, mEmail, mSchool } = answers;

                const intern = new Intern(mName, mId, mEmail, mSchool);

                employeeList.push(intern);

                addEmployeePrompt();

            })

            break;
        
        }

    };


};


const addEmployeePrompt = () => {

    inquirer.prompt([
        {
            type: "list",
            name: "newEmployee",
            message: "Would you like to add an employee?",
            choices: ["Add Engineer", "Add Intern", "Finish Team"]
        }
    ]).then((answers) => {

        let addEmployee = answers.newEmployee;

        if(addEmployee != "Finish Team") {

            askQuestions(addEmployee);

        }

        else {

            fs.writeFile("./output/team.html", render(employeeList), (err) => {if(err) {console.log(err)}});

            console.log("Process Complete.");

        }

    });

}

askQuestions("manager");





#! /usr/bin/env node
var arg = require("arg");
var inquirer = require("inquirer");
var { createProject } = require("../src/index");

cli(process.argv);

async function cli(args) {
  console.log("cli is working");
  // let options = parseArgemuntsIntoOptions(args);
  // options = await promptForMissingOptions(options);
  // await createProject(options);
}

function parseArgemuntsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--yes": Boolean,
      "--install": Boolean
    },
    {
      argv: rawArgs.slice(2)
    }
  );

  return {
    skipPrompts: args["--yes"] || false,
    folderName: args._[0],
    runInstall: args["--install"] || false
  };
}
async function promptForMissingOptions(options) {
  const defautFolderName = "create-react-project";

  if (options.skipPrompts) {
    return {
      ...options,
      folderName: defautFolderName
    };
  }

  const questions = [];
  if (!options.folderName) {
    questions.push({
      type: "input",
      name: "folderName",
      message: "Please enter the folderName",
      default: defautFolderName
    });
  }
  if (!options.runInstall) {
    questions.push({
      type: "confirm",
      name: "runInstall",
      message: "Do you want to install packages",
      default: true
    });
  }

  const answer = await inquirer.prompt(questions);
  return {
    ...options,
    folderName: options.folderName || answer.folderName,
    runInstall: options.runInstall || answer.runInstall
  };
}

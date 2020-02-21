var chalk = require("chalk");
var fs = require("fs");
var ncp = require("ncp");
var path = require("path");
var { promisify } = require("util");
var Listr = require("listr");
var { projectInstall } = require("pkg-install");

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyRepoFiles(options) {
  return copy(options.repoDirectory, options.targetDirectory, {
    clobber: false
  });
}

async function createProject(options) {
  const repoDirectory = path.resolve(__dirname, "../cloneRepo");

  options = {
    ...options,
    targetDirectory: path.join(process.cwd(), options.folderName),
    repoDirectory: repoDirectory
  };

  // try {
  //   access(options.repoDirectory, fs.R_OK);
  // } catch (error) {
  //   console.error("$s Invalid folder name", chalk.red.bold("ERROR"));
  //   process.exit(1);
  // }

  const tasks = new Listr([
    { title: "Copy project files", task: () => copyRepoFiles(options) },
    {
      title: "Install dependencies",
      task: () => projectInstall({ cwd: options.targetDirectory }),
      skip: () =>
        !options.runInstall
          ? "Pass --install to automatically install dependencies"
          : undefined
    }
  ]);

  await tasks.run();
  console.log("%s Project ready", chalk.green.bold("DONE"));
  return true;
}

module.exports.createProject = createProject;

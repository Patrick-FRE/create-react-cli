#! /usr/bin/env node

var cloneOrPull = require("git-clone-or-pull");

function createReactApp(arg) {
  if (arg.length !== 3) {
    console.log("Invalid syntax");
    return;
  }

  const folderName = arg[2];
  cloneOrPull(
    "https://github.com/Patrick-FRE/react-poilerplate.git",
    path.join(process.cwd(), folderName),
    () => {
      console.log("clone successfully");
      console.log(process.cwd());
    }
  );
}

createReactApp(process.argv);

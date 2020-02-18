#! /usr/bin/env node

var cloneOrPull = require("git-clone-or-pull");
var path = require("path");
var rimraf = require("rimraf");

rimraf(path.join(process.cwd(), "cloneRepo"), function() {
  console.log("remove Dir");
  cloneRepo();
});
function cloneRepo() {
  cloneOrPull(
    "https://github.com/Patrick-FRE/react-poilerplate.git",
    path.join(process.cwd(), "cloneRepo"),
    () => {
      console.log("clone successfully");
    }
  );
}

/*
##################################################################
-- Name              : index.js
-- Creation Date     : 5-oct-2019
-- Author            : Aqib Ijaz
-- Reviewer          : 
##################################################################
*/

"use strict"

var libs = {};
var modals = require("../modals");
var fs = require("fs");
fs
  .readdirSync(__dirname)
  .filter((file) => {
    return(file.indexOf(".") !== 0) &&(file !== "index.js");
  })
  .forEach((file) => {
      var cd = file.replace(".js", "");
      libs[cd] = require("./" + file)(modals);
  });

module.exports = libs;

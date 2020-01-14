/*
##################################################################
-- Name              : index.js
-- Creation Date     : 5-oct-2019
-- Author            : Aqib Ijaz
-- Reviewer          :
##################################################################
*/

module.exports = (app) => {

  const routes = {};
  const libs = require("../libs");
  const resources = require('../schemas');
  let validateSchema = require('../middlewares/validateSchema');
  var fs = require("fs");
  fs
    .readdirSync(__dirname)
    .filter((file) => {
      return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach((file) => {
      var cd = file.replace(".js", "");
      routes[cd] = require("./" + file)(app, libs, resources, validateSchema);
    });

  return routes;
};

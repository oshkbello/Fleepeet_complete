/*
##################################################################
-- Name              : index.js
-- Creation Date     : 5-oct-2019
-- Author            : Aqib Ijaz
-- Reviewer          :
##################################################################
*/

"use strict";
const fs = require('fs');
const Joi = require('@hapi/joi');

let db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var cd = file.replace(".js", "");
    db[cd] = {};
    let modals = require("./" + file)(Joi);
    Object.keys(modals).map(modal => {
        db[cd][modal] = Joi.object().keys(modals[modal]);
    });
  });
module.exports = db;

/*
##################################################################
-- Name              : app.js
-- Creation Date     : 5-oct-2019
-- Author            : Aqib Ijaz
-- Reviewer          :
##################################################################
*/
"use strict"
const express = require("express");
require('dotenv').config()
const bodyParser = require("body-parser");
const colors = require('colors');
const app = express();
const routes = require("./routes")(express);
const cors = require('cors');
const swaggerUi =  require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type, If-Modified-Since,cache-control");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

Object.keys(routes).forEach((route) => {
  app.use("/" + route.toLowerCase(), routes[route])
});

if(process.env.NODE_ENV==="production"){
  app.use(express.static("client/build"));
  app.get('*',(req,res)=>{
    const path = require('path');
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })
}
// app.use(function (req, res, next) {
//   SEND_RESPONSE(res, HTTPRESPONSE.NOT_ALLOWED("No method implemented on requested route."));
// });
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

 var server =app.listen(process.env.PORT || 3002, function () {
  var port = server.address().port;
  console.log(('Express server listening on port : ' + port).bold.blue);
});



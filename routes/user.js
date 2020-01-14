/*
##################################################################
-- Name              : user.js
-- Creation Date     : 20-oct-2019
-- Author            : Mehmood
-- Reviewer          : Ahmad Raza
##################################################################
*/

"use strict";

module.exports = (app, lib, resources, validateSchema) => {
  var router = app.Router();
  let User = lib.User;
  let Validate = resources.User;
  let {
    JOI_VALIDATE,
    IS_AUTHORIZED,
    ERROR_RESPONSE
  } = require("../utils/helpers");

  const response = require("../utils/httpResponses");
  const authenticated = require("../middlewares/authenticated");
  const restrictTo = require("../middlewares/restrictTo");
  const UserSchema = require("../modals");
  const dbQuery = require("../modules/db_Quries");
  const { uploadProfileImage } = require("../services/s3upload");

  // Register User Account
  router.post(
    "/register",
    uploadProfileImage.array("profile_image", 1),
    async (req, res) => {
      let user = req.body;
      console.log(req.files);
      req.files.length === 0
        ? (user.profile_image = "")
        : (user.profile_image = req.files[0].location);
      user.tickets = 5;
      try {
        await User.RegisterNewUser(req, user, res);
      } catch (error) {
        return res
          .status(400)
          .send(response.error(400, `Error: ${error.message}`));
      }
    }
  );

  // Verify User Account
  router.get("/verify/:_id", async (req, res) => {
    try {
      await User.VerfiyAccount(req, res);
    } catch (error) {
      console.log(error);
      ERROR_RESPONSE(res, error);
    }
  });

  // Forget Password
  router.post("/forgetPassword", async (req, res) => {
    try {
      await User.ForgetPassword(req, res);
    } catch (error) {
      console.log(error);
      ERROR_RESPONSE(res, error);
    }
  });

  router.post("/active-account", async (req, res) => {
    try {
      await User.ActiveAccount(req, res);
    } catch (error) {
      console.log(error);
      ERROR_RESPONSE(res, error);
    }
  });

  // Reset Password
  router.put("/resetPassword/:token", async (req, res) => {
    try {
      await User.ResetPassword(req, res);
    } catch (error) {
      ERROR_RESPONSE(res, error);
    }
  });

  //  User Login
  router.post("/login", validateSchema, async (req, res) => {
    try {
      await User.logInUser(req, res);
    } catch (error) {
      console.log(error);
      ERROR_RESPONSE(res, error);
    }
  });

  router.put(
    "/user/edit",
    authenticated,
    uploadProfileImage.array("profile_image", 1),
    async (req, res) => {
      let user = req.body;
      console.log(req.body);
      req.body.profile_image === "h" ? delete user.profile_image : user;
      req.files.length === 0
        ? user
        : (user.profile_image = req.files[0].location);
      // console.log(user)
      try {
        await User.UpdateProfile(req, res, user);
      } catch (error) {
        ERROR_RESPONSE(res, error);
      }
    }
  );

  //  edit user profile data
  router.get("/userTickets", authenticated, async (req, res) => {
    try {
      await User.currentUserTickets(req, res);
    } catch (error) {
      ERROR_RESPONSE(res, error);
    }
  });

  router.get("/user", authenticated, async (req, res) => {
    try {
      res.json(req.user);
    } catch (error) {
      ERROR_RESPONSE(res, error);
    }
  });

  router.put("/suspendUser/:id", async (req, res) => {
    try {
      await User.SuspendUser(req, res);
    } catch (error) {
      ERROR_RESPONSE(res, error);
    }
  });

  router.delete("/delete/:id", authenticated, async (req, res) => {
    try {
      await User.Delete(req, res);
    } catch (error) {
      console.log(error);
      ERROR_RESPONSE(res, error);
    }
  });
  /************edit site user  info*/
  router.put(
    "/editSiteUser/:id",
    authenticated,
    restrictTo,
    async (req, res) => {
      let user = req.body;
      if (req.body.accountType !== "student") {
        user.school ='undefined' ;
      }
      try {
        await User.EditSiteUser(req, res, user);
      } catch (error) {
        return res
          .status(400)
          .send(response.error(400, `Error: ${error.message}`));
      }
    }
  );

  return router;
};

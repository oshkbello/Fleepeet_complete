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
  let Book = lib.Book;
  let { ERROR_RESPONSE } = require("../utils/helpers");
  const response = require("../utils/httpResponses");
  const authenticated = require("../middlewares/authenticated");
  const { uploadBookImage } = require("../services/s3upload");
  var geoip = require("geoip-lite");
  // const upload = require('../services/Multer');

  // *******************Create a new Book********************

  router.post("/createBook", authenticated, uploadBookImage.array('book_images', 10), async (req, res) => {
    try {
      let result = await Book.createBook(req,res);
      if(result){
        res.status(200).send(response.success(200, "Book created Successfully"));
      }

    } catch (error) {    
      console.log(error)
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });




  
  // *******************Create a new Book********************

  router.post("/editBook", authenticated, uploadBookImage.array('book_images', 10), async (req, res) => {
    try {
      // console.log(req.body);
      let data = await Book.editBook(req);
      return res
        .status(200)
        .send(response.success(200, "Book Edited Successfully", data));
    } catch (error) {    
      console.log(error)
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });

  
  // *******************Get New Books********************

  router.get("/getnewbooks", async (req, res) => {
    try {
      let data = await Book.getNewBooks();
      return res
        .status(200)
        .send(response.success(200, "Book get Successfully", data));
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .send(response.error(400, `Error: ${error.message}`));
    }
  });


    // *******************Get Seller Dashboard New Books********************

    router.get("/getSellerNewBooks",authenticated,async (req, res) => {
      try {
        let data = await Book.getSellerNewBooks(req);
        return res
          .status(200)
          .send(response.success(200, "Book get Successfully", data));
      } catch (error) {
        console.log(error);
        return res
          .status(400)
          .send(response.error(400, `Error: ${error.message}`));
      }
    });
  
  // *******************Filter Books********************

  router.post("/filterbooks", async (req, res) => {
    try {
      await Book.filterBooks(req, res);
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .send(response.error(400, `Error: ${error.message}`));
    }
  });

  // *******************Search All Book********************

  router.post("/getAllBooks", async (req, res) => {
    try {
      let data = await Book.getAllBooks(req, res);
      // res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .send(response.error(400, `Error: ${error.message}`));
    }
  });

  // *******************Search All Book********************

  router.get("/getsellerbooks", authenticated, async (req, res) => {
    try {
      const userId = req.user._id;
      let data = await Book.getSellerBooks(userId);
      res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .send(response.error(400, `Error: ${error.message}`));
    }
  });

  // *******************Search Single Book********************

  router.post("/getSingleBook", async (req, res) => {
    try {
      Book.getSingleBook(req, res);
    } catch (error) {
      return res
        .status(400)
        .send(response.error(400, `Error: ${error.message}`));
    }
  });

  // *******************Search Book********************

  router.post("/searchBook", async (req, res) => {
    try {
      let data = await Book.searchBook(req.body);
      if (data)
        res
          .status(200)
          .send(response.success(200, "Book Found in Record", data));
    } catch (error) {
      return res
        .status(400)
        .send(response.error(400, `Error: ${error.message}`));
    }
  });

  router.post("/updateBook/:bookId", async (req, res) => {
    try {
      console.log("Hiii");
      // let book = req.body;
      // let id = req.params.id;
      // let data = await Book.updateBook(book, id);
      // ERROR_RESPONSE(res, data)
    } catch (error) {
      ERROR_RESPONSE(res, error);
    }
  });

  // *******************Product Listing Comment********************

  router.post(
    "/commentBook",
    authenticated,
    validateSchema,
    async (req, res) => {
      try {
        const result = await Book.commentBook(req);
        if (result) {
          return res
            .status(200)
            .send(
              response.success(200, "Your Comment Saved Successfully.", result)
            );
        }
      } catch (error) {
        return res
          .status(400)
          .send(response.error(400, `Error: ${error.message}`));
      }
    }
  );

  // *******************Product Like********************

  router.post("/likeBook", authenticated, async (req, res) => {
    try {
      const result = await Book.LikeBook(req);
      if (result) {
        return res.status(200).send(response.success(200, "Success.", result));
      }
    } catch (error) {
      return res
        .status(400)
        .send(response.error(400, `Error: ${error.message}`));
    }
  });

  // *******************Put Tags********************

  router.post("/putTags", authenticated, async (req, res) => {
    try {
      const result = await Book.PutTags(req);
      if (result) {
        return res.status(200).send(response.success(200, "Success.", result));
      }
    } catch (error) {
      return res
        .status(400)
        .send(response.error(400, `Error: ${error.message}`));
    }
  });

  // *******************Put Tags********************

  router.post('/giveDiscount', authenticated, async (req, res) => {
    try {
      const result = await Book.SetBookPrice(req);
      if (result) {
        return res.status(200).send(response.success(200, "Success.", result));
      }
    } catch (error) {
      return res
        .status(400)
        .send(response.error(400, `Error: ${error.message}`));
    }
  });

  // *******************Set Delivery Type********************

  router.post("/setDeliveryOption", authenticated, async (req, res) => {
    try {
      const result = await Book.SetDeliveryOption(req);
      if (result) {
        return res.status(200).send(response.success(200, "Success.", result));
      }
    } catch (error) {
      return res
        .status(400)
        .send(response.error(400, `Error: ${error.message}`));
    }
  });

  // *******************Set Publishing ********************

  router.post("/setPublishing", authenticated, async (req, res) => {
    try {
      const result = await Book.SetPublishing(req);
      if (result) {
        return res.status(200).send(response.success(200, "Success.", result));
      }
    } catch (error) {
      return res
        .status(400)
        .send(response.error(400, `Error: ${error.message}`));
    }
  });

  // *******************Delee Book from Listing ********************

  router.post("/deleteBook", authenticated, async (req, res) => {
    try {
      const result = await Book.DeleteBook(req);
      if (result) {
        return res
          .status(200)
          .send(
            response.success(200, "Success.Book Deleted Successfully", result)
          );
      }
    } catch (error) {
      return res
        .status(400)
        .send(response.error(400, `Error: ${error.message}`));
    }
  });

  return router;
};

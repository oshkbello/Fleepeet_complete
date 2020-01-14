/*
##################################################################
-- Name              : book.js
-- Creation Date     : 20-oct-2019
-- Author            : Mehmood
-- Reviewer          : Ahmad Raza
##################################################################
*/

"use strict";

module.exports = modals => {
  const Book = modals.Book;
  const dbQuery = require("../modules/db_Quries");
  const response = require("../utils/httpResponses");
  const Review = modals.Reviews;
  const BookLike = modals.BookLike;
  const PurchaseRequest = modals.PurchaseRequest;
  const Email = require('../services/Email');
  const Notifi = require('../utils/notifications');
  const User = modals.User;
  const moment = require('moment');
  const Reviews = modals.Reviews;
  var NodeGeocoder = require('node-geocoder');
  var geoip = require('geoip-lite');

  var options = {
    provider: 'google',

    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyBJEkgJFGeEbzd8TSZKB3UPVFSanf5zoFI', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
  };

  var geocoder = NodeGeocoder(options);
  return {

    //************************Create Book***************************  


    createBook: async (req, res) => {
      try{
        const tickets = await User.findOne({ _id: req.user._id }).select('tickets');
        if (tickets.tickets <= 0)
          throw response.error(400, `Error: You dont have Tickets please Buy Tickets!."`);
        let existingBook = await dbQuery.GetOne(Book, { isbn: req.body.isbn });
        if (existingBook)
          throw response.error(400, `Error: Book already exist with this ISBN."`);
        req.body.user = req.user._id;
        const tags = req.body.tags.split(',');
        req.body.tags = tags;
        req.body.status = 'published';
        delete req.body.book_images;
        const bookNames = [];
        req.files.map((element) => { bookNames.push(element.location) });
        req.body.book_images = bookNames;

        const  book =await dbQuery.Create(Book, req.body);
          if (book) {
            User.findOne({ _id: req.user._id }).then(user => {
              user.tickets -= 1;
              user.save();
              
            })
            await new Notifi(req.user._id, [req.user._id.toString()], `You have Created ${book.title} Book.`).send();
            return book
          }
          
        }catch(error){
          throw error
        }
    
    },



    //************************Create Book***************************  


    editBook: async req => {
      
      req.body.user = req.user._id;
      const tags = req.body.tags.split(',');
      req.body.tags = tags;
      req.body.status = 'published';
      if (!req.body.book_images) {

        const bookNames = [];
        req.files.map((element) => { bookNames.push(element.location) });
        req.body.book_images = bookNames;
      }
      // console.log(req.body);
      const data = await dbQuery.Edit(Book, { _id: req.body.bookId }, req.body);
      await new Notifi(req.user._id, [req.user._id.toString()], `You have Edit ${data.title} Book.`).send();
      return data;
    },


    //************************Get New Book***************************  

    getNewBooks: async () => {
      const res = await Book.find({ status: 'published' }).populate('user', 'school city').limit(10).sort({ $natural: -1 })
      return res
    },



      //************************Get New Book***************************  

      getSellerNewBooks: async (req) => {
        const res = await Book.find({ user: req.user._id }).populate('user').limit(10).sort({ $natural: -1 })
        return res
      },
  
  




    filterBooks: async (req, res) => {
      const title = req.body.title;
      const query = req.body.query;
      let pageNo = parseInt(req.body.pageNo);
      let size = 10;
      var querypage = {}
      let response1;
      if (pageNo < 0 || pageNo === 0) {
        response1 = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response1)
      }
      querypage.skip = size * (pageNo - 1)
      querypage.limit = size;

      if (title === 'school') {
        Book.find({ status: 'published' }).populate({
          path: 'user',
          options: {
            limit: querypage.limit,
            skip: querypage.skip
          },
          match: {
            school: query
          }
        }).exec(function (err, users) {
          let books = users.filter(function (user) {
            return user.user !== null;
          });
          let totalPages = books.length
          return res.json({ data: books, totalPages })
        });

      }

      else if (title === 'price') {

        Book.find({ price: { $gte: query.min, $lte: query.max } }).skip(querypage.skip).limit(querypage.limit).exec((err, books) => {
          let totalPages = books.length;
          return res.json({ data: books, totalPages });
        })
      }
      else {
        Book.countDocuments({ [title]: query }, (err, totalPages) => {
          Book.find({ [title]: query }).skip(querypage.skip).limit(querypage.limit).exec((err, books) => {
            return res.json({ data: books, totalPages });
          });

        });
      }

    },





    //************************Get all Books from Elastic Search*************************** 

    getAllBooks: async (req, res) => {

      try {

        var pageNo = parseInt(req.body.pageNo);
        var size = 10;
        var query = {}
        let response1;
        if (pageNo < 0 || pageNo === 0) {
          response1 = { "error": true, "message": "invalid page number, should start with 1" };
          return res.json(rsponse)
        }
        query.skip = size * (pageNo - 1)
        query.limit = size;

        // Find some documents
        Book.countDocuments({}, (err, totalPages) => {
          if (err) {
            response1 = { "error": true, "message": "Error fetching data" }
          }
          Book.find({ status: 'published' }, {}, query, function (err, data) {
            // Mongo command to fetch all data from collection.
            if (err) {
              response1 = { "error": true, "message": "Error fetching data" };
            } else {
              response1 = { "Success:": true, "data": data };
            }
            const pages = Math.ceil(totalPages / size)
            res.json({ response1, pages, totalPages });
          });
        })

      } catch (error) { throw error }

    },


    //************************Get all Books from Elastic Search*************************** 

    getSellerBooks: async (userid) => {
      // return await ESServices.Search("prodss", { _index: "prodss" });
      const res = await Book.find({ user: userid }).populate('user');
      return res;
    },







    //************************Get Single Books from Elastic Search*************************** 


    getSingleBook: async (req, res) => {
      try {
        const prodDetails = {};
        let pageNo = parseInt(req.body.page);
        let size = 10;
        var querypage = {}
        let response1;
        if (pageNo < 0 || pageNo === 0) {
          response1 = { "error": true, "message": "invalid page number, should start with 1" };
          return res.json(response1)
        }
        querypage.skip = size * (pageNo - 1)
        querypage.limit = size;
        let book = await Book.findOne({ _id: req.body.id }).populate('user');

        Reviews.countDocuments({ type: 'Book Review', bookid: req.body.id }, (err, totalPages) => {
          Reviews.find({ type: 'Book Review', bookid: req.body.id }).skip(querypage.skip).limit(querypage.limit).populate({
            path: 'userid'
          }).exec(function (err, reviews) {
            prodDetails.reviews = reviews;
            prodDetails.book = book;
            prodDetails.book.user.password = undefined;
            prodDetails.book.user.conformPassword = undefined;
            prodDetails.totalPages = totalPages;
            if (prodDetails) {
              res
                .status(200)
                .json({ prodDetails, totalPages })
            }
          });

        });
      } catch (error) {
        throw error;
      }

    },










    //************************Search Single Books from Elastic Search based on Title of ISBN*************************** 
    searchBook: async param => {

      geocoder.reverse({ lat: 45.767, lon: 4.833 })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });

      const { title, option } = param;
      let query = {};
      query[option] = title;
      let result = await Book.find({ [option]: new RegExp('^' + title, 'i') });
      return result;
    },


    //************************Get Single Books from Elastic Search*************************** 

    compareBooks: async (req, res) => {
      try {
        const ids = Object.values(req.body);
        const result = await Books.find({ _id: { $in: ids } });
        return res.status(200).send(response.success(200, "Success.", result));
      } catch (error) {
        return res.status(400).send(response.error(400, `Error: ${error.message}`));
      }
    },



    //************************Comment Listing*************************** 

    commentBook: async (req) => {
      try {
        console.log(req.user);

        console.log(req.body);
        const book = await Book.findOne({ _id: req.body.bookid }).populate('user');
        console.log(book);
        req.body.type = "Book Review";
        req.body.userid = req.user._id;
        const bookComment = await dbQuery.Create(Review, req.body)
        const msg = {};
        msg.to = book.user.email;
        [
          'Ahmad Raza <vision.ahmad@gmail.com>',
          'Mehmood <mehmood497@gmail.com>',
          book.user.email

        ]
        msg.from = req.user.email;
        msg.subject = `${req.user.firstName} ${req.user.lastName} Commented on Your Posted Book`;
        msg.text = `${req.user.firstName} ${req.user.lastName} Commented Your Posted Book at ` + Date.now();
        await Email.send(msg, () => { console.log(`Your Email Submitted Successfully at ${msg.to} From ${msg.from}`) });
        await new Notifi(req.user._id, [book.user._id.toString()], `Review added on ${book.title} Book.`).send();
        return bookComment;
      } catch (error) {
        throw error
      }
    },


    //************************Book Likes *************************** 


    LikeBook: async (req) => {
      try {

        req.body.userid = req.user._id;
        console.log(req.user.email);
        const checkLike = await dbQuery.GetOne(BookLike, { bookid: req.body.bookid, userid: req.user._id });
        if (checkLike) {
          return response.error(409, "You Already Liked This Book");
        }
        else {
          const book = await Book.findOne({ _id: req.body.bookid }).populate('user');
          book.likes.push({userId:req.user._id});
          await book.save();
          const bookLike = await dbQuery.Create(BookLike, req.body);
          const msg = {};
          msg.to = book.user.email;
          msg.from = req.user.email;
          msg.subject = `${req.user.firstName} ${req.user.lastName} Liked Your Posted Book`;
          msg.text = `${req.user.firstName} ${req.user.lastName} Liked Your Posted Book at ` + Date.now();
          await Email.send(msg, () => { console.log('Your Email Submitted Successfully') });
          await new Notifi(req.user._id, [book.user._id.toString()], `Like added on ${book.title} Book.`).send();
          return bookLike;
        }
      } catch (error) {
        console.log(error);
        throw error
      }
    },


    //************************Put Tags on Book ***************************

    PutTags: async (req) => {
      try {
        const { bookid, tags } = req.body;
        const book = await dbQuery.GetOne(Book, { _id: bookid })
        book.tags.push(tags);
        book.save();
        console.log(book);
        return book;
      } catch (error) {
        throw error
      }
    },


    //************************Put Tags on Book ***************************
    SetBookPrice: async (req) => {
      try {
        const { bookid, price } = req.body;
        const book = await dbQuery.GetOne(Book, { _id: bookid })
        book.oldPrice = book.price;
        book.price = price;
        book.save();
        console.log(book);
        
        return book;
      } catch (error) {
        throw error
      }
    },



    //************************Set Delivery Type***************************
    SetDeliveryOption: async (req) => {
      try {
        const { bookid, deliveryType } = req.body;
        const book = await dbQuery.GetOne(Book, { _id: bookid })
        book.deliveryType = deliveryType;
        book.save();
        console.log(book);
        return book;
      } catch (error) {
        throw error
      }
    },



    //************************Set Publishing***************************

    SetPublishing: async (req) => {
      try {
        const { bookid, status } = req.body;
        const book = await dbQuery.GetOne(Book, { _id: bookid })
        book.status = status;
        book.save();
        console.log(book);
        return book;
      } catch (error) {
        throw error
      }
    },


    //************************Delete Book ***************************

    DeleteBook: async (req) => {
      try {
        console.log(req.body);
        const { bookId } = req.body;
        const book = await Book.findOneAndDelete({ _id: bookId });
        if(book){
          await BookLike.deleteMany({bookid:bookId});
          await Reviews.deleteMany({bookid:bookId});
          await PurchaseRequest.deleteMany({bookid:bookId});
          await new Notifi(book.user, [book.user.toString()], `You have deleted ${book.title} book.`).send();
        }

        return book;
      } catch (error) {
        throw error
      }
    },

  };
};

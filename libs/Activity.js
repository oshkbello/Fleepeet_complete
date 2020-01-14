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
  const Location = modals.Location;
  const SellerReview = modals.Reviews;
  const PlateFormComment = modals.PlateformComments;
  const ReportSeller = modals.ReportAdmin;
  const PurchaseRequest = modals.PurchaseRequest;
  const Books = modals.Book;
  const Transaction = modals.Transactions;
  const Blog = modals.Blog;
  const FAQ = modals.FAQ;
  const Notification= require('../modals/Notifications');

  const response = require("../utils/httpResponses");
  const NewLetter = modals.NewsLetter;
  const dbQuery = require("../modules/db_Quries");
  const User = modals.User;
  const Email = require('../services/Email');
  const Notifi = require('../utils/notifications');

  const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY );
  const SiteContent = modals.SiteContent;
  return {
    setUserLocation: async (req, res) => {
      try {
        await validateLocation(req.body);
        let userLocation = await Location.create({
          user: req.user._id,
          lat: req.body.lat,
          lng: req.body.lng
        });
        await userLocation.save();
        return res
          .status(200)
          .send(response.success(200, "Success.", userLocation));
      } catch (error) {
        throw error;
      }
    },

    //******************Add Seller Reviews************************

    reviewSeller: async body => {
      try {
        console.log(body);
        let newSellerReview = await dbQuery.Create(SellerReview, body);

        await new Notifi(body.userid, [body.sellerid.toString()], `Review added for you.`).send();
        return newSellerReview
      } catch (error) {
        throw error;
      }
    },

    //******************Add Plateform Comments************************

    plateformComments: async body => {
      try {
        // console.log(body);
        let newPlateFormComment = await dbQuery.Create(PlateFormComment, body)
        return newPlateFormComment;

      } catch (error) {
        throw error;
      }
    },

    //******************Add Plateform Comments************************

    reportSeller: async (req, res) => {
      try {
        req.body.reporterID = req.user._id;
        req.body.email = req.user.email;
        console.log(req.user,req.body);
        let existingReport = await dbQuery.GetOne(ReportSeller, { reporterID: req.user._id, sellerid: req.body.sellerid });

        if (existingReport) {
          res
            .status(409)
            .json({ message: "You Have already Reported the Seller to Admin" });
        }
        let users = await User.find({role: 'admin'});
        let userArray = users.map((user) => user._id.toString());
        await new Notifi(req.user._id, userArray, `Report added of a seller.`).send();

        let newSellerreport = await dbQuery.Create(ReportSeller, req.body)
        return newSellerreport
      } catch (error) {
        throw error;
      }
    },

    //******************Send purchase Request************************

    purchaseRequest: async (req, res) => {
      try {
        console.log(req.body);
        console.log(req.user._id);
        const seller = await User.findOne({ _id: req.body.sellerid }).select(
          "email firstName lastName"
        );
        req.body.email = req.user.email;
        let existingRequest = await dbQuery.GetOne(PurchaseRequest, {
          userid: req.user._id,
          bookid: req.body.bookid
        });
        const book = await Books.findOne({ _id: req.body.bookid});
        if (existingRequest) {
          res
            .status(400)
            .send(response.success(400, "You have Already Sent the Request."));
        } else if (req.body.sellerid === req.user._id) {
          res
            .status(400)
            .send(
              response.success(
                400,
                "You cannot send Purchase request for Book you own!"
              )
            );
        } else if (req.body.paymentMethod === "Online") {
          req.body.email = req.user.email;
          req.body.userid = req.user._id;
          req.body.status = "Pending";
          const { token, price } = req.body;
          let amount = price * 100;

          const charge = await stripe.charges.create({
            amount: amount,
            currency: "usd",
            description: "Pending Charge for Book Request",
            source: token,
            capture: false
          });
          console.log(charge);
          req.body.chargeId = charge.id;
          delete req.body.token;
          var sixdigitsrandom = Math.floor(100000 + Math.random() * 900000);
          let newPurchaseRequest = await dbQuery.Create(
            PurchaseRequest,
            req.body
          );
          let transaction = {};
          transaction.userid = req.user._id;
          transaction.recepit = charge.receipt_url;
          transaction.price = price;
          transaction.transactionDate = Date.now();
          transaction.status = "pending";
          transaction.description =
            "You Sent Pending  Charge  Purchase Request for book";
          await dbQuery.Create(Transaction, transaction);
          if (newPurchaseRequest) {
            const msg = {};
            msg.to = seller.email;
            msg.from = "support@flipeet.com";
            msg.subject = `${req.user.firstName} ${req.user.lastName}  Sent you a Purchase Request on ${book.title} book.`;
            msg.text = `${req.body.description}`;
            await Email.send(msg, () => { console.log(`Your Email Submitted Successfully at ${msg.to}`) });
            await new Notifi(req.user._id, [req.body.sellerid.toString()], `Received Purchase Request on ${book.title} book.`).send();


            const msgBuyer = {};
            msgBuyer.to = req.user.email;
            msgBuyer.from = "support@flipeet.com";
            msgBuyer.subject = `Purchase Request has been on ${book.title} book sent Successfully`;
            msgBuyer.text = `Hello ${req.user.firstName} ${req.user.lastName} your Purchase Request has been sent Successfully to ${seller.firstName} on ${book.title} book.`;
            await Email.send(msgBuyer, () => {
              console.log(
                `Your Email Submitted Successfully at ${msgBuyer.to}`
              );
            });
            res
              .status(200)
              .send(
                response.success(
                  200,
                  "Your Purchase Request Submitted Successfully.",
                  sixdigitsrandom
                )
              );
          }
        } else if (req.body.paymentMethod === "Meetup") {
          req.body.userid = req.user._id;
          req.body.status = "Pending";
          let newPurchaseRequest = await dbQuery.Create(
            PurchaseRequest,
            req.body
          );
          if (newPurchaseRequest) {
            const msg = {};
            msg.to = seller.email;
            msg.from = "support@flipeet.com";
            msg.subject = `${req.user.firstName} ${req.user.lastName}  Sent you a Purchase Request on ${book.title} book.`;
            msg.text = `${req.body.description}`;
            await Email.send(msg, () => { console.log(`Your Email Submitted Successfully at ${msg.to}`) });
            await new Notifi(req.user._id, [req.body.sellerid.toString()], `Received Purchase Request on ${book.title} book.`).send();


            const msgBuyer = {};
            msgBuyer.to = req.user.email;
            msgBuyer.from = "support@flipeet.com";
            msgBuyer.subject = `Purchase Request has been on ${book.title} book sent Successfully`;
            msgBuyer.text = `Hello ${req.user.firstName} ${req.user.lastName} your Purchase Request has been sent Successfully to ${seller.firstName} on ${book.title} book.`;
            await Email.send(msgBuyer, () => {
              console.log(
                `Your Email Submitted Successfully at ${msgBuyer.to}`
              );
            });
            res
              .status(200)
              .send(
                response.success(
                  200,
                  "Your Purchase Request Submitted Successfully."
                )
              );
          }
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    //******************Get FAQ************************
    getFaq: async () => {
      try {
        let faqs = await dbQuery.Get(PurchaseRequest, req.body);
        return faqs;
      } catch (error) {
        throw error;
      }
    },

    //******************Contact Customer Support************************
    customerSupport: async req => {
      try {
        console.log("Contact Support");
      } catch (error) {}
    },

    //******************Subscribe News Letter************************

    subscribeNewsLetter: async (req, res) => {
      try {
        console.log(req.body);
        const { email } = req.body;

        const result = await dbQuery.GetOne(NewLetter, { email: email });
        console.log(result);
        if (result) {
          return res
            .status(200)
            .send(
              response.success(
                200,
                "You have already Subscribed to Newsletter."
              )
            );
        }
        req.body.status = "Subscribed";
        const newNewsLetter = await dbQuery.Create(NewLetter, req.body);
        return newNewsLetter;
      } catch (error) {
        throw error;
      }
    },

    //******************Get My Purchase Request************************

    getMyPurchaseOrders: async (req, res) => {
      try {
        const purchaseRequests = await PurchaseRequest.find({
          sellerid: req.user._id
        }).sort({ $natural: -1 })
          .populate("bookid")
          .populate("userid", "firstName lastName _id");
        return purchaseRequests;
      } catch (error) {}
    },

    //******************Get My Purchase Request************************

    purchaseRequestBuyer: async (req, res) => {
      try {
        const result = await PurchaseRequest.find({ userid: req.user._id }).sort({ $natural: -1 })
          .populate("bookid")
          .populate("userid", "firstName lastName _id");
        res.status(200).json({ result });
      } catch (error) {
        throw error;
      }
    },

    //******************Respond to Purchase Request************************

    respondToPurchaseRequest: async (req, res) => {
      try {
        const request = await PurchaseRequest.findOne({
          sellerid: req.user._id,
          _id: req.body.id
        }).populate("userid", "email");
        console.log('response to request');


        if (
          request.paymentMethod === "Online" &&
          req.body.status === "Accepted"
        ) {
          const charge = await stripe.charges.capture(request.chargeId);
          let transaction = {};
          transaction.userid = req.user._id;
          transaction.recepit = charge.receipt_url;
          transaction.price = charge.amount;
          transaction.transactionDate = Date.now();
          transaction.status = "Paid";
          transaction.description = `You have Charged for Purchase Request for book`;
          await dbQuery.Create(Transaction, transaction);
          const msg = {};
          msg.to = request.userid.email;
          msg.from = req.user.email;
          msg.subject = `${req.user.firstName} ${req.user.lastName}  Responds to Your Purchase Request and Amount is Deducted form your Account`;
          msg.text = `${req.body.description}`;
          await Email.send(msg, () => { console.log(`Your Email Submitted Successfully at ${msg.to}`) });
          await new Notifi(req.user._id, [req.body.id.toString()], `You have received Purchase Request from seller.`).send();
          request.status = req.body.status
          request.chargeId = undefined;

          const book = await Books.findOne({ _id: request.bookid });
          book.quantity = book.quantity - 1;
          if (book.quantity === 0) {
            book.status = 'unpublished';
          }
          book.save();

          request.save();
          res
            .status(200)
            .send(
              response.success(200, "Your Purchase Request Saved Successfully.")
            );
        } else if (
          request.paymentMethod === "Online" &&
          req.body.status === "Rejected"
        ) {
          console.log(req.body.status);
          stripe.refunds.create(
            { charge: request.chargeId },
            async function (err, refund) {
              console.log(refund);
              let transaction = {};
              transaction.userid = req.user._id;
              transaction.recepit = "";
              transaction.price = refund.amount;
              transaction.transactionDate = Date.now();
              transaction.status = 'Refunded';
              transaction.description = `You have Refunded for Purchase Request for book Seller Reject your Purchase Request`;
              await dbQuery.Create(Transaction, transaction);
              const msg = {};
              msg.to = request.userid.email;
              msg.from = req.user.email;
              msg.subject = `${req.user.firstName} ${req.user.lastName}  Responds to Your Purchase Request and Amount is Deducted form your Account`;
              msg.text = `${req.body.description}`;
              await Email.send(msg, () => { console.log(`Your Email Submitted Successfully at ${msg.to}`) });
              await new Notifi(req.user._id, [req.body.id.toString()], `You have received Purchase Request from seller.`).send();
              request.status = req.body.status
              request.chargeId = undefined;
              request.save();
              res
                .status(200)
                .send(response.success(200, "Your Purchase Request Saved Successfully."));
            }
          );
        }
        else {
          const msg = {};
          msg.to = request.userid.email;
          msg.from = req.user.email;
          msg.subject = `${req.user.firstName} ${req.user.lastName}  Responds to Your Purchase Request`;
          msg.text = `${req.body.description}` + Date.now();
          await Email.send(msg, () => { console.log(`Your Email Submitted Successfully at ${msg.to}`) });
          await new Notifi(req.user._id, [req.body.id.toString()], `You have received Purchase Request from seller.`).send();

          const book = await Books.findOne({ _id: request.bookid });
          book.quantity = book.quantity - 1;
          if (book.quantity === 0) {
            book.status = 'unpublished';
          }
          book.save();

          request.status = req.body.status
          request.save();
          res
            .status(200)
            .send(
              response.success(200, "Your Purchase Request Saved Successfully.")
            );
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },




    //******************Create Order************************

    buyTickets: async (req, res) => {
      try {
        const { tickets, token, ticketAmount} = req.body;
        if(token === null) {
          return res.status(400).json({message: 'Please confirm your payment!'});
        }
        const amount = tickets * ticketAmount * 100;

        const charge = await stripe.charges.create({
          amount: amount,
          currency: "usd",
          description: `You have purchased ${tickets} tickets.`,
          source: token,
          capture: true
        });
        if (charge) {
          let transaction = {};
          transaction.userid = req.user._id;
          transaction.recepit = charge.receipt_url;
          transaction.price = amount/100;
          transaction.transactionDate = Date.now();
          transaction.status = "Paid";
          transaction.description = `You have buyed ${tickets} tickets successfully.`;
          await dbQuery.Create(Transaction, transaction);
          const user = await dbQuery.GetOne(User, { _id: req.user._id });
          user.tickets += parseInt(tickets);

          let msg = {};
          msg.to = user.email;
          msg.from = "support@flipeet.com";
          msg.subject = "Purchase Tickets";
          msg.text = `Congratulations You have Purchased ${tickets} Tickets Successfully`;
          await Email.send(msg, () => { console.log(`Your Purchase Tickets Email Submitted Successfully at ${msg.to} From ${msg.from}`) });

          let users = await User.find({ role: 'admin' });
          let userArray = users.map((user) => user._id.toString());
          await new Notifi(req.user._id, userArray, `Seller Purchased ${tickets} Tickets.`).send();

          user.save();
          return user;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    //******************Refer to Friend************************

    referToFriend: async req => {
      try {
        const msg = {};
        msg.to = req.body.email;
        msg.from = req.user.email;
        msg.subject = `${req.user.firstName} ${req.user.lastName}  invites you to Join Flipeet`;
        msg.text =
          `${req.user.firstName} ${req.user.lastName} invites you to Join Flipeet by clicking this link https://flipeettest.herokuapp.com/ `;
        await Email.send(msg, () => {
          console.log(`Your Email Submitted Successfully at ${msg.to}`);
        });

        return msg;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    //******************Get User Profile Info************************

    userProfile: async (req, res) => {
      try {
        const info = {};
        const userInfo = await dbQuery.GetOne(User, { _id: req.body.id });
        const userBooks = await dbQuery.Get(Books, { user: req.body.id });
        let pageNo = parseInt(req.body.page);
        let size = 10;
        var querypage = {};
        let response1;
        if (pageNo < 0 || pageNo === 0) {
          response1 = {
            error: true,
            message: "invalid page number, should start with 1"
          };
          return res.json(response1);
        }
        querypage.skip = size * (pageNo - 1);
        querypage.limit = size;

        SellerReview.countDocuments(
          { type: "Seller Review" },
          (err, totalPages) => {
            SellerReview.find({ type: "Seller Review" })
              .skip(querypage.skip)
              .limit(querypage.limit)
              .populate({
                path: "userid"
              })
              .exec(function(err, reviews) {
                info.userInfo = userInfo;
                info.userBooks = userBooks;
                info.reviews = reviews;
                info.userInfo.password = undefined;
                info.userInfo.conformPassword = undefined;
                info.totalPages = totalPages;
                if (info) {
                  res.status(200).json({ info, totalPages });
                }
              });
          }
        );
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    //******************Get My Purchase Request************************

    getTransations: async (req, res) => {
      try {
        let pageNo = parseInt(req.body.page);
        let size = 10;
        var querypage = {};
        let response1;
        if (pageNo < 0 || pageNo === 0) {
          response1 = {
            error: true,
            message: "invalid page number, should start with 1"
          };
          return res.json(response1);
        }
        querypage.skip = size * (pageNo - 1);
        querypage.limit = size;

        Transaction.countDocuments({}, (err, totalPages) => {
          Transaction.find({ userid: req.user._id })
            .skip(querypage.skip)
            .limit(querypage.limit)
            .sort({ $natural: -1 })
            .exec(function(err, transactions) {
              if (transactions) {
                res.status(200).json({ transactions, totalPages });
              }
            });
        });
      } catch (error) {
        throw error;
      }
    },

    editSiteContent: async (req, res) => {
      try {
        console.log(req.body);
        if (req.body.contentType === "contactUsEmail") {
          let resl = await SiteContent.findOne({ id: 1 });
          resl.contactUsEmail = req.body.contactUsEmail;
          resl.save();
          res
            .status(200)
            .send(
              response.success(200, "Contact Us Email Edited Successfully.")
            );
        }
        if (req.body.contentType === "setTicketPrice") {
          await dbQuery.Edit(
            SiteContent,
            { id: 1 },
            { ticketPrice: req.body.ticketPrice }
          );
          res
            .status(200)
            .send(response.success(200, "Ticket Price Edited Successfully."));
        }
        if (req.body.contentType === "createPromoCode") {
          await SiteContent.findOneAndUpdate(
            { id: 1 },
            { $addToSet: { promoCode: req.body.promoCode } }
          );
          res
            .status(200)
            .send(response.success(200, "Ticket Price Edited Successfully."));
        }
      } catch (error) {
        throw error;
      }
    },

    //******************Get My Users************************

    getUser: async (req, res) => {
      try {
        let pageNo = parseInt(req.body.page);
        let size = 10;
        var querypage = {};
        let response1;
        if (pageNo < 0 || pageNo === 0) {
          response1 = {
            error: true,
            message: "invalid page number, should start with 1"
          };
          return res.json(response1);
        }
        querypage.skip = size * (pageNo - 1);
        querypage.limit = size;

        User.countDocuments({}, (err, totalPages) => {
          User.find({role: "user"})
            .skip(querypage.skip)
            .limit(querypage.limit)
            .exec(function(err, users) {
              if (users) {
                res.status(200).json({ users, totalPages });
              }
            });
        });
      } catch (error) {
        throw error;
      }
    },

    getPurchaseRequestsAdmin: async (req, res) => {
      try {
        let pageNo = parseInt(req.body.page);
        let size = 10;
        var querypage = {};
        let response1;
        if (pageNo < 0 || pageNo === 0) {
          response1 = {
            error: true,
            message: "invalid page number, should start with 1"
          };
          return res.json(response1);
        }
        querypage.skip = size * (pageNo - 1);
        querypage.limit = size;

        PurchaseRequest.countDocuments({}, (err, totalPages) => {
          PurchaseRequest.find({}).skip(querypage.skip).limit(querypage.limit).sort({ $natural: -1 }).populate('bookid userid').exec(function (err, purchaseRequests) {
            if (purchaseRequests) {
              res
                .status(200)
                .json({ purchaseRequests, totalPages })
            }
          });

        });
      } catch (error) {
        throw error;
      }
    },


    deletePurchaseRequest: async (req, res) => {
      console.log(req.body);
      try {
        const result = await PurchaseRequest.findOneAndDelete({
          _id: req.body.id
        });
        if (result) {
          res
            .status(200)
            .send(response.success(200, "Purchase Request deleted Successfully."));

        }
      } catch (error) {
        console.log(error)
        throw error
      }
    },

    //************************Add SLider Images***************************

    addSliderImage: async (req, res) => {
      console.log(req.files);
      const images = [];
      req.files.map(element => {
        images.push(element.location);
      });
      req.body.sliderImage = images;
      let content = await SiteContent.findOneAndUpdate({ id: 1 });
      content.sliderImage = images;

      content.save();
      res
        .status(200)
        .send(response.success(200, "Slider images Edited Successfully."));
    },

    //************************Add SLider Images***************************

    editBreadcrumbImage: async (breadcrumbImage, res) => {
      let content = await SiteContent.findOneAndUpdate({ id: 1 });
      content.breadcrumbImage = breadcrumbImage;
      content.save();
      res
        .status(200)
        .send(response.success(200, "Slider images Edited Successfully."));
    },

    getSiteContent: async (req, res) => {
      const content = await SiteContent.findOne({ id: 1 });
      res.status(200).json({ content });
    },

    //************************Get New Book***************************

    getMyNewPurchaseOrders: async req => {
      const res = await PurchaseRequest.find({ sellerid: req.user._id })
        .populate("bookid")
        .populate("userid", "firstName lastName _id")
        .limit(10)
        .sort({ $natural: -1 });
      return res;
    },

    //******************Get New My Purchase Request************************

    newPurchaseRequestBuyer: async (req, res) => {
      try {
        const result = await PurchaseRequest.find({ userid: req.user._id })
          .populate("bookid")
          .populate("userid", "firstName lastName _id")
          .limit(10)
          .sort({ $natural: -1 });
        res.status(200).json({ result });
      } catch (error) {
        throw error;
      }
    },

    //******************Get New My Purchase Request************************

    newPurchaseRequestBuyer: async (req, res) => {
      try {
        const result = await PurchaseRequest.find({ userid: req.user._id })
          .populate("bookid")
          .populate("userid", "firstName lastName _id")
          .limit(10)
          .sort({ $natural: -1 });
        res.status(200).json({ result });
      } catch (error) {
        throw error;
      }
    },
    /****************get users complaints */
    getuserComplaints: async (req, res) => {
      try {
        const data = await ReportSeller.find({}).sort({ $natural: -1 });
        if (data) {
          res.status(200).json(data);
        }
      } catch (error) {
        throw error;
      }
    },

    //************************ Blog Post Functionalities ***************************

  addBlogPost: async (req, res, post) => {

    const newPost = await Blog.create(post);
    res
      .status(200)
      .json({
        message: 'You are created post successfully!',
        newPost
      });
    },

    homeBlogPosts: async (req, res) => {
      // let pageNo = parseInt(req.body.page);
      // let size = parseInt(req.body.size);
      let pageNo = 1;
      let size = 3;
      var querypage = {};
      let response1;
      if (pageNo < 0 || pageNo === 0) {
        response1 = {
          error: true,
          message: "invalid page number, should start with 1"
        };
        return res.json(response1);
      }
      querypage.skip = size * (pageNo - 1);
      querypage.limit = size;
      const posts = await Blog.find()
        .skip(querypage.skip)
        .limit(querypage.limit)
        .sort({ $natural: -1 });
      res.status(200).json({ posts });
    },

    getBlogPosts: async (req, res) => {
      console.log(req.body);
      // let pageNo = parseInt(req.body.page);
      // let size = parseInt(req.body.size);
      let pageNo = 1;
      let size = 10;
      var querypage = {};
      let response1;
      if (pageNo < 0 || pageNo === 0) {
        response1 = {
          error: true,
          message: "invalid page number, should start with 1"
        };
        return res.json(response1);
      }
      querypage.skip = size * (pageNo - 1);
      querypage.limit = size;
      const posts = await Blog.find()
        .skip(querypage.skip)
        .limit(querypage.limit)
        .sort({ $natural: -1 });
      res.status(200).json({ posts });
    },

    getBlogPost: async (req, res) => {
      console.log("single");
      const post = await Blog.find({ _id: req.params.id });
      if (!post) {
        return res.status(400).json({
          message: `This Post does not exist!`
        });
      }
      res.status(200).json({ post });
    },

    editBlogPost: async (req, res, post) => {
      const updatedPost = await Blog.findOneAndUpdate(
        {
          _id: req.params.id
        },
        post,
        {
          new: true
        }
      );
      if (!post) {
        return res.status(400).json({
          message: `This Post does not exist!`
        });
      }
      res.status(200).json({
        message: "You are update post successfully!",
        updatedPost
      });
    },
    /*****************get site User data *********/
    siteUser: async (req, res) => {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res.status("400").json({ message: "user not found", user });
      }
      res.status("200").json({ message: "user fond", data: user });
    },

    deleteBlogPost: async (req, res) => {
      const post = await Blog.findByIdAndRemove({ _id: req.params.id });
      if (!post) {
        return res.status(400).json({
          message: `This Post does not exist!`
        });
      }
      res.status(200).json({
        message: "You are Deleted Post Successfully!"
      });
    },

    contactUs: async (req, res) => {
      // console.log(req.body);
      const user = req.body;
      let msg = {};
      msg.from = user.email;
      // msg.to = 'aqibijaz3@gmail.com';
      msg.to = "support@flipeet.com";
      msg.subject = user.subject;
      msg.text = user.description;
      console.log(msg);
      await Email.send(msg, () => {
        console.log(
          `Your Email Submitted Successfully at ${msg.to} From ${msg.from}`
        );
      });
      res.status(200).json({
        message: "Your Details Submit Successfully!"
      });
    },

    createFAQ: async (req, res) => {
      const faq = await FAQ.create(req.body);
      res
        .status(200)
        .json({
          message: 'Your New FAQ Submit Successfully!',
          faq
        })
    },

    GetAllFAQ: async (req, res) => {
      let pageNo = 1;
      let size = 10;
      var querypage = {}
      let response1;
      if (pageNo < 0 || pageNo === 0) {
        response1 = {
          "error": true,
          "message": "invalid page number, should start with 1"
        };
        return res.json(response1)
      }
      querypage.skip = size * (pageNo - 1)
      querypage.limit = size;

      const faqs = await FAQ.find().skip(querypage.skip).limit(querypage.limit).sort({ $natural: -1 });
      res
        .status(200)
        .json({
          result: faqs.length,
          faqs
        })
    },

    GetFAQ: async (req, res) => {
      const faq = await FAQ.findOne({_id: req.params.id});
      res
        .status(200)
        .json({
          faq
        })
    },

    EditFAQ: async (req, res) => {
      const faq = await FAQ.findOneAndUpdate({_id: req.body._id},  req.body, { new: true});
      res
        .status(200)
        .json({
          message: 'FAQ Update Successfully!',
          faq
        })
    },

    DeleteFAQ: async (req, res) => {
      // console.log(req.user);
      console.log('FAQ');
      const faq = await FAQ.findOneAndDelete(req.params.id);
      res
        .status(200)
        .json({
          message: 'FAQ Deleted Successfully!',
          faq
        })
    },

    GetAllNotification: async (req, res) => {
      let pageNo = 1;
      let size = 10;
      var querypage = {}
      let response1;
      if (pageNo < 0 || pageNo === 0) {
        response1 = {
          "error": true,
          "message": "invalid page number, should start with 1"
        };
        return res.json(response1)
      }
      querypage.skip = size * (pageNo - 1)
      querypage.limit = size;

      const notifications = await Notification.find({ targetId: [req.user._id] }).sort({ $natural: -1 });
      res
        .status(200)
        .json({
          result: notifications.length,
          notifications
        })
    },



  };
};

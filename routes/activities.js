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
  const response = require('../utils/httpResponses');
  let Activity = lib.Activity;
  const authenticated = require('../middlewares/authenticated')
  const restrictTo = require('../middlewares/restrictTo');

  const { uploadBookImage, uploadPostImage } = require('../services/s3upload');

  const {
    uploadProfileImage
  } = require('../services/s3upload');
  //******************Add Seller Reviews************************
  router.post('/reviewSeller', authenticated, async (req, res) => {
    try {

      req.body.userid = req.user._id;
      req.body.type = "Seller Review";
      const newReview = await Activity.reviewSeller(req.body);
      if (newReview) {
        res
          .status(200)
          .send(response.success(200, "Your Review Saved Successfully.", newReview));
      }

    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }



  });


  //******************Add Plateform Comments************************


  router.post('/plateformComments', authenticated, async (req, res) => {
    try {
      req.body.userid = req.user._id;
      const newReview = await Activity.plateformComments(req.body);
      if (newReview) {
        res
          .status(200)
          .send(response.success(200, "Your Review Saved Successfully."));
      }

    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });



  //******************Report Seller to Admin************************


  router.post('/reportSeller', authenticated, async (req, res) => {
    try {
      const report = await Activity.reportSeller(req, res);
      if (report) {
        res
          .status(200)
          .json({ message: "Your Report Submitted Successfully.", data: report });
      }

    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });



  //****************** Add Purchase  Request ************************

  router.post('/purchaseRequest', authenticated, async (req, res) => {
    try {
      await Activity.purchaseRequest(req, res);

    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });



  //******************Get My Purchase Requests sent as Buyer************************

  router.get('/getPurchaseRequestBuyer', authenticated, async (req, res) => {
    try {
      await Activity.purchaseRequestBuyer(req, res);

    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });


    //******************Get My Purchase New Requests sent as Buyer************************

  router.get('/getnewPurchaseRequestBuyer', authenticated, async (req, res) => {
    try {
      await Activity.newPurchaseRequestBuyer(req, res);

    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });

  //******************Get FAQs************************

  router.post('/getFaq', authenticated, async (req, res) => {
    try {
      const faqs = await Activity.getFaq();
      if (faqs) {
        res
          .status(200)
          .send(response.success(200, "Success.", faqs));
      }

    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });



  //******************Contact Customer Support************************

  router.post('/customerSupport', authenticated, async (req, res) => {
    try {
      const faqs = await Activity.customerSupport();
      if (faqs) {
        res
          .status(200)
          .send(response.success(200, "Success.", faqs));
      }

    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });



  //******************Subscribe Newletter************************

  router.post('/subscribeNewsLetter', async (req, res) => {
    try {
      const NewsLetter = await Activity.subscribeNewsLetter(req, res);
      if (NewsLetter) {
        res
          .status(200)
          .send(response.success(200, "You Subscribed to Newsletter Successfully.", NewsLetter));
      }

    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });




  //******************Get My Purchase Requests************************

  router.get('/getMyPurchaseRequests', authenticated, async (req, res) => {
    try {
      const purchaseRequests = await Activity.getMyPurchaseOrders(req);
      if (purchaseRequests) {
        res
          .status(200)
          .send(response.success(200, "Success.", purchaseRequests));
      }

    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });



  //******************Get My Purchase Requests************************

  router.get('/getMyNewPurchaseRequests', authenticated, async (req, res) => {
    try {
      const purchaseRequests = await Activity.getMyNewPurchaseOrders(req);
      if (purchaseRequests) {
        res
          .status(200)
          .send(response.success(200, "Success.", purchaseRequests));
      }

    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });




  //******************Respond to My Purchase Requests************************

  router.post('/respondToPurchaseRequest', authenticated, async (req, res) => {
    try {
      await Activity.respondToPurchaseRequest(req, res);

    } catch (error) {
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });



  //******************Create Order************************

  router.post('/buyTickets', authenticated, async (req, res) => {
    try {
      const tickets = await Activity.buyTickets(req, res);
      if (tickets) {
        res
          .status(200)
          .send(response.success(200, "You purchased the Tickets Successfully"));
      }

    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });


  //******************Create Order************************



  router.post('/getTransactions', authenticated, async (req, res) => {
    try {
      await Activity.getTransations(req, res);

    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });



  //******************Refer to Friend************************


  router.post('/referToFriend', authenticated, async (req, res) => {
    try {
      const result = await Activity.referToFriend(req);
      if (result) {
        res
          .status(200).send(response.success(200, "Successfully Refferd to Friend.", result));
      }

    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });

  //******************GET USER Profile Info************************

  router.post('/userProfile', async (req, res) => {
    try {
      const result = await Activity.userProfile(req, res);


    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });


  //******************Ediy Site Content************************

  router.post('/editSiteInfo', authenticated, restrictTo, async (req, res) => {
    try {
      await Activity.editSiteContent(req, res);


    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });



  router.post('/getUsers', authenticated, async (req, res) => {
    try {
      await Activity.getUser(req, res);


    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });



  router.post('/getPurchaseRequestsAdmin', authenticated, restrictTo, async (req, res) => {
    try {
      await Activity.getPurchaseRequestsAdmin(req, res);


    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });




  router.post('/deletePurchaseRequest', authenticated, restrictTo, async (req, res) => {
    try {
      await Activity.deletePurchaseRequest(req, res);


    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });



  router.post("/addSliderImages", authenticated, restrictTo, uploadBookImage.array('sliderImage', 10), async (req, res) => {
    try {
      await Activity.addSliderImage(req, res);


    } catch (error) {
      console.log(error)
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }

  });

  router.post("/editBreadcrumbImages", authenticated, restrictTo, uploadProfileImage.array('breadcrumbImage', 1), async (req, res) => {
    try {
      let breadcrumbImage = req.files[0].location;
      await Activity.editBreadcrumbImage(breadcrumbImage, res);


    } catch (error) {
      console.log(error)
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }

  });


  router.get("/getSiteContent",  async (req, res) => {
    try {

      await Activity.getSiteContent(req, res);


    } catch (error) {
      console.log(error)
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }

  });

  //******************Add Blog************************
  router.post('/blog_post/add', authenticated, restrictTo, uploadPostImage.array('image', 1), async (req, res) => {
    const post = req.body;
    req.files.length === 0 ? post.image = '' : post.image = req.files[0].location;
    try {
      await Activity.addBlogPost(req, res, post);
    } catch (error) {
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });

  router.get('/blog_post/getAll', async (req, res) => {
    try {
      await Activity.getBlogPosts(req, res);
    } catch (error) {
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });

  router.get('/blog_post/home', async (req, res) => {
    try {
      await Activity.homeBlogPosts(req, res);
    } catch (error) {
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });

  router.get('/blog_post/get/:id', async (req, res) => {
    try {
      await Activity.getBlogPost(req, res);
    } catch (error) {
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });

  router.post('/blog_post/edit/:id', authenticated, restrictTo, uploadPostImage.array('image', 1), async (req, res) => {// console.log(post);
    const post = req.body;
    req.body.image === 'h' ? delete post.image : post;
    req.files.length === 0 ? post : post.image = req.files[0].location;// console.log(post);
    try {
      await Activity.editBlogPost(req, res, post);
    } catch (error) {
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });

  router.delete('/blog_post/delete/:id', authenticated, restrictTo, async (req, res) => {
    try {
      await Activity.deleteBlogPost(req, res);
    } catch (error) {
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });
//*************get site user data by admin **************
router.get('/siteUserData/:id', authenticated, restrictTo, async (req, res) => {
  try {
    await Activity.siteUser(req, res);
  } catch (error) {
    return res.status(400).send(response.error(400, `Error: ${error.message}`));
  }
});
  //****************** Contact Us************************
  router.post('/contactUs', async (req, res) => {
    try {
      await Activity.contactUs(req, res);
    } catch (error) {
      console.log(error)
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });

  //****************** FAQ Section************************

  router.post('/faq/create',  async(req, res) =>{
    try {
      await Activity.createFAQ(req, res);
    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });

  router.get('/faq/getAll', async(req, res) =>{
    try {
      await Activity.GetAllFAQ(req, res);
    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });

  router.get('/faq/get/:id', async(req, res) =>{
    try {
      await Activity.GetFAQ(req, res);
    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });

  router.put('/faq/edit', authenticated, restrictTo, async(req, res) =>{
    try {
      await Activity.EditFAQ(req, res);
    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });

  router.delete('/faq/delete/:id', authenticated, restrictTo, async(req, res) =>{
    try {
      await Activity.DeleteFAQ(req, res);
    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });

  router.get('/notification/getAll', authenticated, async(req, res) =>{
    try {
      await Activity.GetAllNotification(req, res);
    } catch (error) {
      console.log(error);
      return res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
  });

/***********user complaints */
router.post('/getuserComplaints', authenticated, async (req, res) => {
  try {
    await Activity.getuserComplaints(req, res);

  } catch (error) {
    console.log(error);
    return res.status(400).send(response.error(400, `Error: ${error.message}`));
  }
});



  return router;

}




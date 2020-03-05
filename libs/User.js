
/*
##################################################################
-- Name              : user.js
-- Creation Date     : 5-oct-2019
-- Author            : Aqib Ijaz
-- Reviewer          :
##################################################################
*/

"use strict";

module.exports = (modals) => {

    const User = modals.User;
    const Book = modals.Book;
    const BookLikes = modals.BookLike;
    const Review = modals.Reviews;
    const Transactions = modals.Transactions;
    const ReportAdminSchema = modals.ReportAdmin;
    const PurchaseRequest = modals.PurchaseRequest;



    const dbQuery = require('../modules/db_Quries');
    const response = require('../utils/httpResponses');
    const jwt = require("jsonwebtoken");
    const bcrypt = require('bcryptjs');
    const crypto = require('crypto');
    const randomstring = require("randomstring");
    const Email = require('../services/Email');
    return {
        RegisterNewUser: async (req, user, res) => {
            try {
                let existingUser = await dbQuery.GetOne(User, {
                    email: user.email
                });
                if (existingUser) return res.status(409).json({
                    message: 'User already Exist.',
                    description: 'Please Use Another Email to Sign up'
                });
                const newUser = new User(user);

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.conformPassword = hash;

                        newUser.save().then(async user => {
                            user.password = undefined;
                            const resetURL = `${req.protocol}://flipeettest.herokuapp.com/verify/${user._id}`;
                            // await new Email(user, resetURL).sendConfirmation();
                            let msg = {};
                            msg.to = user.email;
                            msg.from = 'support@flipeet.com';
                            msg.subject = "Please Verify Your Account";
                            msg.text = `Verify your account. Click this link ${resetURL} `;
                            await Email.send(msg, () => { console.log(`Your Email Submitted Successfully at ${msg.to} From ${msg.from}`) });
                            res.status(200).json({
                                message: 'Please Verify Account! And Check Email.'
                            });
                        });
                    });
                });
            } catch (error) {
                console.log(error);
                res.status(400).send(response.error(400, `Error: ${error.message}`));
            }
        },

        logInUser: async (req, res) => {
            try {
                const {
                    email,
                    password
                } = req.body;
                User.findOne({
                    email: email
                }).then(user => {
                    if (!user) return res.status(403).json({
                        message: 'User Does not Exit.'
                    });

                    bcrypt.compare(password, user.password).then(isMatch => {
                        if (!isMatch) return res.status(400).json({
                            message: 'Invalid Credentials..!'
                        });
                        if (user.status === 'suspend') return res.status(400).json({
                            message: 'You Are Suspended Your Account.'
                        });
                        jwt.sign({
                            user
                        }, process.env.JWTSECRET, (err, token) => {
                            if (err) throw err;
                            user.password = undefined;
                            user.conformPassword = undefined;
                            res.json({
                                token,
                                message: 'Your are Loggedin  Successfully',
                                user: {
                                    id: user.id,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    email: user.email,
                                    accountType: user.accountType,
                                    tickets: user.tickets,
                                    status: user.status,
                                    role: user.role
                                }
                            });
                        });
                    });
                });
            } catch (error) {
                return response.error(400, `Error: ${error.message}`);
            }
        },

        UpdateProfile: async (req, res, user) => {
            try {
                // 3) Update user document
                console.log(req.user._id)
                const updatedUser = await User.findByIdAndUpdate(req.user._id, user);
                updatedUser.password = undefined;
                updatedUser.conformPassword = undefined;
                res.status(200).json({
                    message: 'Data Update Successfully!',
                    user: {
                        id: updatedUser.id,
                        firstName: updatedUser.firstName,
                        lastName: updatedUser.lastName,
                        email: updatedUser.email,
                        accountType: updatedUser.accountType
                    }
                });


            } catch (error) {
                console.log(error)
                return response.error(400, `Error: ${error.message}`);
            }
        },

        currentUser: async (req, res) => {
            try {
                const user1 = await dbQuery.GetOne(User, {
                    _id: user.id
                });
                res.json(user1);
            } catch (error) {
                throw error;
            }
        },

        VerfiyAccount: async (req, res) => {
            try {
                const user = await User.findOne({
                    _id: req.params._id
                });

                if (!user || user === null) {
                    return res.status(403).json({
                        message: 'User Does not Exit.'
                    });
                }

                user.status = 'active';
                user.save().then((user) => {
                    let msg = {};
                    msg.to = user.email;
                    msg.from = 'support@flipeet.com';
                    msg.subject = "Account Registered Successfully";
                    msg.html = `<h3>Hello ${user.firstName}</h3> <br>Your Account Successfully Created at Flipeet.</br> <p>Welcome to the Flipeet Family, 
                    you are part of a bigger cause. Flipeet is community of students from different institutions and cities across Canada buying,swapping and selling used textbooks. Our goal as a community, is helping students save extra money spent on books during the course of their educational journey, by providing different means of acquiring or selling off their books while welcoming questions and answers about improving the service. Members can comments about how the book was helpful for the course and the best way to use the text, even share class notes!
                    </p> <br><p>Getting to know your community and benefits of your membership
                    Learning the {Rules & Guides} of the community 
                    Checking our {how-to} section on how to get the most out of the community 
                    
                    </p>`;
                    Email.send(msg, () => { console.log(`Your Email Submitted Successfully at ${msg.to} From ${msg.from}`) });
                    user.password = undefined;
                    user.conformPassword = undefined;
                    res.status(200).json({
                        message: 'Your Account is Activated! Now You Can Login',
                        user
                    });
                })

            } catch (error) {
                if (error.name === 'CastError') {
                    return res.status(403).json({
                        message: 'User ID Invalid.'
                    });
                }
                return response.error(400, `Error: ${error.message}`);
            }
        },

        SuspendUser: async (req, res) => {
            try {
                console.log(req.params.id);
                const user = await User.findOne({
                    _id: req.params.id
                });

                if (!user) {
                    return res.status(403).json({
                        message: 'User Does not Exit.'
                    });
                }

                const books = await Book.find({ user: req.params.id });
                // console.log(books);
                const newbooks = books.map((book) => {
                    book.status = 'unpublished',
                        book.save();
                    return book;

                });
                // console.log(newbooks);
                user.status = 'suspend';
                await user.save();
                res.status(200).json({
                    message: 'Your Account Suspended!'
                });
            } catch (error) {
                return response.error(400, `Error: ${error.message}`);
            }
        },

        ForgetPassword: async (req, res) => {
            try {
                const {
                    email
                } = req.body;
                const user = await User.findOne({
                    email: email
                });

                if (!user || user === null) {
                    return res.status(403).json({
                        message: 'User Does not Exit.'
                    });
                }

                if (user.status !== 'active') {
                    return res.status(403).json({
                        message: `Please Active Account. Your Account Status is ${user.status}.`
                    });
                }

                const resetToken = crypto.randomBytes(32).toString('hex');

                // encrypted the Reset Token
                user.passwordResetToken = crypto
                    .createHash('sha256')
                    .update(resetToken)
                    .digest('hex');
                user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
                await user.save();
                try {
                    const resetURL = `${req.protocol}://flipeettest.herokuapp.com/reset-password/${resetToken}`;
                    let msg = {};
                    msg.to = user.email;
                    msg.from = 'support@flipeet.com';
                    msg.subject = "Reset Your Password";
                    msg.text = `${resetURL} `;
                    await Email.send(msg, () => { console.log(`Your Email Submitted Successfully at ${msg.to} From ${msg.from}`) });
                    // Send Response
                    res.status(200).json({
                        message: 'Token sent to email! Please Check Your Email.'
                    });
                } catch (error) {
                    user.passwordResetToken = undefined;
                    user.passwordResetExpires = undefined;
                    await user.save();
                    return response.error(400, `There was an error sending the email. Try agin later.`);
                }
            } catch (error) {
                return response.error(400, `Error: ${error.message}`);
            }
        },

        /***************edit site user info */
        EditSiteUser: async (req, res, user) => {
            try {
                const updatedUser = await User.findByIdAndUpdate(req.params.id, user);
                console.log(updatedUser);
                res.status(200).json({
                    message: 'Data Update Successfully!'
                });


            } catch (error) {
                console.log(error)
                res.status(400).send(response.error(400, `Error: ${error.message}`));
            }
        },


        ActiveAccount: async (req, res) => {
            try {
                const {
                    email
                } = req.body;
                const user = await User.findOne({
                    email: email
                });

                if (!user || user === null) {
                    return res.status(403).json({
                        message: 'User Does not Exit.'
                    });
                }
                const resetURL = `${req.protocol}://flipeettest.herokuapp.com/verify/${user._id}`;

                let msg = {};
                msg.to = user.email;
                msg.from = 'support@flipeet.com';
                msg.subject = "Reset Your Password";
                msg.text = `${resetURL} `;
                await Email.send(msg, () => { console.log(`Your Email Submitted Successfully at ${msg.to} From ${msg.from}`) });

                res.status(200).json({
                    message: 'Please Check Your Email To Active Your Account!'
                });
            } catch (error) {
                return response.error(400, `Error: ${error.message}`);
            }
        },

        Delete: async (req, res) => {
            try {
                console.log(req.params.id);
                const user = await User.findOne({
                    _id: req.params.id
                });

                if (!user) {
                    return res.status(403).json({
                        message: 'User Does not Exit.'
                    });
                }
                console.log('find user');
                await Book.deleteMany({ user: req.params.id })
                await Review.deleteMany({ userid: req.params.id })
                await BookLikes.deleteMany({ userid: req.params.id });
                await Transactions.deleteMany({ userid: req.params.id });
                await ReportAdminSchema.deleteMany({ reporterID: req.params.id });
                await PurchaseRequest.deleteMany({ userid: req.params.id });
                await PurchaseRequest.deleteMany({ sellerid: req.params.id });
                await User.deleteOne({ _id: req.params.id });


                // console.log(books)
                // console.log(reviews);
                // console.log(bookLikes);
                // console.log(transactions);
                // console.log(reportsadmin);






                res.status(200).json({
                    message: 'Account Deleted Successfully!'
                });
            } catch (error) {
                return response.error(400, `Error: ${error.message}`);
            }
        },
        currentUserTickets: async (req, res) => {
            try {
                const user1 = await dbQuery.GetOne(User, {
                    _id: req.user._id
                });
                res.json({ tickets: user1.tickets });
            } catch (error) {
                throw error;
            }
        },
        ResetPassword: async (req, res) => {
            try {
                console.log(req.params.token);
                // 1) Get User based on the token
                const hashedToken = crypto
                    .createHash('sha256')
                    .update(req.params.token)
                    .digest('hex');
                const user = await User.findOne({
                    passwordResetToken: hashedToken,
                    passwordResetExpires: {
                        $gt: Date.now()
                    }
                });

                // 2) If the token has not expired, and there is user, set the new password
                if (!user) {
                    return res.status(400).json({
                        message: 'Token is invalid or has expired'
                    });
                }

                user.password = req.body.password;
                user.conformPassword = req.body.conformPassword;

                user.passwordResetToken = undefined;
                user.passwordResetExpires = undefined;

                bcrypt.genSalt(10, (err, salt) => {
                    console.log(err)
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                        user.conformPassword = hash;
                        user.save().then(async user => {
                            res.status(200).json({
                                message: 'Your Password Reset Successfully!'
                            });
                        });
                    });
                });
            } catch (error) {
                console.log(error);
                return response.error(400, `Error: ${error.message}`);
            }
        }
    };
}
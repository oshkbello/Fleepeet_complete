/*
##################################################################
-- Name              : Book.js
-- Creation Date     : 20-oct-2019
-- Author            : Mehmood
-- Reviewer          : Ahmad Raza
##################################################################
*/

"use strict";

module.exports = mongoose => {
  const Schema = mongoose.Schema;
  const mongoosastic = require("mongoosastic");
  const bookSchema = Schema({
    title: {
      type: String,
      index: true,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    },
    oldPrice: {
      type: Number
    },
    author: {
      type: String,
      index: true,
      required: true
    },
    description: {
      type: String,
      index: true,
      required: true
    },
    quantity: {
      type: Number
    },
    price: {
      type: Number,
      index: true,
      required: true
    },
    weight: {
      type: String
    },
    isbn: {
      type: String,
      index: true,
      required: true
    },
    book_images: {
      type: Array,
      required: true
    },
    category: {
      type: String
    },
    tags: {
      type: Array
    },
    status: {
      type: String,
      enum: ["unpublished", "published"],
      required: true
    },
    bookCondition:{
      type:String
    },
    deliveryType: {
      type: String,
      enum: ["Delivery", "Meetup"]
    },
    rating: {
      type: Number
    },
    likes: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId
        }
      }
    ],
    publishedAt: {
      type: Date,
      default: Date.now()
    }
  });
  return mongoose.model("books", bookSchema);
};

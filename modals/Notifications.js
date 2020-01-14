const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
const Notifications = Schema({
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
      targetId:[String],
      message:{
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now()
      }
    });

module.exports = mongoose.model("Notifications", Notifications);
  
  
  
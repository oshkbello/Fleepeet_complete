module.exports = (mongoose) => {
    const Schema = mongoose.Schema;
    const Review = Schema({
      userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
      review: {
        type: String,
      },
      bookid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "books"
      },
      type:{
        type:String,
        enum:['Book Review','Seller Review']
      },
      sellerid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
      createdAt: {
        type: Date,
        Default: Date.now()
      }
    });
    return mongoose.model("Reviews", Review);
  }
  
  
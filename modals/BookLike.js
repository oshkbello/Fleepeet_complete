module.exports = (mongoose) => {
    const Schema = mongoose.Schema;
    const BookLikes = Schema({
      userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
      bookid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "books"
      },
      createdAt: {
        type: Date,
        Default: Date.now()
      }
    });
    return mongoose.model("Book Likes", BookLikes);
  }
  
  
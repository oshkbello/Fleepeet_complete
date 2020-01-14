module.exports = (mongoose) => {
    const Schema = mongoose.Schema;
    const PurchaseRequest = Schema({
      userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
      sellerid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
      bookid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "books"
      },
      email: {
        type:String,
     
      },
      description: {
        type: String,
        required: true
      },
      status:{
        type:String,
        enum:['Pending','Accepted','Rejected'],
        required:true,
      },
      chargeId:{
        type:String
      },
      createdAt: {
        type: Date,
        Default: Date.now()
      },
      paymentMethod:{
        type:String
      }

    });
    return mongoose.model("PurchaseRequest", PurchaseRequest);
  }
  
  
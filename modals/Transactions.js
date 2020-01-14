module.exports = (mongoose) => {
    const Schema = mongoose.Schema;
    const Transactions = Schema({
      userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
      recepit: {
        type: String,
      },
      description:{
          type:String
      },
      price:{
        type:String
      },
      transactionDate: {
        type: Date,
        Default: Date.now()
      },
      status:{
        type:String
      }
    });
    return mongoose.model("Transactions", Transactions);
  }
  
  
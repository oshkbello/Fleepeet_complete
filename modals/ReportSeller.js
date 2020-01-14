module.exports = (mongoose) => {
    const Schema = mongoose.Schema;
  
    const ReportSeller = new Schema({
      reporterID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
        required: true
      },
      reporteeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
        required: true
      },
      description: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now()
      }
    });
    return mongoose.model("ReportSeller", ReportSeller);
  }
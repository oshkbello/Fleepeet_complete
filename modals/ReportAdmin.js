module.exports = (mongoose) => {
  const Schema = mongoose.Schema;

  const ReportAdminSchema = new Schema({
    reporterID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    email:{
      type:String,
    },
    sellerid: {
      type: mongoose.Schema.Types.ObjectId,
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
  return mongoose.model("ReportsAdmin", ReportAdminSchema);
}

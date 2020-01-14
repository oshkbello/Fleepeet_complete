module.exports = (mongoose) => {
  const Schema = mongoose.Schema;
  const PlateformCommentsSchema = Schema({
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    },
    comment: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      Default: Date.now()
    }
  });
  return mongoose.model("PlateformComments", PlateformCommentsSchema);
}


module.exports = (mongoose)=>{

const Schema = mongoose.Schema;
const newsLetterSchema = new Schema({
  status: {
    type: String
  },
  email: {
    type: String,
    required: true
  }
});
return mongoose.model("NewsLetter", newsLetterSchema);
}


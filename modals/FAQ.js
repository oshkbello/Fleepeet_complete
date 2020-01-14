module.exports = (mongoose) => {
    const Schema = mongoose.Schema;
    const FAQ = Schema({
        question: {
            type: String
        },
        answer: {
            type: String
        },
        createdAt: {
        type: Date,
        default: Date.now()
        }
    });
    return mongoose.model("faq", FAQ);
  }
  
  
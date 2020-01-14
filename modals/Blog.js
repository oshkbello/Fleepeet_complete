module.exports = (mongoose) => {
    const Schema = mongoose.Schema;
    const Blog = Schema({
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        publish: {
            type: Date,
            default: Date.now()
        }
    });
    return mongoose.model("Blog", Blog);
}
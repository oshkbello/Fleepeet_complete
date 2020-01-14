module.exports = (mongoose) => {
    const Schema = mongoose.Schema;
    const LocationSchema = new Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        lat: {
            type: String,
            required: true,
        },
        lng: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: new Date(),
        }

    });
    return mongoose.model('Location', LocationSchema);
}


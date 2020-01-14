module.exports = (mongoose) => {

    const Schema = mongoose.Schema;
    const SiteContent = new Schema({
        id: {
            type: Number,
            default: 1
        },
        breadcrumbImage: {
            type: String
        },
        promotionalImage: {
            type: String
        },
        sliderImage: {
            type: Array
        },
        contactUsEmail: {
            type: String
        },
        ticketPrice: {
            type: Number,
        },
        promoCode: {
            type: Array,
        }


    });
    return mongoose.model("Site Content", SiteContent);
}
module.exports = (joi) => {

    const currentLocation = {
        lat: joi.string().required(),
        lng: joi.string().required()
    }

    const reviewSeller = {
        review:joi.string(),
        name:joi.string(),
        sellerid:joi.string(),

    }

    const reportSeller = {
        email:joi.string(),
        description:joi.string(),
        sellerid:joi.string()
    }

    const purchaseRequest= {
        email:joi.string(),
        description:joi.string(),
        sellerid:joi.string(),
        bookid:joi.string(),
        quantity:joi.string(),
    }
    return {
        currentLocation,
        reviewSeller,
        reportSeller,
        purchaseRequest
    }

}
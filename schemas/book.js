module.exports = (joi) => {
    const createBook = {
        title: joi.string().required(),
        author: joi.string().required(),
        description: joi.string().required(),
        quantity: joi.number(),
        price: joi.number().required(),
        isbn: joi.string().required(),
        book_images: joi.array(),
        category: joi.string(),
        tags: joi.string(),
        status: joi.string(),
        deliveryType: joi.string(),
        oldPrice:joi.number(),
        rating:joi.string(),

    }

    const commentBook = {
        review:joi.string(),
        bookid:joi.string(),
        name:joi.string(),
        type:joi.string(),
        sellerid:joi.string(),
        
    }


    
    


    return {
        createBook,
        commentBook
    }
}
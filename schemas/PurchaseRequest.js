module.exports = (joi) => {

  
    const purchaseRequest= {
        description:joi.string(),
        sellerid:joi.string(),
        bookid:joi.string(),
    }
    return {
       
        purchaseRequest
    }

}
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'client/public/images/books')
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname.split('.').slice(0, -1).join('.')
      cb(null, fileName+'-'+Date.now() + '.jpg') 
    }
  })
  

  var upload = multer({ storage: storage });

module.exports =  upload;


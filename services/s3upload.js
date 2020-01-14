
const aws =  require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path=  require("path");


//Upload Book Images to S3 Bucket
const s3 = new aws.S3({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region:process.env.AWS_REGION
});
const uploadBookImage = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'flipeet-bucket',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, 'books/' + path.basename(file.originalname, path.extname(file.originalname)).toLowerCase().replace(/\s+/g, '-') + '-' + Date.now().toString() + path.extname(file.originalname).toLowerCase())
        }

    }),
    limits: {fileSize: 2000000}, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});






const uploadProfileImage = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'flipeet-bucket',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, 'profileImages/' + path.basename(file.originalname, path.extname(file.originalname)).toLowerCase().replace(/\s+/g, '-') + '-' + Date.now().toString() + path.extname(file.originalname).toLowerCase())
        }

    }),
    limits: {fileSize: 2000000}, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

const uploadPostImage = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'flipeet-bucket',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, 'postImages/' + path.basename(file.originalname, path.extname(file.originalname)).toLowerCase().replace(/\s+/g, '-') + '-' + Date.now().toString() + path.extname(file.originalname).toLowerCase())
        }

    }),
    limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

const deleteObjectS3 = (files) => {
    files.forEach((file) => {
        s3.deleteObject({
            Bucket: 'flipeet-bucket',
            Key: file.key
        }, function (err, data) {})
    });

};
const deleteSingleObjectS3 = (link) => {

        s3.deleteObject({
            Bucket: 'flipeet-bucket',
            Key: link
        }, function (err, data) {})

};



module.exports = {
    uploadBookImage,
    uploadProfileImage,
    uploadPostImage
}
const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
        files: 10 
    },
    fileFilter: function(req, file, cb) {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

module.exports = upload;
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
require('dotenv').config({path: "backend/config/config.env"});

const storage = new GridFsStorage({
    url: process.env.MONGO_URIS,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    file: (req, file) => {
        const match = [
            "image/png",
            "image/jpeg",
        ];

        if (match.indexOf(file.minetype) === -1){
            const filename = `${Date.now()}-any-name-${file.originalname}`;
            return filename;
        }

        return{
            bucketName: "upload",
            filename: `${file.originalname}-any-name-${Date.now()}`
        }
    }
})

module.exports = multer({storage});
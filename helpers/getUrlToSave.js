const uuid = require('uuid');
const multer = require('multer');

//reenombra el archivo

const getUrlToSave = (path) => {
    return multer.diskStorage({
        destination: path,
        filename: (req, file, cb, filename) => {
            const ext = file.originalname.split('.').pop();
            cb(null, `${uuid.v4()}.${ext}`);
        }

    })
}
module.exports = getUrlToSave;
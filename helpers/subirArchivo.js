const File = require('../src/models/File');

// subir varios archivos
const subirArchivos = async (files, categoria_id) => {
    if (files) {
        files.forEach(element => {
            const file = new File();
            file.fieldname = element.fieldname;
            file.originalname = element.originalname;
            file.encoding = element.encoding;
            file.mimetype = element.mimetype;
            file.destination = element.destination;
            file.path = element.path;
            file.filename = element.filename;
            file.size = element.size;
            file.created_at = element.created_at;
            file.state = true;
            file.category_id = categoria_id;
            file.save();
            return true;

        });
        return false;
    }


}


module.exports = { subirArchivos }
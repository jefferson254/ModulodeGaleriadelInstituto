//3si esta bien da next
const Categoria = require('../src/models/Categoria');

// traes la categoria padre
const getParentCategories = async (req, res, next) => {

    const categorias = await Categoria.find({ parent_id: '' }).lean();//obten la categoria donde el padre sea un string vacios 
    if (categorias.length > 0) req.body.categoriasPadres = categorias;
    else req.body.categoriasPadres = null;

    next();
}


module.exports = { getParentCategories }
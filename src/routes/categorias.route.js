const uuid = require('uuid');
const { Router } = require('express');
const router = Router();
const Image = require('../models/Image');
const Categoria = require('../models/Categoria');
const { getParentCategories } = require('../../middlewares/getcategory');
const getUrlToSave = require('../../helpers/getUrlToSave');
const path = require('path');
const multer = require('multer');
const File = require('../models/Files');

//
const url = path.join(__dirname, "../public/img/uploads");
const storage = getUrlToSave(url);
const upload = multer({ storage: storage });
// =========================
// CATEGORIAS PADRE
// =========================
router.get('/categoria', async (req, res) => {

    const categorias = await Categoria.find({ parent_id: "" }).lean();
    res.render('categoria', { categorias });

})

router.get('/categoria/add', async (req, res) => { //formulario de categoria

    const categoria = await Categoria.find({ parent_id: "" }).lean();

    res.render('categoria_form', { categoria });

})

//middlewares funcion ejecuta antes de algo --getparentcategory // desestructura un objeto
router.post('/categoria/add', upload.single('image'), async (req, res) => {
    const { title, description } = req.body;
    const { filename, originalname, mimetype, size } = req.file;

    const categoria = new Categoria();

    categoria.title = title;
    categoria.description = description;
    categoria.filename = filename;
    categoria.path = '/img/uploads/' + filename;
    categoria.originalname = originalname;
    categoria.mimetype = mimetype;
    categoria.size = size;
    categoria.parent_id = "";

    await categoria.save();
    res.redirect('/galeria/categoria');

})
/////metodo de editar y elimniar de categorias
router.get('/update/:id', async (req, res) => {
    const categoria = await Categoria.findById(req.params.id).lean();
    res.render('update', { categoria })
});

router.post('/update/:id', async (req, res) => {
    await Categoria.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/galeria/categoria')
});
router.get('/deletecategoria/:id', async (req, res) => {
    const { id } = req.params;
    await Categoria.findByIdAndDelete(id);

    res.redirect('/galeria/categoria');
});
// =========================
// SUBCATEGORIAS
// =========================
router.get('/subcategorias/todos', async (req, res) => {
    const categorias = await Categoria.find({ parent_id: { $ne: "" } }).lean();

    res.render('subcategorias', { categorias });
})

//ruta de mi pagina de mi formulario
router.get('/administracion/subcategorias', getParentCategories, async (req, res) => { //correcto next
    const categoria = await Categoria.find({ parent_id: { $ne: "" } }).lean(); //ne --distinto a un string vacio
    const { categoriasPadres } = req.body;
    res.render('image_form', { categoria, categoriasPadres });
})
router.post('/administracion/subcategorias', upload.array('image'), async (req, res) => {
    const { title, description, parent_id } = req.body;
    const categoria = new Categoria();
    const ucode = uuid.v4(); //crea un string unico
    let firstFile; //el primer archivo serA PORTADA

    categoria.code = ucode;
    categoria.title = title;
    categoria.description = description;
    categoria.parent_id = parent_id;

    req.files.forEach((element, i) => {
        if (i == 0) {
            firstFile = element;
        } else {
            categoria.files.push('/img/uploads/' + element.filename);
        }
    })
    categoria.filename = firstFile.filename;
    categoria.path.push('/img/uploads/' + firstFile.filename);
    categoria.originalname = firstFile.originalname;
    categoria.mimetype = firstFile.mimetype;
    categoria.size = firstFile.size;
    let date = new Date();
    const formatDate = (date) => {
        let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
        return formatted_date;
    }

    categoria.created_at = formatDate(date);

    await categoria.save();

    res.redirect('/galeria/administracion/subcategorias');

})
router.get('/subcategorias/:id', async (req, res) => {
    const { id } = req.params;
    const categorias = await Categoria.find({ parent_id: id }).lean();

    res.render('subcategorias', { categorias });


})
// =========================
// Buscar una subcategoria
// =========================
router.post('/subcategorias/buscar/', getParentCategories, async (req, res) => {
    const { name } = req.body;

    const categoria = await Categoria.find({ title: { $regex: '.*' + name + '.*' } }).lean();
    const { categoriasPadres } = req.body;
    res.render('image_form', { categoria, categoriasPadres });


})
// metodo de editar la imagen de subcategoria
router.get('/edit/:id',getParentCategories, async (req, res) => {
    const categoria = await Categoria.findById(req.params.id).lean();
    const { categoriasPadres } = req.body;
    res.render('edit', { categoria, categoriasPadres})
});

router.post('/edit/:id', upload.array('image'), async (req, res) => {
    
    await Categoria.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/galeria/administracion/subcategorias')
});
router.post('/edit/image/:id', upload.array('image'), async (req, res) => {
    const categorias = await Categoria.find({_id:id}).lean();

    await Categoria.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/galeria/administracion/subcategorias')
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params; 
    await Categoria.findByIdAndDelete(id); 
  
    res.redirect('/galeria/administracion/subcategorias');
});


//eliminar una imagen dentro de la subcategoria 
router.get('/delete/image/:id', async (req, res) => {
    const { _id } = req.params;
    await Categoria.findByIdAndDelete(_id); 

    res.redirect('/galeria/administracion/subcategorias');
});




module.exports = router;
const express = require('express');
const { getParentCategories } = require('../../middlewares/getcategory');
const router = express.Router();
const homeController = require('../controllers/home.controller');
const newsController = require('../controllers/news.controller');
const teacherController = require('../controllers/teacher.controller');
const careerController = require('../controllers/career.controller');
const pageController = require('../controllers/page.controller');
const publicationController = require('../controllers/publication.controller');
const { application } = require('express');

router.get('/', homeController.getMenus);
//Carreras - Oferta académica
router.get('/careers/:code', careerController.getCareers);
//Noticias
router.get('/news/:_id', newsController.getNews);
//Planta de docentes de cada carrera
router.get('/careers/:code/teachers', careerController.getTeachers);
//Toda la planta docente
router.get('/teachers', teacherController.getAllTeachers);
//Teachers yec
router.get('/teachers-yec', careerController.getTeachersYec);
//Planta de autoridades
router.get('/authorities', teacherController.getAuthorities);
//Publications
router.get('/publications', publicationController.getPublications);

//Plantillas
router.get('/page/politica-calidad', pageController.getTemplateOne);
router.get('/page/transparencia', pageController.getTemplateTwo);
router.get('/page/template', pageController.getTemplateThree);


//Segunda Pestaña - Nosotros
router.get('/historia', (req, res) => {
    res.render('historia');
})
router.get('/transparencia', (req, res) => {
    res.render('transparencia');
})
router.get('/mision-vision', (req, res) => {
    res.render('mision-vision');
})

router.get('/autoridades', (req, res) => {
    res.render('autoridades');
})
router.get('/teachers/:careers', (req, res) => {
    res.render('docentes');
})

router.get('/reglamentos', (req, res) => {
    res.render('reglamentos');
})


// Tercera Pestaña - Carreras
router.get('/centro-idioma', (req, res) => {
    res.render('ingles');
})

//Cuarta Pestaña - Plataformas
router.get('/libros-y-publicaciones', (req, res) => {
    res.render('biblioteca-virtual');
})


//Quinta Pestaña - Servicios

// router.get('/bienestar-estudiantil',(req, res)=>{
//     res.render('bienestar-estudiantil');
// })

// router.get('/seguimiento-graduados',(req, res)=>{
//     res.render('seguimiento-graduados');
// })

// router.get('/consejo-estudiantil',(req, res)=>{
//     res.render('consejo-estudiantil');
// })



//Sexta Pestaña - Educacion continua
// router.get('/certificaciones',(req, res)=>{
//     res.render('certificaciones');
// })

router.get('/galeria', (req, res) => {
    res.render('galeria');
})

router.get('/actividades-institucionales', (req, res) => {
    res.render('actividades-institucionales');
})

router.get('/cursos-capacitacion', (req, res) => {
    res.render('cursos-capacitacion');
})

//Séptima Pestaña - Contáctanos
router.get('/contactanos', (req, res) => {
    res.render('contactanos');
})
//Pestaña de Administrador
router.get('/estudiantes', (req, res) => {
    res.render('estudiantes');
})

// Paginas de footer
router.get('/requisitos-matriculas', (req, res) => {
    res.render('requisitos-matriculas');
})

router.get('/admisiones', (req, res) => {
    res.render('admisiones');
})


router.get('/proceso-homologacion', (req, res) => {
    res.render('proceso-homologacion');
})

//Páginas de errores
router.get('/not-found', (req, res) => {
    res.render('error-404');
})
router.get('/error-internal', (req, res) => {
    res.render('error-500');
})
/////////////////NUEVAS RUTAS //////////////////////////////



//este modulo para saber donde esta mis archivos poder eliminar  soporta a las promesas
// const { unlink } = require('fs-extra');
// const {format} = require("timeagojs")  




module.exports = router;
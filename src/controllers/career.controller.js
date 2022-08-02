const Career = require('../models/career');
const Menu = require('../models/menu');
const Teacher = require('../models/teacher');

const careerCTRL = {};

careerCTRL.getCareers = async (req, res) => {
    try {
        const career = await Career.find({ code: req.params.code }).lean();

        const menus = await Menu.find({}).lean();
        const menusCareers = menus.filter(menu => menu.type == 'menu-careers');
        res.render('./templates/careers', { career, menusCareers });
    } catch (e) {
        res.status(500).json({
            code: 'ui-500',
            messageError: res.err,
            data: {}
        });
    }
}

careerCTRL.getTeachers = async (req, res) => {
    try {
        const career = await Career.find({ code: req.params.code }).lean();

        const teachers = (await Teacher.find({ careers: { $all: [req.params.code] } }).lean())
            .filter(teacher => {
                const type = teacher.types.find(type => (type == 'teacher' && type != 'career_coordinator'));
                return type ? true : false;
            });

        const careerCoordinator = (await Teacher.find({ careers: { $all: [req.params.code] } }).lean())
            .filter(teacher => {
                const type = teacher.types.find(type => type == 'career_coordinator');
                return type ? true : false;
            });

        res.render('./templates/career-teachers', { career, teachers, careerCoordinator });
    } catch (e) {
        res.status(500).json({
            code: 'ui-500',
            messageError: res.err,
            data: {}
        });
    }
}

careerCTRL.getTeachersYec = async (req, res) => {
    try {
        const teachers = (await Teacher.find({}).lean()).filter(teacher => {
            const careerYec = teacher.careers.find(career => career === 'YEC');
            return !!careerYec;
        });
        res.render('./templates/teachers-yec', { teachers });
    } catch (e) {
        res.status(500).json({
            code: 'ui-500',
            messageError: res.err,
            data: {}
        });
    }
}

careerCTRL.test = async (req, res) => {
    const careers = await Career.find();
    res.status(200).json({
        code: careers
    });
}

module.exports = careerCTRL;

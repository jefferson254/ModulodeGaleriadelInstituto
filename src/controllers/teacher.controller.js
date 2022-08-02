const Teacher = require('../models/teacher');


const teacherCTRL = {};


teacherCTRL.getAllTeachers = async (req, res) => {
    try {
        const teachers = (await Teacher.find({}).lean()).filter(teacher => {
            const type = teacher.types.find(type => type == 'teacher');
            return type ? true : false;
        });
        const total = teachers.length;
        res.render('./templates/teachers', { teachers, total });
    } catch (e) {
        res.render('error-500');
    }
}

teacherCTRL.getAuthorities = async (req, res) => {
    try {
        const careerCoordinators = (await Teacher.find().lean()).filter(teacher => {
            const type = teacher.types.find(type => type == 'career_coordinator');
            return type ? true : false;
        });

        const administrativeCoordinators = (await Teacher.find().lean()).filter(teacher => {
            const type = teacher.types.find(type => type == 'administrative_coordinator');
            return type ? true : false;
        });

        const rector = (await Teacher.find().lean()).find(teacher => {
            const type = teacher.types.find(type => type == 'rector');
            return type ? true : false;
        });

        const vicechancellor = (await Teacher.find().lean()).find(teacher => {
            const type = teacher.types.find(type => type == 'vicechancellor');
            return type ? true : false;
        });
        res.render('./templates/authorities', { rector, vicechancellor, careerCoordinators, administrativeCoordinators });
    } catch (e) {
        res.status(500).json({
            code: 'ui-500',
            messageError: res.err,
            data: {}
        });
    }
}


module.exports = teacherCTRL;

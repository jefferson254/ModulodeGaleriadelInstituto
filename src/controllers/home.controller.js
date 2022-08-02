const Menu = require('../models/menu');
const Company = require('../models/company');
const News = require('../models/news');

const homeCTRL = {};

homeCTRL.getMenus = async (req, res) => {
    try {

        const menus = await Menu.find({}).sort({sort: 1}).lean();
        const menusRight = menus.filter(menu => menu.type == 'menu-right');
        const menusDown = menus.filter(menu => menu.type == 'menu-down' && menu.name != 'Nuestros graduados');
        const menusCareers = menus.filter(menu => menu.type == 'menu-careers');

        const news = await News.find({deletedAt: null}).sort({sort: 1}).lean();

        const companies = await Company.find({}).lean();
        const companyFormation = companies.filter(enterprise => enterprise.type == 'empresa-formadora');
        const affiliation = companies.filter(enterprise => enterprise.type == 'vinculacion');

        res.render('home', {menusRight, menusDown, menusCareers, news, companyFormation, affiliation});
    } catch (e) {
        res.status(500).json({
            code: 'ui-500',
            messageError: res.err,
            data: {}
        });
    }
}


module.exports = homeCTRL;

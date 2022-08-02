const Page = require('../models/page');

const pageCTRL = {};

pageCTRL.getTemplateOne = async (req, res) => {
    try {
       
        const pages = await Page.find({}).lean(); 
        const templateOne = pages.filter(page=>page.name_template == 'template-one');  
           res.render('./templates/template-one',{templateOne});    
                    
    } catch (e) {
        res.status(500).json({
            code: 'ui-500',
            messageError: res.err,
            data: {}
        });
    }
}

pageCTRL.getTemplateTwo = async (req, res) => {
    try {
       
        const pages = await Page.find({}).lean(); 
        const templateTwo = pages.filter(page=>page.name_template == 'template-two');    
        res.render('./templates/template-two',{templateTwo});
    } catch (e) {
        res.status(500).json({
            code: 'ui-500',
            messageError: res.err,
            data: {}
        });
    }
}

pageCTRL.getTemplateThree = async (req, res) => {
    try {
       
        const pages = await Page.find({}).lean(); 
        const templateThree = pages.filter(page=>page.name_template == 'template-three');      
        res.render('./templates/template-three',{templateThree});
    } catch (e) {
        res.status(500).json({
            code: 'ui-500',
            messageError: res.err,
            data: {}
        });
    }
}


module.exports = pageCTRL;

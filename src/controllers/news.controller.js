const News = require('../models/news');

const newsCTRL = {};

newsCTRL.getNews = async (req, res) => {
    try {
        const news = await News.find({_id: req.params._id}).lean();
        res.render('./templates/news',{news});
    } catch (e) {
        res.status(500).json({
            code: 'ui-500',
            messageError: res.err,
            data: {}
        });
    }
}

module.exports = newsCTRL;

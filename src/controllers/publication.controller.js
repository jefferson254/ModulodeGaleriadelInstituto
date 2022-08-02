const Publication = require('../models/publication');
const publicationCTRL = {};

publicationCTRL.getPublications = async (req, res) => {
    try {
        const publications = await Publication.find({}).sort({year: -1}).lean();
        console.log(publications);

        res.render('./publications', {publications});
    } catch (e) {
        res.status(500).json({
            code: 'ui-500',
            messageError: res.err,
            data: {}
        });
    }
}

module.exports = publicationCTRL;

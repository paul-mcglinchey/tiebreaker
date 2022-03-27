const isGroupSet = (req, res, next) => {
    if (!req.body.groupId) return res.status(500).send({ message: 'Group must be set.' });
    next();
}

const createClient = {
    isGroupSet
};

module.exports = createClient;
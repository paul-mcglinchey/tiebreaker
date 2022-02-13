const isGroupNameSet = (req, res, next) => {
    if (!req.body.groupName) return res.status(500).send({ message: 'Group must be set.' });
    next();
}

const createClient = {
    isGroupNameSet
};

module.exports = createClient;
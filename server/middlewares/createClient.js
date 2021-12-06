const isUserGroupSetSet = (req, res, next) => {
    if (!req.body.userGroup) return res.status(500).send({ message: 'Group must be set.' });
    next();
}

const createClient = {
    isUserGroupSetSet
};

module.exports = createClient;
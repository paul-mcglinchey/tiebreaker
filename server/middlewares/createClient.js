const isGroupNameSet = (req, res, next) => {
    if (!req.body.groupname) return res.status(500).send({message: 'Group must be set.'});
    next();
}

const createClient = {
    isGroupNameSet
};

module.exports = createClient;
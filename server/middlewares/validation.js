validateRequest = (req, res, next) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }
    next();
}

const validation = {
    validateRequest
}

module.exports = validation
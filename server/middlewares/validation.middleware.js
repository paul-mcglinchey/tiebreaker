// validates that requests have an _id attached to either the body or the params
const checkRequestHasId = (req, res, next) => {
    const { _id } = req.body || req.params;
    if (!_id) return res.status(400).send({ message: 'An ID must be provided.' });

    next();
}

// validates all requests that should have a body, do have a body
const checkRequestHasBody = (req, res, next) => {
    if (!req.body) return res.status(400).send({ message: "Content cannot be empty!" });

    next();
}

const validation = {
    checkRequestHasId,
    checkRequestHasBody
}

module.exports = validation
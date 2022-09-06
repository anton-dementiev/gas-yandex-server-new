
//Authorization

const auth = (req, res, next) => {
    // if (!req.headers.authorization) {
    //     res.status(403).json({error: 'No credentials were provided'})
    // }

    next();
}

module.exports =  auth;
const jwt = require('jsonwebtoken');


module.exports = function(req,res,next){
    try {
        let token = req.header('x-token');

        let decode = jwt.verify(token,'secretkey');

        req.user = decode.user;
        next();
        
    } catch (error) {
        return res.status(400).send("server Error")
    }
}
var jwt = require('jsonwebtoken');

const SECRET_KEY='sayuvaraj';
const fetchuser = async (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const auth_token = req.header('token');
    // confirmation of token 
    console.log(auth_token);
    // const token = auth_token && auth_token.split(' ')[0];
    if (!auth_token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const data =  jwt.verify(auth_token, SECRET_KEY);
        // if (!data) {
        // res.status(401).send({ error: "Please authenticate using a valid token" })
        // }
        console.log(data);
        req.user = data.user;

        next();
    } catch (error) {
        res.status(401).send({ error: "error valadating" })
    }

}


module.exports = fetchuser;



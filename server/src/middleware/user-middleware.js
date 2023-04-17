import jwt from "jsonwebtoken";


export const verifyUser = (req, res, next) => {
    const token = res.headers.authorization;
    console.log(token);
    if (token) {
        jwt.verify(token, "secret", (err) => {
            if (err) return res.sendStatus(403);
            next();
        });        
    } else {
        res.sendStatus(401);
    }

}
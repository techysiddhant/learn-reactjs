import jwt from "jsonwebtoken";

export default async function Auth(req, res, next) {
    try {
        //access authorize header to validte request
        const token = req.headers.authorization.split(" ")[1];

        //retrive the use details of the logged in user
        const decodedToken = await jwt.verify(token, "secrett");

        req.user = decodedToken;
        // res.json(decodedToken);
        next();
    } catch (error) {
        res.status(401).json({ error: "Authentication Failed.!" });
    }
}

export function localVariables(req, res, next) {
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next();
}
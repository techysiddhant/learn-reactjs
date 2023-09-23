import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
//craete a  middleware to verify a user
export async function verifyUser(req, res, next) {
    try {
        const { username } = req.method == "GET" ? req.query : req.body;
        //check the user existance
        let exist = await UserModel.findOne({ username });
        if (!exist) return res.status(404).send({ error: "Can't find User!" });
        next();
    } catch (error) {
        return res.status(404).send({ error: "Authentication Error" });
    }
}
//POST REQ
export async function register(req, res) {
    try {
        const { username, password, profile, email } = req.body;

        //check the existing user
        const existUsername = new Promise((resolve, reject) => {
            UserModel.findOne({ username }, function(err, user) {
                if (err) reject(new Error(err))
                if (user) reject({ error: "Please use unique username" });

                resolve();
            })
        });
        //check the existing email
        const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({ email }, function(err, email) {
                if (err) reject(new Error(err))
                if (email) reject({ error: "Please use unique Email" });

                resolve();
            })
        });

        Promise.all([existUsername, existEmail])
            .then(() => {
                if (password) {
                    bcrypt.hash(password, 10)
                        .then(hashedpassword => {
                            const user = new UserModel({
                                username,
                                password: hashedpassword,
                                profile: profile || '',
                                email
                            });
                            //return save result as a response
                            user.save()
                                .then(result => res.status(201).send({ msg: "User register Successfully" }))
                                .catch(error => res.status(500).send({ error }));
                        }).catch(error => {
                            return res.status(500).send({ error: "Enable to hashed password" })
                        })
                }
            }).catch(error => {
                return res.status(500).send({ error })
            });
    } catch (error) {
        return res.status(500).send(error);
    }
    // res.json('register route');
}
//POST
export async function login(req, res) {
    const { username, password } = req.body;
    try {
        UserModel.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {

                        if (!passwordCheck) return res.status(400).send({ error: "Don't have password" });

                        //create jwt token
                        const token = jwt.sign({
                            userId: user._id,
                            username: user.username
                        }, "secrett", { expiresIn: "24h" });
                        return res.status(200).send({
                            msg: "Login Successful...!",
                            username: user.username,
                            token
                        });
                    })
                    .catch(error => {
                        return res.status(400).send({ error: "Password does not match!" });
                    })
            })
            .catch(error => {
                return res.status(404).send({ error: "Username not Found!" });
            })
    } catch (error) {
        return res.status(500).send({ error });
    }
    // res.json('login route');
}

// GET
export async function getUser(req, res) {
    const { username } = req.params;
    try {
        if (!username) return res.status(501).send({ error: "Invalid Username" });
        UserModel.findOne({ username }, function(err, user) {
            if (err) return res.status(500).send({ err });
            if (!user) return res.status(501).send({ error: "Couldn't Find the User" });
            const { password, ...rest } = Object.assign({}, user.toJSON());

            return res.status(201).send(rest);
        })
    } catch (error) {
        return res.status(404).send({ error: "Cannot Find user Data" });
    }
    // res.json('getUser route');
}

// PUT
export async function updateUser(req, res) {
    try {
        // const id = req.query.id;
        const { userId } = req.user;
        if (userId) {
            const body = req.body;
            UserModel.updateOne({ _id: userId }, body, function(err, data) {
                if (err) throw err;

                return res.status(201).send({ msg: "Record Updated..!" });
            });
        } else {
            return res.status(401).send({ error: "User Not Found...!" })
        }
    } catch (error) {
        return res.status(401).send({ error });
    }
    // res.json('updateUser route');
}

//GET
export async function generateOTP(req, res) {
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    res.status(201).send({ code: req.app.locals.OTP });
    // res.json('generateOTP route');
}
//GET
export async function verifyOTP(req, res) {
    const { code } = req.query;
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true; //start session for reset password
        return res.status(201).send({ msg: "Verify Sucessfully!" });
    }
    return res.status(400).send({ error: "Invalid OTP!" });
    // res.json('verifyOTP route');
}
//GET
export async function createResetSession(req, res) {
    if (req.app.locals.resetSession) {
        req.app.locals.resetSession = false; //allow access to this route only once
        return res.status(201).send({ msg: "access granted!" });
    }
    return res.status(400).send({ error: "Session expired!" });
    // res.json('createResetSession route');
}
//PUT
export async function resetPassword(req, res) {
    try {
        if (!req.app.locals.resetSession) {
            return res.status(404).send({ error: "Session expired!" });
        }
        const { username, password } = req.body;
        try {
            UserModel.findOne({ username })
                .then(user => {
                    bcrypt.hash(password, 10)
                        .then(hashedpassword => {
                            UserModel.updateOne({ username: user.username }, { password: hashedpassword }, function(err, data) {
                                if (err) throw err;
                                req.app.locals.resetSession = false;
                                return res.status(201).send({ msg: "record updated..!" });
                            })
                        })
                        .catch(e => {
                            return res.status(500).send({ error: "enable to hased Password" })
                        })
                })
                .catch(error => {
                    return res.status(404).send({ error: "Username not Found!" });
                })
        } catch (error) {
            return res.status(500).send({ error });
        }
    } catch (error) {
        return res.status(400).send({ error });
    }
    // res.json('resetPassword route');
}
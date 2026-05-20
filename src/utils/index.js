import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createHash = password =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
    bcrypt.compareSync(password, user.password);

export const generateToken = user => {
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "24h"
    });
};
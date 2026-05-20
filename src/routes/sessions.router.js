import { Router } from "express";
import passport from "passport";
import userModel from "../models/user.model.js";
import { createHash, isValidPassword, generateToken } from "../utils/index.js";

const router = Router();

router.post("/register", async (req, res) => {

    const { first_name, last_name, email, age, password } = req.body;

    const exists = await userModel.findOne({ email });

    if (exists) {
        return res.status(400).send({
            status: "error",
            message: "Usuario ya existe"
        });
    }

    const user = {
        first_name,
        last_name,
        email,
        age,
        password: createHash(password)
    };

    const result = await userModel.create(user);

    res.send({
        status: "success",
        payload: result
    });

});

router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).send({
            status: "error",
            message: "Usuario no encontrado"
        });
    }

    if (!isValidPassword(user, password)) {
        return res.status(401).send({
            status: "error",
            message: "Contraseña incorrecta"
        });
    }

    const tokenUser = {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        role: user.role
    };

    const token = generateToken(tokenUser);

    res.cookie("coderCookieToken", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true
    });

    res.send({
        status: "success",
        message: "Login exitoso"
    });

});

router.get(
    "/current",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {

        res.send({
            status: "success",
            payload: req.user
        });

    }
);

export default router;
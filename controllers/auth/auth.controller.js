const Auth = require("../../model/auth.model");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const JWT = require("jsonwebtoken");

const signUp = async (req, res) => {
    const { username, password, email } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const oldUser = await Auth.findOne({ email });
        if (oldUser) {
            return res.status(422).json({ message: "already user exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new Auth({
            username,
            email,
            password: hashedPassword,
        });
        const result = await user.save();

        const token = JWT.sign({ email: result.email }, process.env.SECRET_TOKEN_SIGN);
        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const login = async (req, res) => {
    const { password, email } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const oldUser = await Auth.findOne({ email });
        if (!oldUser) {
            return res.status(404).json({ message: "user not found...." });
        }

        const hashedPassword = await bcrypt.compare(password, oldUser.password);
        if (!hashedPassword) {
            return res.status(401).json("Wrong credentials!");
        }

        const accessToken = JWT.sign({ email: oldUser.email }, process.env.SECRET_TOKEN_SIGN);
        res.status(200).json({ oldUser, accessToken });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    signUp,
    login,
};

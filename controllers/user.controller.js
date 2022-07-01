const User = require("../model/user.model");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

// CRUD
// C => CREATE
const postUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        const result = await user.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

// R = READ
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

// U => UPDATE
const updateUser = async (req, res) => {
    // const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true, runValidators: true }
        );
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

// D = DELETE
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json("user has been deleted....");
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    postUser,
    getUsers,
    updateUser,
    deleteUser,
};

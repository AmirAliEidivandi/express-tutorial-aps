const router = require("express").Router();
const { signUp, login } = require("../controllers/auth/auth.controller");
const { check } = require("express-validator");

// register
router.post("/register", [check("email", "email is not valid").isEmail(), check("password", "password is not valid").isLength({ min: 6 })], signUp); // http://localhost:8000/api/v1/auth/register
router.post("/login", [check("email", "email is not valid").isEmail(), check("password", "password is not valid").isLength({ min: 6 })], login); // http://localhost:8000/api/v1/auth/login

module.exports = router;

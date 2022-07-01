const router = require("express").Router();
const { postUser, getUsers, updateUser, deleteUser } = require("../controllers/user.controller");
const { check } = require("express-validator");

router.post("/new", [check("email", "email is not valid").isEmail(), check("password", "password is not valid").isLength({ min: 6 })], postUser); // http://localhost:8000/api/v1/user/new
router.get("/", getUsers); // http://localhost:8000/api/v1/user
router.put("/:id", updateUser); // http://localhost:8000/api/v1/user/62bf134fcaae2a2431bdd5ed
router.delete("/:id", deleteUser); // http://localhost:8000/api/v1/user/62bf134fcaae2a2431bdd5ed

module.exports = router;

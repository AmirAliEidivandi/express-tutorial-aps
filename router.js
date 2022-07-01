const {Router} = require("express"),
      firstController = require("./controller/firstCtrl");
const router = Router()
router.get("/login",firstController.login);
router.get("/",firstController.index);
module.exports = router; 
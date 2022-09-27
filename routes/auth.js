const router = require("express").Router();
const User = require("../controllers/usersControllers");
router.post("/api/v1/create-user", User.createUser);
router.post("/api/v1/login-user", User.loginUser);

module.exports = router;

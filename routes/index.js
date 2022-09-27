const router = require("express").Router();
router.use(require("../routes/auth"));
router.use(require("../routes/task"));

module.exports = router;

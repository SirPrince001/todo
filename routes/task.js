const router = require("express").Router();
const Task = require("../controllers/taskControllers");
router.post("/api/v1/add-task", Task.createTask);
router.post("/api/v1/edit-task/:id", Task.editTask);
router.delete("/api/v1/delete-task/:id", Task.deleteTask);
router.get("/api/v1/get-single-task/:id", Task.getTaskById);
router.get("api/v1/get-all-task", Task.getAllTask);

module.exports = router;

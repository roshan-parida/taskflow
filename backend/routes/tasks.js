const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const taskController = require("../controllers/taskController");
const auth = require("../middleware/auth");

router.use(auth);

// GET /api/tasks?search=&status=&priority=&completed=&page=&limit=
router.get(
	"/",
	[
		query("search").optional().isString(),
		query("status").optional().isIn(["todo", "in-progress", "done"]),
		query("priority").optional().isIn(["low", "medium", "high"]),
		query("completed").optional().isBoolean(),
	],
	taskController.listTasks
);

// POST /api/tasks
router.post(
	"/",
	[
		body("title").isLength({ min: 1 }).withMessage("Title is required"),
		body("description").optional().isString(),
		body("priority").optional().isIn(["low", "medium", "high"]),
		body("status").optional().isIn(["todo", "in-progress", "done"]),
	],
	taskController.createTask
);

// GET /api/tasks/:id
router.get("/:id", taskController.getTask);

// PUT /api/tasks/:id
router.put(
	"/:id",
	[
		body("title").optional().isLength({ min: 1 }),
		body("priority").optional().isIn(["low", "medium", "high"]),
		body("status").optional().isIn(["todo", "in-progress", "done"]),
	],
	taskController.updateTask
);

// DELETE /api/tasks/:id
router.delete("/:id", taskController.deleteTask);

module.exports = router;

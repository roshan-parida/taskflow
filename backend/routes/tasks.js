const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const taskController = require("../controllers/taskController");
const auth = require("../middleware/auth");
const { validate } = require("../middleware/validation");

router.use(auth);

// GET /api/tasks?search=&status=&priority=&completed=&tags=&sortBy=&sortOrder=
router.get(
	"/",
	[
		query("search").optional().isString(),
		query("status").optional().isIn(["todo", "in-progress", "done"]),
		query("priority").optional().isIn(["low", "medium", "high"]),
		query("completed").optional().isBoolean(),
		query("tags").optional().isString(),
		query("sortBy")
			.optional()
			.isIn(["title", "dueDate", "priority", "status", "createdAt"]),
		query("sortOrder").optional().isIn(["asc", "desc"]),
	],
	validate,
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
		body("tags").optional().isArray(),
	],
	validate,
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
		body("tags").optional().isArray(),
	],
	validate,
	taskController.updateTask
);

// DELETE /api/tasks/:id
router.delete("/:id", taskController.deleteTask);

module.exports = router;

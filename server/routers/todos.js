const { Router } = require("express");
const { todoController } = require("../controllers");

const router = Router();

/**
 * @swagger
 * /todos/statuses:
 *   get:
 *     tags: [
 *       todos
 *     ]
 *     summary: Returns an array of todos statuses.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1, "name": "Some Items"}]'
 *       204:
 *         description: No content
 */
router.route("/statuses").get(todoController.getTodoStatuses);

module.exports = router;

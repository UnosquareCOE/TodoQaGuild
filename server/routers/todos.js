const { Router } = require("express");
const router = Router();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/**
 * @swagger
 * /projects/{projectId}/todos:
 *   get:
 *     tags: [
 *       todos
 *     ]
 *     summary: Returns an array of todos for an associated project.
 *     parameters:
 *       - name: projectId
 *         in: path
 *         type: integer
 *         description: The ID of the requested project.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "id": 1, "name": "Some Items", "key": "SI" }'
 *       204:
 *         description: No content
 */
router.route("/").get(async (req, res) => {
  const todoStatuses = await prisma.todo_statuses.findMany({});

  res.status(200).json(todoStatuses);
});

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
router
  .route("/statuses")
  .get((req, res) => res.send("Hello GET TODO STATUSES"));

router
  .route("/:todoId(\\d+)")
  .get((req, res) => res.send("Hello GET SINGLE TODO"));

router.route("/").post((req, res) => res.send("Hello POST TODO"));

router.route("/:todoId(\\d+)").put((req, res) => res.send("Hello PUT TODO"));

router
  .route("/:todoId(\\d+)")
  .delete((req, res) => res.send("Hello DELETE TODO"));

module.exports = router;

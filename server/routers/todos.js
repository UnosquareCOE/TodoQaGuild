const { Router } = require("express");
const router = Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
router.route("/statuses").get(async (req, res) => {
  const todoStatuses = await prisma.todo_statuses.findMany({});

  res.status(200).json(todoStatuses);
});

module.exports = router;

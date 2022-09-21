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
 *                 value: '[{ "id": 1, "name": "Some Items"}]'
 *       204:
 *         description: No content
 */
router.route("/").get(async (req, res) => {
  const { projectId } = req.params;

  const todos = await prisma.todos.findMany({
    where: {
      project_id: projectId,
    },
    select: {
      id: true,
      summary: true,
    },
  });

  res.status(200).json(todos);
});

/**
 * @swagger
 * /projects/{projectId}/todos/{todoId}:
 *   get:
 *     tags: [
 *       todos
 *     ]
 *     summary: Returns a single todo item for an associated project.
 *     parameters:
 *       - name: projectId
 *         in: path
 *         type: integer
 *         description: The ID of the requested project.
 *       - name: todoId
 *         in: path
 *         type: integer
 *         description: The ID of the requested todo.
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
router.route("/:todoId(\\d+)").get(async (req, res) => {
  const { todoId } = req.params;

  const todo = await prisma.todos.findUnique({
    where: {
      id: parseInt(todoId),
    },
  });

  res.status(200).json(todo);
});

/**
 * @swagger
 * /projects/{projectId}/todos/:
 *   post:
 *     tags: [
 *       todos
 *     ]
 *     summary: Creates a new todo
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: The project name
 *               description:
 *                 type: string
 *                 required: true
 *                 description: The project description
 *               key:
 *                 type: string
 *                 required: true
 *                 description: The Key Identifier for the project
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Todo Created
 */
router.route("/").post((req, res) => res.send("Hello POST TODO"));

/**
 * @swagger
 * /projects/{projectId}/todos/{todoId}:
 *   put:
 *     tags: [
 *       todos
 *     ]
 *     summary: Updates an existing todo
 *     parameters:
 *       - name: projectId
 *         in: path
 *         type: integer
 *         description: The ID of the requested project.
 *       - name: todoId
 *         in: path
 *         type: integer
 *         description: The ID of the requested todo.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: The project name
 *               description:
 *                 type: string
 *                 required: true
 *                 description: The project description
 *               key:
 *                 type: string
 *                 required: true
 *                 description: The Key Identifier for the project
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Project Updated
 */
router.route("/:todoId(\\d+)").put((req, res) => res.send("Hello PUT TODO"));

/**
 * @swagger
 * /projects/{projectId}/todos/{todoId}:
 *   delete:
 *     tags: [
 *       projects
 *     ]
 *     summary: Deletes an existing project
 *     parameters:
 *       - name: projectId
 *         in: path
 *         type: integer
 *         description: The ID of the requested project.
 *       - name: todoId
 *         in: path
 *         type: integer
 *         description: The ID of the requested todo.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: todo Deleted
 */
router
  .route("/:todoId(\\d+)")
  .delete((req, res) => res.send("Hello DELETE TODO"));

module.exports = router;

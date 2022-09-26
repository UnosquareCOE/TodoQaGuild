const { Router } = require("express");
const { projectTodoController } = require("../controllers");

const router = Router({ mergeParams: true });

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
router.route("/").get(projectTodoController.getAllProjectTodos);

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
router.route("/:todoId(\\d+)").get(projectTodoController.getProjectTodo);

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
router.route("/").post(projectTodoController.createProjectTodo);

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
router.route("/:todoId(\\d+)").put(projectTodoController.updateProjectTodo);

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
router.route("/:todoId(\\d+)").delete(projectTodoController.deleteProjectTodo);

module.exports = router;

const { Router } = require("express");
const { validationUtils } = require("../utils");
const { check } = require("express-validator");
const router = Router();

/**
 * @swagger
 * /projects:
 *   get:
 *     tags: [
 *       projects
 *     ]
 *     summary: Returns an array of projects items with the name and key
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1, "name": "Some Items", "key": "SI" }, { "id": 2, "summary": "More Items", "key": "MI" }]'
 *       204:
 *         description: No content
 */
router.route("/").get((req, res) => res.send("Hello GET1"));

/**
 * @swagger
 * /projects/{projectId}:
 *   get:
 *     tags: [
 *       projects
 *     ]
 *     summary: Returns an array of projects items with the name and key
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
router
  .route("/:projectId(\\d+)")
  .get((req, res) => res.send("Hello GET SINGLE"));

/**
 * @swagger
 * /projects:
 *   post:
 *     tags: [
 *       projects
 *     ]
 *     summary: Creates a new project
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
 *         description: Project Created
 */
router
  .route("/")
  .post(
    [
      check("name")
        .isLength({ min: 3 })
        .withMessage("the name must have minimum length of 3")
        .trim(),
      check("description")
        .isLength({ min: 8, max: 255 })
        .withMessage(
          "your password should have a min length of 8 characters and max length of 255"
        ),
      check("key")
        .isLength({ min: 3, max: 3 })
        .withMessage("your key should be 3 characters only"),
    ],
    validationUtils.validator,
    (req, res) => res.send("Hello POST1")
  );

/**
 * @swagger
 * /projects/{projectId}:
 *   put:
 *     tags: [
 *       projects
 *     ]
 *     summary: Updates an existing project
 *     parameters:
 *       - name: projectId
 *         in: path
 *         type: integer
 *         description: The ID of the requested project.
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
router.route("/:projectId(\\d+)").put((req, res) => res.send("Hello PUT"));

/**
 * @swagger
 * /projects/{projectId}:
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
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Project Deleted
 */
router
  .route("/:projectId(\\d+)")
  .delete((req, res) => res.send("Hello DELETE"));

module.exports = router;

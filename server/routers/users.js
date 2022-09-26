const { Router } = require("express");
const { validationUtils } = require("../utils");
const { body } = require("express-validator");
const { userController } = require("../controllers");

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Returns an array of user items
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1, "name": "Some Items", "email": "SI" }, { "id": 2, "name": "More Items", "email": "test@test.com" }]'
 *       204:
 *         description: No content
 */
router.route("/").get(userController.getAllUsers);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Returns an single user
 *     parameters:
 *       - name: userId
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
 *                 value: '{ "id": 1, "name": "Some Items", "email": "SI" }'
 *       204:
 *         description: No content
 */
router.route("/:userId(\\d+)").get(userController.getUser);

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [
 *       users
 *     ]
 *     summary: Creates a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: The name for the user
 *               email:
 *                 type: string
 *                 required: true
 *                 description: The email for the user
 *               password:
 *                 type: string
 *                 required: true
 *                 description: The password for the user
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: User Created
 */
router.route("/").post(
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("the name must have minimum length of 3")
      .trim(),
    body("email").isEmail().withMessage("a valid email must be supplied"),
    body("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("your password should have min and max length between 8-15")
      .matches(/\d/)
      .withMessage("your password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("your password should have at least one special character"),
  ],
  validationUtils.validate,
  userController.createUser
);

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     tags: [
 *       users
 *     ]
 *     summary: Updates an existing user
 *     parameters:
 *       - name: userId
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
 *                 description: The name for the user
 *               email:
 *                 type: string
 *                 required: true
 *                 description: The email for the user
 *               password:
 *                 type: string
 *                 required: true
 *                 description: The password for the user
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       204:
 *         description: User Updated
 */
router.route("/:userId(\\d+)").put(
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("the name must have minimum length of 3")
      .trim(),
    body("email").isEmail().withMessage("a valid email must be supplied"),
    body("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("your password should have min and max length between 8-15")
      .matches(/\d/)
      .withMessage("your password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("your password should have at least one special character"),
  ],
  validationUtils.validate,
  userController.updateUser
);

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     tags: [
 *       users
 *     ]
 *     summary: Deletes an existing user
 *     parameters:
 *       - name: userId
 *         in: path
 *         type: integer
 *         description: The ID of the requested project.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: User Deleted
 */
router.route("/:userId(\\d+)").delete(userController.deleteUser);

module.exports = router;

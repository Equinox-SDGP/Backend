const express = require("express");
const router = express.Router();

import * as userController from "../controllers/userController";

/** POST Methods */
/**
 * @swagger
 * '/user/register':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - firstname
 *              - lastname
 *              - email
 *              - password
 *            properties:
 *              firstname:
 *                type: string
 *                default: John
 *              lastname:
 *                type: string
 *                default: Doe
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post("/register", userController.createUser);

/**
 * @swagger
 * '/user/login':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Login a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post("/login", userController.verifyUser);

/** GET Methods */
/**
 * @swagger
 * '/user/{id}':
 *  get:
 *     tags:
 *     - User Controller
 *     summary: Get a user
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/:id", userController.getUser);

/** PUT Methods */
/**
 * @swagger
 * '/user/{id}':
 *  put:
 *     tags:
 *     - User Controller
 *     summary: Update a user
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - firstname
 *              - lastname
 *              - email
 *              - password
 *            properties:
 *              firstname:
 *                type: string
 *                default: John
 *              lastname:
 *                type: string
 *                default: Doe
 *              email:
 *                type: string
 *                default:
 */
router.put("/:id", userController.updateUser);

/** DELETE Methods */
/**
 * @swagger
 * '/user/{id}':
 *  delete:
 *     tags:
 *     - User Controller
 *     summary: Delete a user
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/:id", userController.deleteUser);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
 
>>>>>>> 85b67c5 (Added Swagger UI documentation)

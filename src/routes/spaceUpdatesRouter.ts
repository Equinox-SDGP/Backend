const express = require("express");
const router = express.Router();

import * as spaceUpdatesController from "../controllers/spaceUpdatesController";

/** POST Method */
/**
 * @swagger
 * '/spaceUpdates/historical/{id}':
 *  post:
 *     tags:
 *     - Space Updates Controller
 *     summary: getting real time data
 *     parameters:
 *      - in: path
 *        name: id
 *        default: 1BY6WEcLGh8j5v7
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
 *             - startTime
 *             - endTime
 *             - timeInterval
*            properties:
*             startTime:
*              type: long
*              default: 1589500800
*             endTime:
*              type: long
*              default: 1589599800
*             timeInterval:
*              type: string
*              default: day
 *     responses:
 *      201:
 *        description: information received
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post("/historical/:id", spaceUpdatesController.spaceUpdates);

module.exports = router;

const express = require("express");
const router = express.Router();

import * as deviceUpdatesController from "../controllers/deviceUpdatesController";

/** GET Method */
/**
 * @swagger
 * '/deviceUpdates/realTime/{id}':
 *  get:
 *     tags:
 *     - Device Updates Controller
 *     summary: getting real time data
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
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
router.get("/realTime/:id", deviceUpdatesController.getRealTimeData);

/** POST Methods */
/**
 * @swagger
 * '/deviceUpdates/historical/{id}':
 *  post:
 *     tags:
 *     - Device Updates Controller
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
router.post("/historical/:id", deviceUpdatesController.getHistoricalData);

module.exports = router;
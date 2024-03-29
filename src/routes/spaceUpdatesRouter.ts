const express = require("express");
const router = express.Router();

import * as spaceUpdatesController from "../controllers/spaceUpdatesController";

/** GET Routes */
/**
 * @swagger
 * /spaceUpdates/historical/graph/{spaceId}:
 *   get:
 *     tags:
 *       - Space Updates Controller
 *     summary: Get historical data in graph form
 *     parameters:
 *       - in: path
 *         name: spaceId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the space
 *         example: NE=51002841
 *       - in: query
 *         name: collectTime
 *         schema:
 *           type: integer
 *           format: long
 *         description: The collect time for the historical data in milliseconds
 *         example: 1710872168000
 *       - in: query
 *         name: timeInterval
 *         schema:
 *           type: string
 *           enum:
 *             - day
 *             - week
 *             - month
 *             - year
 *         description: The time interval for the historical data
 *         example: day
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/historical/graph/:spaceId",
  spaceUpdatesController.getSpaceUpdatesGraph
);

/** PUT Routes */
/**
 * @swagger
 * /spaceUpdates/refresh:
 *   post:
 *     tags:
 *       - Space Updates Controller
 *     summary: Saving space updates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - stationCode
 *               - collectTime
 *               - timeInterval
 *             properties:
 *               stationCode:
 *                 type: string
 *                 default: NE=51002841
 *               collectTime:
 *                 type: number
 *                 default: 1711019706612
 *               timeInterval:
 *                 type: string
 *                 default: day
 *                 enum:
 *                   - day
 *                   - week
 *                   - month
 *                   - year
 *
 *     responses:
 *       201:
 *         description: Information received
 *       409:
 *         description: Conflict
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.post("/refresh", spaceUpdatesController.saveSpaceUpdates);

/** PUT Routes */

/**
 * @swagger
 * /spaceUpdates/update:
 *   put:
 *     tags:
 *       - Space Updates Controller
 *     summary: Updating space updates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - stationCode
 *               - collectTime
 *               - timeInterval
 *               - dataItemMap
 *             properties:
 *               stationCode:
 *                 type: string
 *                 default: NE=51002841
 *               collectTime:
 *                 type: number
 *                 default: 1711019706612
 *               timeInterval:
 *                 type: string
 *                 default: day
 *                 enum:
 *                   - day
 *                   - week
 *                   - month
 *                   - year
 *               dataItemMap:
 *                 type: object
 *                 properties: {}
 *     responses:
 *       '200':
 *         description: Space updates updated successfully
 *       '400':
 *         description: Invalid request body
 */
router.put("/update", spaceUpdatesController.updateSpaceUpdates);

/** DELETE Routes */
/**
 * @swagger
 * /spaceUpdates/deleteupdate:
 *   delete:
 *     tags:
 *       - Space Updates Controller
 *     summary: Delete space updates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - stationCode
 *               - collectTime
 *               - timeInterval
 *             properties:
 *               stationCode:
 *                 type: string
 *                 default: NE=51002841
 *               collectTime:
 *                 type: number
 *                 default: 1711019706612
 *               timeInterval:
 *                 type: string
 *                 default: day
 *                 enum:
 *                   - day
 *                   - week
 *                   - month
 *                   - year
 *     responses:
 *       '200':
 *         description: Space updates deleted successfully
 *       '400':
 *         description: Invalid request body
 *       '404':
 *         description: Space updates not found
 *       '500':
 *         description: Server Error
 */
router.delete("/deleteupdate", spaceUpdatesController.deleteSpaceUpdates);

module.exports = router;

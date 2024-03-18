const express = require("express");
const router = express.Router();

import * as spaceController from "../controllers/spaceController";
import * as spaceDataController from "../controllers/spaceDataController";

/** GET Method */
/**
 * @swagger
 * '/space':
 *  get:
 *     tags:
 *     - Space Controller
 *     summary: getting list of spaces
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
router.get("/", spaceController.getSpacesList);

router.get("/:id", spaceController.getSpace);

/**
 * @swagger
 * '/space/data':
 *   get:
 *     tags:
 *       - Space Controller
 *     summary: Getting hourly space data
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
router.get("/data", spaceDataController.getHourlySpaceData);

/** PUT Method */
/**
 * @swagger
 * '/space/update':
 *   put:
 *     tags:
 *       - Space Controller
 *     summary: Updating list of spaces with fusion
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
router.put("/update", spaceController.updateSpaceListWithFusion);

module.exports = router;

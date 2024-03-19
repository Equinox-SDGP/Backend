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
router.get("/", spaceController.getSpaceDataList);
/**
 * @swagger
 * '/space/{id}':
 *   get:
 *     tags:
 *       - Space Controller
 *     summary: Getting space by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The space id
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
router.get("/:id", spaceController.getSpace);

/** POST Method */
/**
 * @swagger
 * '/space/data':
 *   post:
 *     tags:
 *       - Space Data Controller
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
router.post("/data", spaceDataController.getSpaceDataList);

/**
 * @swagger
 * '/space/info':
 *   post:
 *     tags:
 *       - Space Data Controller
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
router.post("/info",spaceDataController.getSpaceInformation)

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
/**
 * @swagger
 * '/space/updateData':
 *   put:
 *     tags:
 *       - Space Data Controller
 *     summary: Updating list of space data with fusion
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
router.put("/updateData", spaceDataController.updateSpaceDataList);

module.exports = router;

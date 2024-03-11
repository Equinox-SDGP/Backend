const express = require("express");
const router = express.Router();

import * as deviceController from "../controllers/deviceController";

/** POST Methods */
/**
 * @swagger
 * '/device/add':
 *  post:
 *     tags:
 *     - Device Controller
 *     summary: Add a new device
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - deviceId
 *              - deviceName
 *              - deviceType
 *              - longitude
 *              - latitude
 *            properties:
 *              deviceId:
 *                type: Long
 *                default: 3289472389472
 *              deviceName:
 *                type: string
 *                default: My Device
 *              deviceDescription:
 *                type: string
 *                default: My Device Description
 *              deviceType:
 *                type: Integer
 *                default: 1
 *              longitude:
 *               type: Double
 *               default: 123.456
 *              latitude:
 *               type: Double
 *               default: 123.456
 *              inverterBrand:
 *               type: string
 *               default: Huawei
 *              inverterType:
 *               type: string
 *               default: SUN2000
 *              softwareVersion:
 *               type: string
 *               default: 1.0.0
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
router.post("/add", deviceController.addDevice);

/** GET Methods */
/**
 * @swagger
 * '/device/getDeviceList':
 *  get:
 *     tags:
 *     - Device Controller
 *     summary: Get a list of devices
 *     responses:
 *      200:
 *        description: OK
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/getDeviceList", deviceController.getDevices);

/**
 * @swagger
 * '/device/getDevice/{id}':
 *  get:
 *     tags:
 *     - Device Controller
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
router.get("/getDevice/:id", deviceController.getDeviceById);

module.exports = router;

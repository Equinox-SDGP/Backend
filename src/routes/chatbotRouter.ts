const express = require("express");
const router = express.Router();

import chatbotController from "../controllers/chatController";

/** POST Method */
/**
 * @swagger
 *   /chatbot/user-message:
 *     post:
 *       tags:
 *         - Chatbot Controller
 *       summary: Get bot response
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               required:
 *                 - message
 *       responses:
 *         '201':
 *           description: Information received
 *         '409':
 *           description: Conflict
 *         '404':
 *           description: Not Found
 *         '500':
 *           description: Server Error
 */

router.post("/user-message", chatbotController.getBotResponse);

module.exports = router;
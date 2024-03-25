// Install dependencies:
// npm install express dialogflow dotenv

const express = require('express');
const { SessionsClient } = require('dialogflow');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Dialogflow client
const sessionClient = new SessionsClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  },
});

// Create a session path
const sessionPath = sessionClient.projectAgentSessionPath(
  process.env.GOOGLE_PROJECT_ID,
  'unique-session-id'
);

// Handle user requests
app.get('/chat', async (req, res) => {
  const userQuery = req.query.q;

  // Send user input to Dialogflow
  const [response] = await sessionClient.detectIntent({
    session: sessionPath,
    queryInput: {
      text: {
        text: userQuery,
        languageCode: 'en-US',
      },
    },
  });

  // Extract the response from Dialogflow
  const chatResponse = response.queryResult.fulfillmentText;

  res.json({ response: chatResponse });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
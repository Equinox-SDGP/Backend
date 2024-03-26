//https://dialogflow.cloud.google.com/cx/projects/equinox-chatbot/locations/global/agents/bd193570-0d96-4d6f-aeca-3a554a7471ad
const projectId = "equinox-chatbot";
const location = "global";
const agentId = "bd193570-0d96-4d6f-aeca-3a554a7471ad";
const query = "Hello!";
const languageCode = "en";

// Imports the Google Cloud Some API library
const { SessionsClient } = require("@google-cloud/dialogflow-cx");

const client = new SessionsClient();
const sessionId = Math.random().toString(36).substring(7);

export const getBotResponse = async (userMessage: string) => {
  const sessionPath = client.projectLocationAgentSessionPath(
    projectId,
    location,
    agentId,
    sessionId
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
      },
      languageCode,
    },
  };

  const [response] = await client.detectIntent(request);

  // Loging intent and current page
  if (response.queryResult.match.intent) {
    console.log(
      `Matched Intent: ${response.queryResult.match.intent.displayName}`
    );
  }
  console.log(`Current Page: ${response.queryResult.currentPage.displayName}`);

  for (const message of response.queryResult.responseMessages) {
    if (message.text) {
      console.log(`Agent Response: ${message.text.text}`)
      return message.text.text;
    }
  }
};

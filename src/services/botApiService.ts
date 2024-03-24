const dialogflow = require("@google-cloud/dialogflow").v2beta1;
import { v4 as uuid } from "uuid";
import path from "path";

// projects/equinox-chatbot/locations/global/agents/bd193570-0d96-4d6f-aeca-3a554a7471ad
const projectId = "equinox-chatbot"; // Replace with your Dialogflow project ID
const sessionId = uuid(); // Generate a unique session ID
const agentId = "bd193570-0d96-4d6f-aeca-3a554a7471ad";

export const getBotResponse = async (userMessage: string) => {
  const sessionClient = new dialogflow.SessionsClient();
  try {
    const sessionPath = sessionClient.projectAgentSessionPath(
      projectId,
      `${agentId}/${sessionId}`
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: userMessage,
          languageCode: "en-US",
        },
      },
    };

    const responses = await sessionClient.detectIntent(request);
    return responses[0];
  } catch (error) {
    console.error("Error creating session path:", error);
    throw error; // Rethrow the error to handle it at a higher level
  }
};

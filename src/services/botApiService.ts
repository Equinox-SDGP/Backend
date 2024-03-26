const { SessionsClient } = require("@google-cloud/dialogflow");

export const getBotResponse = async (userMessage: string) => {
  const sessionClient = new SessionsClient({
    type: "service_account",
    project_id: "equinox-chatbot",
    private_key_id: "419bda5a16c3dab2d6673bed6e0889730aa7f9f4",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCcqM739AqirauH\nOhqpw5co9X1KQ5Fel58Ta4VAEHB02sKOV9n11xltgAh5/uYbBqvdmG/mMbJnM+i2\nftC6H/o3/D1EdTGCDJ8UFlLVUKJGuisLHZd9ISq/xANSQRc0ZN4oPlf+BfpSsBRJ\ny3yxwq9sGNLE13GkVDN09rl/kGG1YVCmgXLdyhfc48uLy2ZHjQ/S60APCmx+zVOS\n8EGCjV9TTYCpNBejalg7KAkIouZ14v+gl8DE+eNCKfOvybqg12ZjO/rivro+w1Yd\neOkn985sZQRjNOcwo3LSK9wSjgruE01maTbMBe9lYO5z3N3B9jflFG8en32zcneh\n3cbBP0b1AgMBAAECggEACoRWqKoMe2asqOkLWIbrQ0eqapg7TnNgAt4UAFIE4ANo\n+O9dkDXUMi1cjvwVbI5ibqpI0NZYmLm7ugysweIFr/PSFSIc+b2+gYsMx99K6vPy\nkc4hw7e8oUptF/zgrEFynJcFhzsq1pmViG1jE01I7jktuniQMNeqQK7o6G8ZRXjb\nr8WP0LIBKo6CdlReaXTG/apq2LObNnRQiJ/HelniytVSmLoM2l4B8VF2xAKVZgi7\nuxuSYI4/pFPbIuOOjJIZIkgKiOuBp8EUArpfEL3gzj39IUMgKjFH/5Fbg2NqVC7r\n//ub9FBMHA9ddwgCCYdqzXIUBo1fjGeDNTX0gs+YYQKBgQDZz2BSI6SaxhIjOBYC\nu2LZvZozup2bpUjaoVjhTQOrLvk/XT4RCuhFINTFB9o7uya9Ilskx2HrGJzr8UvN\nwC9BKdV1m2O1KRxgDD8kX7w5Zm3WR+FOaWG9G7dZ8k/J5lkuDHrSmOaGvUPxDVJu\nSN447oQKKwKWsWz3WTnxBZDSKQKBgQC4IJ+hHBqOw7WIeD1shLS+/TQocjqWMcZS\nDzqLH6OCuCd8HsBiFDhaoi+SvYAQxYL1wTX8l3qruvLeMdDByv5HOMAPfiAy649t\nyXqtgEdwjY0pnJ7xR82KI9gKc6DRjKEShF8o84KwTUuzxZvjJ6A/sY/mxGaR6e3I\noBWa66Pf7QKBgQDP0CWlmS5XIb5ybfPKPYGOIHH9AwOXWncNaj5EEFf8vz++bjdm\nyVJdinqXVuuoa+MFN79gcv+A8KXgFARwVfqAIOryYAUc9xGEroqcKN+MoKcReNmG\nF9PSO5yPrDrmduoFnpCdWJcyXWhymHRalxm3lhLTJMA+iSBfS3mV9ep8KQKBgETo\nuLUj/nB1oCfN0Dcfx0E/I9kLPw/c2vr1BhTxJ1GRt/1EyP0r0hdhYWqKjzY3pRZy\nU9EPo/JHSgOMIzOT0+w1ufNSYZyM+iW9ZLMwMgxWfYEYQ4fLNoo/degbdBFYjyON\n9MsvrzZqBy3lg7zUpK2Rt2hHEpgDM2GFP/C1xaPVAoGAXGlVD+8X5AmVln9yHtp6\n8mfrfnlTyWq1sedq25Cn1Qa5egvD0jR1P7o8JDb1xqt4I4PTsnHhyDyjLHwXAP2o\nRRP0E336j1dXKqI/aXZ6AHXGnLeacBK6soYRFplfXXgiPCBkKe31NZHJaooMMMrM\n6AnRweO//Z/uHEQTA5RmHCI=\n-----END PRIVATE KEY-----\n",
    client_email: "chat-bot-2@equinox-chatbot.iam.gserviceaccount.com",
    client_id: "115508208742339043643",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/chat-bot-2%40equinox-chatbot.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  });

  const sessionPath = sessionClient.projectAgentSessionPath(
    process.env.GOOGLE_PROJECT_ID,
    "123456789"
  );

  const [response] = await sessionClient.detectIntent({
    session: sessionPath,
    queryInput: {
      text: {
        text: userMessage,
        languageCode: "en-US",
      },
    },
  });

  return response.queryResult.fulfillmentText;
};

const supertest = require("supertest");
const app = require("../app");

describe("POST /spaceUpdates/refresh", async () => {
  describe("given a valid request", async () => {
    // Should save the space updates
    // should respond with a json object containing the space data and a message
    // should respond with a status code of 201
    // should specify json in the content type header

    test("should respond with a 201 status code", async () => {
      const response = await supertest(app).post("/spaceUpdates/refresh").send({
        stationCode: "NE=51002841",
        startTime: 1710846070000,
        endTime: 1710932470000,
        timeInterval: "hour",
      });
      expect(response.status).toBe(201);
    });
  });

  describe("given an invalid request", async () => {
    // should respond with a status code of 400
    // should respond with a json object containing an error message
  });
});

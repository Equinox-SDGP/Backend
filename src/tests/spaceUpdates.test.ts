const supertest = require("supertest");
import app from "../app";

describe("POST /spaceUpdates/refresh", () => {
  describe("given a valid request", () => {
    test("should respond with a 201 status code", async () => {
      const response = await supertest(app).post("/spaceUpdates/refresh").send({
        stationCode: "NE=51002841",
        collectTime: 1711019706612,
        timeInterval: "day",
      });
      expect(response.status).toBe(201);
    });

    test("should respond with an error message if the time interval is invalid", async () => {
      const response = await supertest(app).post("/spaceUpdates/refresh").send({
        stationCode: "NE=51002841",
        collectTime: 1711019706612,
        timeInterval: "invalid",
      });
      expect(response.body).toEqual({ error: "Invalid time interval" });
    });

    test("should save the space updates", async () => {
      // Add your test logic to verify the space updates are saved
    });

    test("should respond with a json object containing the space data and a message", async () => {
      // Add your test logic to verify the response body
    });

    test("should specify json in the content type header", async () => {
      // Add your test logic to verify the content type header
    });
  });
});

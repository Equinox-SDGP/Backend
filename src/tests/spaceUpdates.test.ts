const supertest = require("supertest");
import app from "../app";

describe("POST /spaceUpdates/refresh", () => {
  describe("given a valid request", () => {
    test("should respond with a 201 status code", async () => {
      const response = await supertest(app)
        .post("/spaceUpdates/refresh")
        .send({
          stationCode: "NE=51002841",
          collectTime: 1711019706612,
          timeInterval: "day",
        });
      expect(response.status).toBe(201);
    });

    test("should save the space updates", async () => {
      // Add your test logic to verify that space updates are correctly saved
    });

    test("should respond with a json object containing the space data and a message", async () => {
      // Add your test logic to verify the response body
    });

    test("should specify json in the content type header", async () => {
      // Add your test logic to verify the content type header
    });
  });

  describe("given an invalid request", () => {
    test("should respond with a status code of 400", async () => {
      // Add your test logic to send an invalid request and verify the response status
    });

    test("should respond with a json object containing an error message", async () => {
      // Add your test logic to verify the response body for an invalid request
    });
  });
});


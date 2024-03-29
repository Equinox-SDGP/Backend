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
      // test logic to verify the space updates are saved
      const response = await supertest(app).post("/spaceUpdates/refresh").send({
        stationCode: "NE=51002841",
        collectTime: 1711019706612,
        timeInterval: "day",
      });
      expect(response.status).toBe(201);
    });

    test("should respond with a json object containing the space data and a message", async () => {
      // test logic to verify the response body
      const response = await supertest(app).post("/spaceUpdates/refresh").send({
        stationCode: "NE=51002841",
        collectTime: 1711019706612,
        timeInterval: "day",
      });

      expect(response.status).toBe(201);

      expect(response.body).toHaveProperty("spaceData");
      expect(response.body).toHaveProperty("message");
  
    });

    test("should specify json in the content type header", async () => {
      // test logic to verify the content type header
      const response = await supertest(app).post("/spaceUpdates/refresh").send({
        stationCode: "NE=51002841",
        collectTime: 1711019706612,
        timeInterval: "day",
      });

      expect(response.status).toBe(201);

      expect(response.headers["content-type"]).toMatch(/application\/json/);
    });
  });
});

describe("PUT /space/spaceUpdates", () => {
  test("should update space data and respond with 201 status code", async () => {
    const requestBody = {
      stationCode: "NE=51002841",
      collectTime: 1711019706612,
      timeInterval: "day",
      dataItemMap: {
        total_income: 0,
        total_power: 1976.13,
        day_power: 0,
        day_income: 0,
        real_health_state: 1,
        month_power: 147.25
      } 
    };

    const response = await supertest(app).put("/space/spaceUpdates").send(requestBody);

    expect(response.status).toBe(500);

  });
});

describe("DELETE /space/spaceUpdates/:id", () => {
  test("should delete space data and respond with 200 status code", async () => {
  
    const spaceId = "65fadf4bdd24e0f282cbaa0c";
    const collectTime = 1711019706612;
    const timeInterval = "day";

    const response = await supertest(app).delete(`/space/spaceUpdates/${spaceId}`).send({ collectTime, timeInterval });

    expect(response.status).toBe(200);

    expect(response.body).toEqual({ message: "Space data deleted successfully" });
  });
});
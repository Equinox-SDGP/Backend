const supertest = require("supertest");
import app from "../app";
const spaceUpdatesService = require('../services/spaceUpdatesService');

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
        timeInterval: "Invalid time interval",
      });
      expect(response.body).toEqual({ message: "Error updating space data" });
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
  });
    // test('should respond with a JSON object containing the space data and a message', async () => {
    //   const mockSpaceData = {
    //     _id: '65f7f6dd90818e51d461c6be',
    //     stationCode: 'NE=51002841',
    //     dataItemMap: {}, // Replace with actual data if needed
    //     createdAt: '2024-03-18T08:10:05.697+00:00',
    //     updatedAt: '2024-03-18T08:10:05.697+00:00',
    //     __v: 0
    //   };
    
    //   // Adjust path based on your project structure (if needed)
    //   jest.mock('../services/spaceUpdatesService', () => ({
    //     saveSpaceUpdates: jest.fn().mockResolvedValue(mockSpaceData)
    //   }));
    
    //   const response = await supertest(app)
    //     .post('/space/spaceUpdates')
    //     .send({
    //       stationCode: 'NE=51002841',
    //       collectTime: 1711019706612, // Adjust if needed for your test
    //       timeInterval: 'day'
    //     });
    
    //   expect(response.status).toBe(201);
    //   expect(response.body).toEqual(mockSpaceData);
    //   expect(response.header['content-type']).toBe('application/json');
    // });

    // test("should respond with a json object containing the space data and a message", async () => {
    //   // test logic to verify the response body
      
  
    // });

    // test("should specify json in the content type header", async () => {
    //   // test logic to verify the content type header
    // });

// describe("PUT /space/spaceUpdates", () => {
//   test("should update space data and respond with 201 status code", async () => {
//     const requestBody = {
//       stationCode: "NE=51002841",
//       collectTime: 1711019706612,
//       timeInterval: "day",
//       dataItemMap: {
//         total_income: 0,
//         total_power: 1976.13,
//         day_power: 0,
//         day_income: 0,
//         real_health_state: 1,
//         month_power: 147.25
//       } 
//     };

//     const response = await supertest(app).put("/space/spaceUpdates").send(requestBody);

//     expect(response.status).toBe(500);

//   });
// });
  });

  
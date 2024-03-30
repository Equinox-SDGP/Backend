const supertest = require("supertest");
import app from "../app";
import * as spaceService from "../services/spaceService";

describe("GET /spaceDataList", () => {
    test("should respond with 200 status code and list of spaces", async () => {

      const response = await supertest(app).get("/spaceDataList");
  
      expect(response.status).toBe(200);
  
    test("should respond with 404 status code if no spaces are found", async () => {


      const response = await supertest(app).get("/spaceDataList");

      expect(response.status).toBe(404);

      expect(response.body).toEqual({ message: "Spaces not found" });
    });
  });
});

describe("GET /space/:id", () => {
    test("should respond with 200 status code and space details", async () => {

      const response = await supertest(app).get("/space/1");
  
      expect(response.status).toBe(200);
  
    });
  
    test("should respond with 404 status code if space is not found", async () => {
      jest.spyOn(spaceService, "getSpace").mockResolvedValue(null);
  
      const response = await supertest(app).get("/space/1");
  
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Space not found" });
    });
  });
  
describe("updateSpaceListWithFusion", () => {
  test("should respond with 200 status code and message if no fusion spaces are found", async () => {

    jest.spyOn(spaceService, "getSpacesListFromFusion").mockResolvedValue(undefined);
    const response = await supertest(app).post("/updateSpaceListWithFusion");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "No data found from fusion solar api" });
  });

  test("should respond with 201 status code and message if fusion spaces are successfully processed", async () => {

    const response = await supertest(app).post("/updateSpaceListWithFusion");

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Information updated" });
  });
});

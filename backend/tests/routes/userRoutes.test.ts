import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import User from "../../src/models/User";
import userRoutes from "../../src/routes/userRoutes";

const app = express();
app.use(express.json());
app.use("/api", userRoutes);

// Mock User model and logger to avoid database calls and logging during tests
jest.mock("../../src/models/User");
jest.mock("../../src/utils/logger", () => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}));

describe("User Routes", () => {
    // Clear mocks before each test to ensure clean state
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /users", () => {
    it("should fetch all users successfully", async () => {
        // Mock data for users
      const mockUsers = [
        {
          _id: "1",
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
        },
      ];
        // Mock the User model's `find` method to return mock users
      (User.find as jest.Mock).mockResolvedValue(mockUsers);

      const response = await request(app).get("/api/users");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUsers);
    });
  });

  describe("POST /users", () => {
    it("should return 400 if required fields are missing", async () => {
      const newUser = { firstName: "Jane" };

      const response = await request(app).post("/api/users").send(newUser);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "Missing required fields: firstName, lastName, or email.",
      });
    });

    // Simulated new user data with an existing email
    it("should return 409 if email already exists", async () => {
      const newUser = {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
      };
      (User.findOne as jest.Mock).mockResolvedValue(newUser);

      const response = await request(app).post("/api/users").send(newUser);

      expect(response.status).toBe(409);
      expect(response.body).toEqual({
        error: "A user with this email already exists.",
      });
    });
  });
});

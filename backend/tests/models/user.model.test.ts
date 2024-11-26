import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import User from "../../src/models/User";
import {expect, test, beforeAll, afterAll, describe, it} from '@jest/globals';

let mongoServer: MongoMemoryServer;

// Setup in-memory MongoDB and Mongoose connection
beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const uri = mongoServer.getUri();
	await mongoose.connect(uri, { });
});

// Cleanup after tests
afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

// User Model Tests
describe('User model test', () => {
	it('should create and save a user successfully', async () => {
		const validUser = new User({
			firstName: "John",
			lastName: "Doe",
			email: "john.doe@example.com"
		});
		const savedUser = await validUser.save();
		expect(savedUser._id).toBeDefined();
		expect(savedUser.firstName).toBe("John");
		expect(savedUser.lastName).toBe("Doe");
		expect(savedUser.email).toBe("john.doe@example.com");
	});

	it('should fail to create a user without required fields', async () => {
		const userWithoutRequiredField = new User({ firstName: "John" });
		let err;
		try {
			await userWithoutRequiredField.save();
		} catch (error) {
			err = error;
		}
		expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
		expect(err.errors.lastName).toBeDefined();
		expect(err.errors.email).toBeDefined();
	});

	it('should fail to create a user with invalid email', async () => {
		const userWithInvalidEmail = new User({
			firstName: "John",
			lastName: "Doe",
			email: "invalidEmail"
		});
		let err;
		try {
			await userWithInvalidEmail.save();
		} catch (error) {
			err = error;
		}
		expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
		expect(err.errors.email).toBeDefined();
	});
});

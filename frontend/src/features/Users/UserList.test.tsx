import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { toast } from "react-toastify";
import UserList from "./UserList";

jest.mock("react-toastify", () => ({
    toast: {
        error: jest.fn(),
    },
}));

const mock = new MockAdapter(axios);

describe("UserList Component", () => {
    afterEach(() => {
        mock.reset();
    });

    it("should render the User List title", () => {
        render(<UserList />);
        expect(screen.getByText("User List")).toBeInTheDocument();
    });

    it("should fetch and display user data", async () => {
        const users = [
            { _id: "1", firstName: "John", lastName: "Doe", email: "john@example.com" },
            { _id: "2", firstName: "Jane", lastName: "Doe", email: "jane@example.com" },
        ];

        mock.onGet("http://localhost:5000/api/users").reply(200, users);

        render(<UserList />);

        await waitFor(() => {
            expect(screen.getByText("John")).toBeInTheDocument();
            expect(screen.getByText("Jane")).toBeInTheDocument();
        });
    });

    it("should handle 429 error and display toast message", async () => {
        mock.onGet("http://localhost:5000/api/users").reply(429);

        render(<UserList />);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Too Many Requests. Please wait a moment before trying again.");
        });
    });

    it("should handle other errors and display toast message", async () => {
        mock.onGet("http://localhost:5000/api/users").networkError();

        render(<UserList />);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("An error occurred. Please try again later.");
        });
    });
});
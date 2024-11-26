import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { toast } from "react-toastify";
import CreateUser from "./CreateUser";

jest.mock("axios");
jest.mock("react-toastify", () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

describe("CreateUser", () => {
    beforeEach(() => {
        render(<CreateUser />);
    });

    it("renders the form fields correctly", () => {
        expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
    });

    it("submits the form successfully", async () => {
        (axios.post as jest.Mock).mockResolvedValueOnce({});

        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: "John" } });
        fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: "Doe" } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "john.doe@example.com" } });

        fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith("http://localhost:5000/api/users", {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
            });
            expect(toast.success).toHaveBeenCalledWith("User created successfully!");
        });
    });

    it("handles form submission error", async () => {
        (axios.post as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: "John" } });
        fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: "Doe" } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "john.doe@example.com" } });

        fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("An error occurred while creating the user.");
        });
    });
});
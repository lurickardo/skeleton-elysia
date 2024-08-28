import { Context } from "elysia";
import {
	errorHandler,
	httpException,
} from "../../../../src/config/error/index"; // ajuste o caminho conforme necessário
import * as HttpStatus from "http-status";

describe("errorHandler", () => {
	let set: Context["set"];

	beforeEach(() => {
		set = { ...set, status: 0 };
	});

	it("should handle Typebox errors correctly", () => {
		const error = {
			message: "Typebox validation error",
		};

		const result = errorHandler({
			genericError: error,
			set,
			code: "VALIDATION",
		});

		expect(set.status).toBe(HttpStatus.BAD_REQUEST);
		expect(result).toEqual({
			statusCode: HttpStatus.BAD_REQUEST,
			message: error.message,
			timestamp: expect.any(String),
		});
	});

	it("should handle Elysia errors correctly", () => {
		const error = {
			message: "Elysia validation error",
			code: HttpStatus.UNAUTHORIZED,
			validator: { schema: {} },
		};

		const result = errorHandler({
			genericError: error,
			set,
			code: "ELYSIA_ERROR",
		});

		expect(set.status).toBe(HttpStatus.UNAUTHORIZED);
		expect(result).toEqual({
			statusCode: HttpStatus.UNAUTHORIZED,
			message: error.message,
			timestamp: expect.any(String),
		});
	});

	it("should handle Flow errors correctly", () => {
		const error = {
			message: "Flow error",
			statusCode: HttpStatus.FORBIDDEN,
		};

		const result = errorHandler({
			genericError: error,
			set,
			code: "FLOW_ERROR",
		});

		expect(set.status).toBe(HttpStatus.FORBIDDEN);
		expect(result).toEqual({
			statusCode: HttpStatus.FORBIDDEN,
			message: error.message,
			timestamp: expect.any(Date),
		});
	});

	it("should handle unexpected errors correctly", () => {
		const error = { unexpected: "Unexpected error details" };
		const result = errorHandler({
			genericError: error,
			set,
			code: "UNKNOWN_ERROR",
		});

		expect(set.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
		expect(result).toEqual({
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			message: HttpStatus[500],
			timestamp: expect.any(String),
		});
	});

	it("should handle unexpected errors with error is null", () => {
		const error = null;
		const result = errorHandler({
			genericError: error,
			set,
			code: "UNKNOWN_ERROR",
		});

		expect(set.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
		expect(result).toEqual({
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			message: HttpStatus[500],
			timestamp: expect.any(String),
		});
	});
});

describe("httpException", () => {
	it("should create an exception with the correct format", () => {
		const message = "Test exception";
		const statusCode = HttpStatus.BAD_REQUEST;

		const result = httpException(message, statusCode);

		expect(result).toEqual({
			message,
			statusCode,
		});
	});

	it("should handle an array of messages", () => {
		const messages = ["Test exception 1", "Test exception 2"];
		const statusCode = HttpStatus.BAD_REQUEST;

		const result = httpException(messages, statusCode);

		expect(result).toEqual({
			message: messages,
			statusCode,
		});
	});
});

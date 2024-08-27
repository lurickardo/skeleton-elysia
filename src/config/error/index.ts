import type { Context } from "elysia";
import * as HttpStatus from "http-status";

type errorHandlerType = {
	genericError: any;
	set: Context["set"];
	code: string;
};

const isTypeboxError = (code: string): boolean => {
	return code === "VALIDATION";
};

const isElysiaError = (error: any): boolean => {
	return !!error.validator?.schema;
};

const isFlowError = (error: any): boolean => {
	return error.message && error.statusCode;
};

export const errorHandler = ({ genericError, set, code }: errorHandlerType) => {
	const error = { ...genericError };

	if (isTypeboxError(code)) {
		set.status = HttpStatus.BAD_REQUEST;
		return {
			statusCode: HttpStatus.BAD_REQUEST,
			message: genericError.message,
			timestamp: new Date().toISOString(),
		};
	}

	if (isElysiaError(error)) {
		set.status = error.code;
		return {
			statusCode: error.code,
			message: error.message,
			timestamp: new Date().toISOString(),
		};
	}

	if (isFlowError(error)) {
		set.status = error.statusCode;
		return {
			statusCode: error.statusCode,
			message: error.message,
			timestamp: new Date(),
		};
	}

	process.stdout.write(
		`\n\n\x1b[41m--- UNEXPECTED ERROR CODE ${code} ---\x1b[0m\n`,
	);
	process.stdout.write(
		`Error: \n${
			Object.keys(error).length ? JSON.stringify(error) : genericError
		}\n\x1b[41m--- END UNEXPECTED ERROR --- \x1b[0m\n\n\n`,
	);

	set.status = HttpStatus.INTERNAL_SERVER_ERROR;
	return {
		statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
		message: HttpStatus[500],
		timestamp: new Date().toISOString(),
	};
};

export const httpException = (
	message: string | string[],
	statusCode: number,
) => {
	return { message, statusCode };
};

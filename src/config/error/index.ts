import type { Context } from "elysia";
import * as HttpStatus from "http-status";

type errorHandlerType = {
	genericError: any;
	set: Context["set"];
	code: string;
};

const isTypeboxError = (error: any): boolean => {
	return !!error.value && error.code === "VALIDATION";
};

const isElysiaError = (error: any): boolean => {
	return !!error?.validator.schema;
};

export const errorHandler = ({ genericError, set, code }: errorHandlerType) => {
	if (isTypeboxError(genericError)) {
		const message = [...genericError.validator.Errors({})]
			.map((error: any) => {
				const field = error.path?.replace("/", "") || "unknown"; // Removendo a barra inicial do caminho e tratando undefined
				return `${field}: ${error.message}`;
			})
			.sort();

		set.status = HttpStatus.BAD_REQUEST;
		return {
			statusCode: HttpStatus.BAD_REQUEST,
			message,
			timestamp: new Date().toISOString(),
		};
	}

	const error = { ...genericError };

	if (isElysiaError(error)) {
		set.status = error.code;
		return {
			statusCode: error.code,
			message: error.message,
			timestamp: new Date().toISOString(),
		};
	}

	process.stdout.write(
		`\n\n\x1b[41m--- UNEXPECTED ERROR CODE ${code} ---\x1b[0m\n`,
	);
	process.stdout.write("\x1b[33mCode tracer: \x1b[0m\n");
	console.error(genericError);
	process.stdout.write(
		`\n\nError: \n${
			Object.keys(error).length ? JSON.stringify(error) : genericError
		}\n\x1b[41m--- END UNEXPECTED ERROR --- \x1b[0m\n\n\n`,
	);

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

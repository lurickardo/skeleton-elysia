import type { Context } from "elysia";
import * as HttpStatus from "http-status";

type errorHandlerType = {
  genericError: any;
  set: Context["set"];
  code: string;
};

const isZodError = (error: any): boolean => {
  return !!error.issues;
};

const isElysiaError = (error: any): boolean => {
  return error.status && error.code;
};

export const errorHandler = ({ genericError, set, code }: errorHandlerType) => {
  const error = { ...genericError };
  if (isZodError(error)) {
    const message = error.issues.map((issue) => {
      return `${issue.path[0]}: ${issue.message}`;
    });

    set.status = HttpStatus.BAD_REQUEST;
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message,
      timestamp: new Date(),
    };
  }

  if (isElysiaError(error)) {
    set.status = error.code;
    return {
      statusCode: error.code,
      message: error.message,
      timestamp: new Date(),
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
    timestamp: new Date(),
  };
};

export const httpException = (
  message: string | string[],
  statusCode: number,
) => {
  return { message, statusCode };
};

import { Context } from "elysia";
import * as HttpStatus from "http-status";

type errorHandlerType = {
  genericError: any;
  set: Context["set"];
  code: number;
};

const isZodError = (error: any): boolean => {
  return !!error.issues;
};

const isFlowError = (error: any): boolean => {
  return error.message && error.statusCode;
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

  if (isFlowError(error)) {
    set.status = error.statusCode;
    return {
      statusCode: error.statusCode,
      message: error.message,
      timestamp: new Date(),
    };
  }

  process.stdout.write(
    `\n\n\x1b[41m--- UNEXPECTED ERROR --- \x1b[0m\n ${
      Object.keys(error).length ? JSON.stringify(error) : genericError
    }\n\x1b[41m--- END UNEXPECTED ERROR --- \x1b[0m\n\n\n`,
  );
  return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: HttpStatus[500],
    timestamp: new Date(),
  });
};

export const httpException = (
  message: string | string[],
  statusCode: number,
) => {
  return { message, statusCode };
};

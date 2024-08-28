import { t } from "elysia";
import { createUserSchema, updateUserSchema } from "./dto";

const defaultHeader = {
	authorization: t.String({
		error: "Authorization header is required",
	}),
};

export const userSchema = {
	listAll: {
		headers: t.Object({
			...defaultHeader,
		}),
	},
	findById: {
		params: t.Object({
			id: t.String(),
		}),
		headers: t.Object({
			...defaultHeader,
		}),
	},
	create: {
		body: createUserSchema,
		headers: t.Object({
			...defaultHeader,
		}),
	},
	update: {
		body: updateUserSchema,
		headers: t.Object({
			...defaultHeader,
		}),
	},
	remove: {
		params: t.Object({
			id: t.String(),
		}),
	},
};

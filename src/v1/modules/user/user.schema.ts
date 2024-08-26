import { t } from "elysia";
import { createUserSchema, updateUserSchema } from "./dto";

export const userSchema = {
	listAll: {
		headers: t.Object({
			authorization: t.String(),
		}),
	},
	findById: {
		params: t.Object({
			id: t.String(),
		}),
		headers: t.Object({
			authorization: t.String(),
		}),
	},
	create: {
		body: createUserSchema,
		headers: t.Object({
			authorization: t.String(),
		}),
	},
	update: {
		body: updateUserSchema,
		headers: t.Object({
			authorization: t.String(),
		}),
	},
	remove: {
		params: t.Object({
			id: t.String(),
		}),
	},
};

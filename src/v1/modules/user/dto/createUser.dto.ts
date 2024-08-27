import { Static, t } from "elysia";

export const createUserSchema = t.Object({
	name: t.String({
		minLength: 3,
		error: "Name is required",
	}),
	email: t.String({ format: "email", error: "Email is required" }),
});

export type CreateUserDto = Static<typeof createUserSchema>;

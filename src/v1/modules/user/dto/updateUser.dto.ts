import { Static, t } from "elysia";

export const updateUserSchema = t.Object({
	name: t.String({
		minLength: 3,
		error: "Name is required",
	}),
	email: t.String({ format: "email", error: "Email is required" }),
});

export type UpdateUserDto = Static<typeof updateUserSchema>;

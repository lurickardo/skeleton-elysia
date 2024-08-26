import { Static, t } from "elysia";

export const createUserSchema = t.Object({
	name: t.String({
		minLength: 3,
	}),
	email: t.String({ format: "email" }),
});

export type CreateUserDto = Static<typeof createUserSchema>;

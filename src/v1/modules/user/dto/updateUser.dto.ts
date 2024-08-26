import { Static, t } from "elysia";

export const updateUserSchema = t.Object({
  name: t.String({
    minLength: 3,
  }),
  email: t.String({ format: "email" }),
});

export type UpdateUserDto = Static<typeof updateUserSchema>;

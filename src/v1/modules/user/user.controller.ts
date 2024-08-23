import { transformCreateUserDto, transformUpdateUserDto } from "./dto";
import { userService } from "./user.service";

export const userController = {
	findById: async ({ params: { id } }, reply) => {
		return reply.code(200).send(await userService.findById(id));
	},

	listAll: async (request: Request, reply) => {
		return reply.code(200).send(await userService.listAll());
	},

	create: async ({ body }, reply) => {
		return reply
			.code(201)
			.send(await userService.create(transformCreateUserDto(body)));
	},

	update: async ({ params: { id }, body }, reply) => {
		return reply
			.code(200)
			.send(await userService.update(id, transformUpdateUserDto(body)));
	},

	remove: async ({ params: { id } }, reply) => {
		return reply.code(200).send(await userService.remove(id));
	},
};

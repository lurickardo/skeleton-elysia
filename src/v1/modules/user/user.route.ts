import { DocumentDecoration, Elysia } from "elysia";
import { RouteInterface } from "src/app.module";
import { userSchema } from "./user.schema";
import { UserService } from "./user.service";

export class UserRouteV1 implements RouteInterface<Elysia> {
	private prefix: string;
	private detail: DocumentDecoration;

	constructor() {
		this.prefix = "/v1/user";
		this.detail = {
			tags: ["v1"],
		};
	}

	private routes(app: Elysia) {
		return app
			.get(
				"",
				async () => {
					return new UserService().listAll();
				},
				userSchema.listAll,
			)
			.get(
				":id",
				async ({ params: { id } }) => {
					return new UserService().findById(id);
				},
				userSchema.findById,
			)
			.post(
				"",
				async ({ body }) => {
					return new UserService().create(body as any);
				},
				userSchema.create,
			)
			.put(
				":id",
				async ({ params: { id }, body }) => {
					return new UserService().update(id, body as any);
				},
				userSchema.update,
			)
			.delete(
				"",
				async ({ params: { id } }) => {
					return new UserService().remove(id);
				},
				userSchema.remove,
			);
	}

	public execute(server: Elysia): void {
		server.group(
			this.prefix,
			{
				detail: {
					...this.detail,
				},
			},
			(app) => this.routes(app as any),
		);
	}
}

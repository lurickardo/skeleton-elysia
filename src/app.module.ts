import type Elysia from "elysia";
import { userRouteV1 } from "./v1/modules/user/user.route";

export interface RouteInterface {
	execute(server: Elysia): Elysia;
}

export class Routes {
	private server: any;
	private routes: RouteInterface[];

	constructor(server: any) {
		this.server = server;
		this.routes = [];
	}

	public execute() {
		this.routes.forEach((route) => {
			// implementar rotas
		});
		return this.server;
	}
}

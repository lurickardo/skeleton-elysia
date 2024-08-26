import Elysia from "elysia";
import { UserRouteV1 } from "./v1/modules/user/user.route";

export interface RouteInterface<T> {
	execute(server: T): void;
}

export class Routes<T> {
	private server: T;
	private routes: RouteInterface<Elysia | T>[];

	constructor(server: T) {
		this.server = server;
		this.routes = [new UserRouteV1()];
	}

	public execute() {
		this.routes.forEach((route) => route.execute(this.server));
	}
}

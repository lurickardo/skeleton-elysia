import type Elysia from "elysia";
import type { PluginsInterface } from "./plugins.interface";
import { env } from "../config";
import { SwaggerPlugin } from "./swagger.plugin";
import { CorsPlugin } from "./cors.plugin";
import { HealthCheckPlugin } from "./healthcheck.plugin";

export default class Plugins<T> {
	private server: T;
	private plugins: PluginsInterface<Elysia | T>[];

	constructor(server: T) {
		this.server = server;
		this.plugins =
			env.app.environment?.toUpperCase() === "PRD"
				? [new CorsPlugin(), new HealthCheckPlugin()]
				: [new SwaggerPlugin(), new CorsPlugin(), new HealthCheckPlugin()];
	}

	public execute() {
		this.plugins.forEach((plugin) => plugin.execute(this.server));
		return this.server;
	}
}

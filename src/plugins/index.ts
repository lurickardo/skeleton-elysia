import type { Elysia } from "elysia";
import { env } from "../config";
import { CorsPlugin } from "./cors.plugin";
import { HealthCheckPlugin } from "./healthcheck.plugin";
import type { PluginsInterface } from "./plugins.interface";
import { SwaggerPlugin } from "./swagger.plugin";

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
	}
}

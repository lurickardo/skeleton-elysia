import type Elysia from "elysia";
import type { PluginsInterface } from "./plugins.interface";

export class HealthCheckPlugin implements PluginsInterface<Elysia> {
	public execute(server: Elysia): void {
		server.get("/healthcheck", () => {
			return {
				message: "ok",
				statusCode: 200,
			};
		});
	}
}

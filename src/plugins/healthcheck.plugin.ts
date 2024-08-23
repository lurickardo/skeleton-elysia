import type Elysia from "elysia";
import type { PluginsInterface } from "./plugins.interface";

export class HealthCheckPlugin implements PluginsInterface<Elysia> {
	public execute(server: Elysia): Elysia {
		return server.get("/healthcheck", () => {
			console.log("Healthcheck endpoint hit");
			
			return {
				message: "ok",
				statusCode: 200,
			};
		});
	}
}

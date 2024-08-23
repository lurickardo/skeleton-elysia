import { cors } from "@elysiajs/cors";
import type { Elysia } from "elysia";
import type { PluginsInterface } from "./plugins.interface";

export class CorsPlugin implements PluginsInterface<Elysia> {
	public execute(server: Elysia): Elysia {
		return server.use(
			cors({
				origin: "*",
				methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
			}),
		);
	}
}

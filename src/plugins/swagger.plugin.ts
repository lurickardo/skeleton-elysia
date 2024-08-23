import { swagger } from "@elysiajs/swagger";
import type { Elysia } from "elysia";
import type { PluginsInterface } from "./plugins.interface";

export class SwaggerPlugin implements PluginsInterface<Elysia> {
	public execute(server: Elysia): Elysia {
		return server.use(swagger());
	}
}

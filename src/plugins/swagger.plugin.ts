import { swagger } from "@elysiajs/swagger";
import type { Elysia } from "elysia";
import type { PluginsInterface } from "./plugins.interface";

export class SwaggerPlugin implements PluginsInterface<Elysia> {
	public execute(server: Elysia): void {
		server.use(swagger());
	}
}

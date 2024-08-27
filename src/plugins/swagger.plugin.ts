import { swagger } from "@elysiajs/swagger";
import type { Elysia } from "elysia";
import * as application from "../../package.json";
import { env } from "../config";
import type { PluginsInterface } from "./plugins.interface";

export class SwaggerPlugin implements PluginsInterface<Elysia> {
	public execute(server: Elysia): void {
		server.use(
			swagger({
				documentation: {
					info: {
						title: application.name,
						version: application.version,
						description: application.description,
						contact: {
							name: application.author,
							email: application.email,
						},
						license: {
							name: application.license,
						},
					},
				},
				path: "/docs",
				exclude: [
					`${env.stripPrefix.path}/docs`,
					`${env.stripPrefix.path}/docs/json`,
				],
				provider: "scalar",
				theme: "dark",
				scalarConfig: {
					theme: "solarized",
					layout: "classic",
				},
				swaggerOptions: {
					docExpansion: "list",
					deepLinking: false,
					operationsSorter: (a: any, b: any) => {
						const order = {
							get: "0",
							post: "1",
							put: "2",
							patch: "3",
							delete: "4",
						};
						return order[a.get("method")].localeCompare(order[b.get("method")]);
					},
				},
			}),
		);
	}
}

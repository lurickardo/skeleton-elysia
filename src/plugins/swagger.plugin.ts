import { swagger } from "@elysiajs/swagger";
import * as application from "../../package.json";
import type { Elysia } from "elysia";
import type { PluginsInterface } from "./plugins.interface";
import { env } from "src/config";

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
          theme: "purple",
        },
      }),
    );
  }
}

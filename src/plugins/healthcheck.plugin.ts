import Elysia from "elysia";
import { PluginInterface } from "./plugins.interface";

export class HealthCheckPlugin implements PluginInterface {
  public execute(server: Elysia): Elysia {
    return server.get("/healthcheck", () => {
      return {
        message: "ok",
        statusCode: 200,
      };
    });
  }
}

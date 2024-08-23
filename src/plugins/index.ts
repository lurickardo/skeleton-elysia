import Elysia from "elysia";
import { env } from "../config";
import { PluginInterface } from "./plugins.interface";
import { SwaggerPlugin } from "./swagger.plugin";
import { CorsPlugin } from "./cors.plugin";
import { HealthCheckPlugin } from "./healthcheck.plugin";

export default class Plugins {
  private server: any;
  private plugins: PluginInterface[];

  constructor(server: any) {
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

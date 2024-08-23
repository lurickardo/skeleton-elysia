import Elysia from "elysia";
import { swagger } from "@elysiajs/swagger";
import { PluginInterface } from "./plugins.interface";

export class SwaggerPlugin implements PluginInterface {
  public execute(server: Elysia): Elysia {
    return server.use(swagger());
  }
}

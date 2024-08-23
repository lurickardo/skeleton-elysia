import Elysia from "elysia";
import { cors } from "@elysiajs/cors";
import { PluginInterface } from "./plugins.interface";

export class CorsPlugin implements PluginInterface {
  public execute(server: Elysia): Elysia {
    return server.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      }),
    );
  }
}

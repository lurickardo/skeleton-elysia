import Elysia from "elysia";

export interface PluginInterface {
  execute(server: Elysia): Elysia;
}

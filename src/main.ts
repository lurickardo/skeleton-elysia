import { Elysia } from "elysia";
import { Routes } from "./app.module";
import { clusterize } from "./clusterize";
import { env } from "./config";
import { errorHandler } from "./config/error";
import Plugins from "./plugins";

async function bootstrap(): Promise<void> {
  let server = new Elysia({ prefix: env.stripPrefix.path }).onError(
    ({ code, error, set }) => {
      return errorHandler({ error, set, code });
    },
  );

  server = new Plugins(server).execute();
  // server = new Routes(server).execute();

  server.listen(env.app.port || 3000);
}

clusterize(bootstrap);

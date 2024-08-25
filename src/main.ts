import { Elysia } from "elysia";
import { Routes } from "./app.module";
import { env } from "./config";
import { errorHandler } from "./config/error";
import { Plugins } from "./plugins";

async function bootstrap(): Promise<void> {
  try {
    process.stdout.write("\x1Bc\n\x1b[32mStarting server...\x1b[0m\n");
    const server = new Elysia({ prefix: env.stripPrefix.path });

    new Plugins(server).execute();
    new Routes(server).execute();

    server.onError(({ error, set, code }) => {
      return errorHandler({ genericError: error, set, code });
    });

    server.listen(env.app.port || 3000);

    process.stdout.write(
      `\x1Bc\n\x1b[32mServer started on port ${env.app.port || 3000}\x1b[0m\n`,
    );
  } catch (error) {
    process.stderr.write(
      `\n\x1b[31mError starting server: ${error.message}\x1b[0m\n`,
    );
    process.exit(1);
  }
}

bootstrap();

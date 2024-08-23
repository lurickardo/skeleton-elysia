import { Elysia } from "elysia";
import { Routes } from "./app.module";
import { env } from "./config";
import { errorHandler } from "./config/error";
import Plugins from "./plugins";

async function bootstrap(): Promise<void> {
	process.stdout.write("\n\x1b[32mStarting server...\x1b[0m\n");

	const server = new Elysia({ prefix: env.stripPrefix.path });

	new Plugins(server).execute();
	new Routes(server).execute();

	server.onError(({ error, set, code }) => {
		return errorHandler({ genericError: error, set, code });
	});

	server.listen(env.app.port || 3000);
	process.stdout.write(
		`\n\x1b[32mServer started on port ${env.app.port || 3000}\x1b[0m\n`,
	);
}

bootstrap();

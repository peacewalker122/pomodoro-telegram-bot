import Fastify from "fastify";
import type { FastifyReply, FastifyRequest } from "fastify";
import { Telegraf } from "telegraf";
import type { Update } from "telegraf/typings/core/types/typegram";

import { startPomodoro } from "./pomodoro";
import { config } from "./config";

const bot = new Telegraf(config.telegram.token);
const server = Fastify({
	logger: true,
});

bot.command("help", (ctx) => {
	ctx.reply("Pomodoro bot");
});

bot.command("start", async (ctx) => {
	startPomodoro(ctx);
});

bot.launch();

server.post(
	"/webhook",
	async function handler(
		request: FastifyRequest<{ Body: Update }>,
		reply: FastifyReply,
	) {
		try {
			const update: Update = request.body;

			await bot.handleUpdate(update);

			reply.send({ ok: true });
		} catch (e) {
			server.log.error(e);

			reply.send({ ok: false });
		}
	},
);

const start = async () => {
	try {
		await server.listen({ port: 3000 });

		const address = server.server.address();
		const port = typeof address === "string" ? address : address?.port;
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};

start();

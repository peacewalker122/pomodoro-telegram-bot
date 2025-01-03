import { Context } from "telegraf";

// 15 MINUTES
const LONG_BREAK = 15 * 60 * 1000;
const SHORT_BREAK = 5 * 60 * 1000;
const SESSION_LENGTH = 25 * 60 * 1000;

async function startPomodoro(ctx: Context) {
	try {
		let count = 0;
		ctx.reply("Time to work!");
		// Wait for the session length to complete (25 minutes)
		setTimeout(async () => {
			count++; // Increment Pomodoro count

			// Notify user when Pomodoro session ends
			await ctx.reply("Pomodoro complete! Time to take a break.");

			// Handle the break based on the Pomodoro count
			handleBreak(ctx, count);
		}, SESSION_LENGTH); // Wait for 25 minutes for each Pomodoro
	} catch (error) {
		console.log(error);
	}
}

async function handleBreak(ctx: Context, count: number) {
	try {
		if (count % 4 === 0) {
			await ctx.reply("Take a long break dude!");

			setTimeout(async () => {
				await ctx.reply("Time to get back to work!");

				await startPomodoro(ctx);
			}, LONG_BREAK);
		} else {
			await ctx.reply("Take a short break dude!");

			setTimeout(async () => {
				await ctx.reply("Time to get back to work!");

				await startPomodoro(ctx);
			}, SHORT_BREAK);
		}
	} catch (error) {
		console.log(error);
	}
}

export { startPomodoro };

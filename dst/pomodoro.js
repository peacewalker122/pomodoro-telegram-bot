"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startPomodoro = startPomodoro;
// 15 MINUTES
const LONG_BREAK = 15 * 60 * 1000;
const SHORT_BREAK = 5 * 60 * 1000;
const SESSION_LENGTH = 1 * 60 * 1000;
function startPomodoro(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let count = 0;
            ctx.reply("Time to work!");
            // Wait for the session length to complete (25 minutes)
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                count++; // Increment Pomodoro count
                // Notify user when Pomodoro session ends
                yield ctx.reply("Pomodoro complete! Time to take a break.");
                // Handle the break based on the Pomodoro count
                handleBreak(ctx, count);
            }), SESSION_LENGTH); // Wait for 25 minutes for each Pomodoro
        }
        catch (error) {
            console.log(error);
        }
    });
}
function handleBreak(ctx, count) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (count % 4 === 0) {
                yield ctx.reply("Take a long break dude!");
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield ctx.reply("Time to get back to work!");
                    yield startPomodoro(ctx);
                }), LONG_BREAK);
            }
            else {
                yield ctx.reply("Take a short break dude!");
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield ctx.reply("Time to get back to work!");
                    yield startPomodoro(ctx);
                }), SHORT_BREAK);
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}

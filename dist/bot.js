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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const telegraf_1 = require("telegraf");
const bot = new telegraf_1.Telegraf("8091945732:AAFejUrt2h2wnn81ue9P-BpWgJhb4Yxtrng");
const server = (0, fastify_1.default)({
    logger: true,
});
// Declare a route
server.get("/", function handler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        return { hello: "world" };
    });
});
server.post("/webhook", function handler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = request.body;
        server.log.info({ body: update }, "request");
        reply.send({ ok: true });
    });
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server.listen({ port: 3000 });
        const address = server.server.address();
        const port = typeof address === "string" ? address : address === null || address === void 0 ? void 0 : address.port;
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
});
start();

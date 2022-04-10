import createFastifyServer from "fastify";
import Cors from "fastify-cors";
import Static from "fastify-static"
import {parseGoogleQuery} from "./utils/parseGoogleQuery.js";
import {parseDdgQuery} from "./utils/ParseDdgQuery.js";
import {parseFilterBangs} from "./utils/bangs.js";
import * as path from "path";

const fastify = createFastifyServer({
	logger: true,
});

fastify.register(Cors, {
	origin: "*"
});

fastify.register(Static, {
	root: path.resolve(path.dirname(''), 'public'),
	prefix: '/public/',
})

const routeOptions = {};

function serveWithParser(fn) {
	return function (request, reply) {
		const {q} = request.query
		return fn(parseFilterBangs(q))
	}
}

fastify.get("/", routeOptions, async (request, reply) => {
	return reply.sendFile('index.html')
})

fastify.get("/google", routeOptions, serveWithParser(parseGoogleQuery));

fastify.get("/ddg", routeOptions, serveWithParser(parseDdgQuery));

try {
	fastify.listen(3000);
} catch (error) {
	fastify.log.error(error);
	process.exit(1);
}

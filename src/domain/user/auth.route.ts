import { PostSchema } from "../../shared/schema.shared";
import S from "fluent-json-schema";
import { FastifyInstance } from "fastify";
import { login } from "./auth.service";

/*
    prefix : '/auth'
 */

const loginSchema: PostSchema = {
	body: S.object()
		.prop("id", S.string().required())
		.prop("name", S.string().required())
		.prop("email", S.string().required()),
	headers: S.object(),
};

export async function authRoute(fastify: FastifyInstance) {
	fastify.route({
		method: "POST",
		url: "/login",
		schema: loginSchema,
		handler: login,
	});
}

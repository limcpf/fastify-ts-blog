import { FastifyInstance } from "fastify";
import { postRoute } from "../domain/post/post.route";
import { authRoute } from "../domain/user/auth.route";
import { adminRoute } from "../domain/admin/admin.route";

export async function routes(fastify: FastifyInstance) {
	fastify.register(postRoute, { prefix: "/post" });
	fastify.register(authRoute, { prefix: "/auth" });
	fastify.register(adminRoute, { prefix: "/admin" });
}

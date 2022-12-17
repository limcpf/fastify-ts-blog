import { FastifyInstance, FastifyRequest } from "fastify";
import { ERROR401 } from "../../shared/status.shared";
import { countUser } from "../user/auth.service";
import {
	createPost,
	findPosts,
	togglePublished,
	updatePost,
} from "../post/post.service";
import {
	createPostSchema,
	findPostsSchema,
	togglePublishedSchema,
	updatePostSchema,
} from "../../shared/schema.shared";

const checkExp = (exp: string) => {
	if (!exp) {
		return false;
	}
	return +exp > new Date().getTime();
};

type authRouteRequest = FastifyRequest<{
	Header: {
		authorization: string;
		isAdmin: string;
	};
	Body: {};
}>;

/*
    prefix : '/admin'
 */

export async function adminRoute(fastify: FastifyInstance) {
	fastify.addHook("preHandler", (request: authRouteRequest, reply, done) => {
		const { authorization } = request.headers;

		if (!authorization) {
			reply.status(ERROR401.statusCode).send(ERROR401.message);
			return;
		}

		try {
			const token = authorization.replace("Bearer ", "");

			const payload = fastify.jwt.decode<{
				id: string;
				name: string;
				email: string;
				iat: string;
				exp: string;
			}>(token);

			if (!payload) {
				reply.status(ERROR401.statusCode).send(ERROR401.message);
				return;
			} else if (!checkExp(payload.exp)) {
				reply.status(ERROR401.statusCode).send("유효시간이 지난 토큰입니다.");
				return;
			}

			countUser(payload).then((count) => {
				if (count > 0) {
					request.headers.isAdmin = "true";
					done();
				} else {
					reply.status(ERROR401.statusCode).send(ERROR401.message);
				}
			});
		} catch (e) {
			reply.status(ERROR401.statusCode).send(ERROR401.message);
		}
	});

	fastify.route({
		method: "GET",
		url: "/post",
		schema: findPostsSchema,
		handler: findPosts,
	});

	fastify.route({
		method: "POST",
		url: "/post",
		schema: createPostSchema,
		handler: createPost,
	});

	fastify.route({
		method: "GET",
		url: "/post/publish/:id",
		schema: togglePublishedSchema,
		handler: togglePublished,
	});

	fastify.route({
		method: "PATCH",
		url: "/",
		schema: updatePostSchema,
		handler: updatePost,
	});

	fastify.route({
		method: "GET",
		url: "/",
		handler: () => {},
	});
}

import { FastifyInstance } from "fastify";
import { findPostById, findPosts } from "./post.service";
import {
	findPostByIdSchema,
	findPostsSchema,
} from "../../shared/schema.shared";

/*
    prefix : '/post'
 */
export async function postRoute(fastify: FastifyInstance) {
	fastify.route({
		method: "GET",
		url: "/",
		schema: findPostsSchema,
		handler: findPosts,
	});

	fastify.route({
		method: "GET",
		url: "/:id",
		schema: findPostByIdSchema,
		handler: findPostById,
	});
}

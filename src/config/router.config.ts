import {FastifyInstance} from "fastify";
import {postController} from "../domain/post/post.controller";

export async function routes (fastify: FastifyInstance) {
    fastify.register(postController, {prefix: '/post'});
}

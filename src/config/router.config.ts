import {FastifyInstance} from "fastify";
import {postRoute} from "../domain/post/post.route";

export async function routes (fastify: FastifyInstance) {
    fastify.register(postRoute, {prefix: '/post'});
}

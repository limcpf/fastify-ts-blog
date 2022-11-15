import {FastifyInstance} from "fastify";

export async function routes (fastify: FastifyInstance) {
    fastify.get('/', async () => {
        return { hello: 'world' }
    });
}

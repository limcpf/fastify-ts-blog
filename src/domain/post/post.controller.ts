import {FastifyInstance, FastifyRequest} from "fastify";

/*
    prefix : '/post'
 */
export async function postController (fastify: FastifyInstance) {
    fastify.get('/', async () => {
        return { hello: 'getPost' };
    });

    fastify.get('/:id', async (request:FastifyRequest) => {
        // @ts-ignore
        const { id } = request.params;
        return { hello: `post's id is ${id}`};
    })
}

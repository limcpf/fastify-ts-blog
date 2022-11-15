import Fastify, {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import dotenv from 'dotenv';

/* environment variable setting */
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

/* fastify instance setting */
const fastify:FastifyInstance = Fastify({
    logger: process.env.NODE_ENV !== "production"
});

/* router setting */
fastify.get("/", function (request:FastifyRequest, reply:FastifyReply) {
    reply.send({ hello: "world" })
});

/* server running */
fastify.listen({ port: 3000 }, function (err) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`NODE_ENV is ${process.env.NODE_ENV}`);
});
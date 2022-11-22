import Fastify, {FastifyInstance} from 'fastify';
import * as dotenv from 'dotenv';
import {routes} from './config/router.config';

/* environment variable setting */
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

/* fastify instance setting */
const fastify:FastifyInstance = Fastify({
    logger: process.env.NODE_ENV !== "production"
});



/* router setting */
fastify.register(routes);



/* server running */
fastify.listen({ port: 3000 }, function (err) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`NODE_ENV is ${process.env.NODE_ENV}`);
});
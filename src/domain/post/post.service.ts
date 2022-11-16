import { PrismaClient, Prisma } from '@prisma/client'
import {FastifyReply, FastifyRequest} from "fastify";
import {SUCCESS} from "../../shared/status.shared";
import {handleServerError} from "../../shared/error.shared";

const prisma = new PrismaClient();

/* findPosts start */
type findPostsRequest = FastifyRequest<{
    Querystring: { size: string, page: string }
}>

export const findPosts = async (request:findPostsRequest, reply:FastifyReply) => {
    try {
        const size = +request.query.size || 10;
        const page = +request.query.page || 1;

        const post = await prisma.post.findMany({
            take: size,
            skip: (page - 1) * size
        });

        reply.status(SUCCESS["200"]).send({ data: post })
    } catch (e) {
        console.log(e);
        handleServerError(reply);
    }
};
/* findPosts end */

/* createPost start */
type createPostRequest = FastifyRequest<{
    Body: {
        title: string,
        contents: string
    },
}>

export const createPost = async (request:createPostRequest, reply:FastifyReply) => {
    try {
        const {title, contents} = request.body;

        const userData: Prisma.PostCreateInput = {
            title: title,
            contents: contents
        };

        const user = await prisma.post.create({ data: userData });

        reply.status(SUCCESS["201"]).send(user);
    } catch (e) {
        console.log(e);
        handleServerError(reply);
    }
};
/* createPost end */




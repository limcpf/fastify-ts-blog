import { PrismaClient, Prisma } from '@prisma/client'
import {FastifyReply, FastifyRequest} from "fastify";
import {ERROR400, ERROR422, ERROR500, SUCCESS} from "../../shared/status.shared";
import {throwError} from "../../shared/error.shared";

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
        throwError(reply, ERROR500);
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

        const post = await prisma.post.create({ data: userData });

        reply.status(SUCCESS["201"]).send(post);
    } catch (e) {
        console.log(e);
        throwError(reply, ERROR500);
    }
};
/* createPost end */

/* findPostById start */
type findPostByIdRequest = FastifyRequest<{
    Params: {id: string}
}>

export const findPostById = async (request:findPostByIdRequest, reply:FastifyReply) => {
    try {
        const { id } = request.params;

        const post = await getPostById(+id, reply);

        if(!reply.sent) {
            if(post) reply.status(SUCCESS["200"]).send(post);
            else throwError(reply, ERROR422);
        }
    } catch (e) {
        console.log(e);

        if(!reply.sent) throwError(reply, ERROR500);
    }
};
/* findPostById end */

/* togglePublished start */
type togglePublishedRequest = FastifyRequest<{
    Params: { id: string }
}>

export const togglePublished = async (request:togglePublishedRequest, reply:FastifyReply) => {
    try {
        const { id } = request.params;

        const post = await prisma.post.findUnique({
            where: {
                id: +id
            },
            select: {
                published: true
            },
        })


        if(post && post.published != null) {
            const result = await prisma.post.update({
                where: {
                    id: +id
                },
                data: {
                    published: !post.published
                }
            });

            reply.status(SUCCESS["200"]).send(result);
        } else {
            throwError(reply, ERROR400);
        }


    } catch (e) {
        console.log(e);
        throwError(reply, ERROR500);
    }
};
/* togglePublished end */

/* only use in this service */
const getPostById = (id: number, reply:FastifyReply) => {
    if(id) {
        return prisma.post.findUnique({
            where: { id: id }
        })
    } else {
        throwError(reply, ERROR400);
        return;
    }
}



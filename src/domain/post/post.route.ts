import {FastifyInstance} from "fastify";
import {createPost, findPosts} from "./post.service";
import S from 'fluent-json-schema'
import {GetSchema, PostSchema} from "../../shared/schema.shared";

/*
    prefix : '/post'
 */

const findPostsSchema: GetSchema = {
    queryString: S.object()
        .prop('size', S.string().required())
        .prop('page', S.string().required()),
    headers: S.object(),
}

const createPostSchema: PostSchema = {
    body: S.object()
        .prop('title', S.string().required())
        .prop('contents', S.string().required()),
    headers: S.object(),
}

export async function postRoute(fastify: FastifyInstance) {
    fastify.route({
        method: 'GET',
        url: '/',
        schema: findPostsSchema,
        handler: findPosts
    });

    fastify.route({
        method: 'POST',
        url: '/',
        schema: createPostSchema,
        handler: createPost
    })
}


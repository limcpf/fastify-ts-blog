import {FastifyInstance} from "fastify";
import {createPost, findPostById, findPosts, togglePublished, updatePost} from "./post.service";
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

const findPostByIdSchema: GetSchema = {
    params: S.object()
        .prop('id', S.string().required()),
    headers: S.object()
}

const togglePublishedSchema: GetSchema = {
    params: S.object()
        .prop('id', S.string().required()),
    headers: S.object()
}

const updatePostSchema: PostSchema = {
    body: S.object()
        .prop('id', S.number().required())
        .prop('title', S.string())
        .prop('contents', S.string()),
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
    });

    fastify.route({
        method: 'GET',
        url: '/:id',
        schema: findPostByIdSchema,
        handler: findPostById
    });

    fastify.route({
        method: 'GET',
        url: '/publish/:id',
        schema: togglePublishedSchema,
        handler: togglePublished
    });

    fastify.route({
        method: 'PATCH',
        url: '/',
        schema: updatePostSchema,
        handler: updatePost
    })
}


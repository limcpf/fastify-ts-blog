import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import {
	ERROR400,
	ERROR422,
	ERROR500,
	SUCCESS,
} from "../../shared/status.shared";
import { throwError } from "../../shared/error.shared";
import {PostBuilder} from "./post.builder";
import {Post} from "./post.class";

const prisma = new PrismaClient();

/* findPosts start */
type findPostsRequest = FastifyRequest<{
	Header: { authorization: string; isAdmin: true };
	Querystring: { size: string; page: string };
}>;

export const findPosts = async (
	request: findPostsRequest,
	reply: FastifyReply,
) => {
	try {
		const size = +request.query.size || 10;
		const page = +request.query.page || 1;

		const post = await prisma.post.findMany({
			take: size,
			skip: (page - 1) * size,
			where: addPublished({}, request.headers.isAdmin),
			orderBy: [
				{
					createdAt: "desc",
				},
			],
			include: {
				series: true,
			},
		});

		const listCnt = await prisma.post.count({
			where: addPublished({}, request.headers.isAdmin),
		});

		reply.status(SUCCESS["200"]).send({ data: post, cnt: listCnt });
	} catch (e) {
		const u = e as Error;
		throwError(reply, ERROR500, u.message);
	}
};
/* findPosts end */

/* createPost start */
type createPostRequest = FastifyRequest<{
	Header: { isAdmin: true };
	Body: {
		title: string;
		contents: string;
		seriesId?: number;
	};
}>;

export const createPost = async (
	request: createPostRequest,
	reply: FastifyReply,
) => {
	try {
		const { title, contents, seriesId } = request.body;

		const post: Post = new PostBuilder()
			.title(title)
			.contents(contents)
			.seriesId(seriesId)
			.build();

		post.printLog();

		const result = await prisma.post.create({ data: post.create() });

		reply.status(SUCCESS["201"]).send(result);
	} catch (e) {
		const u = e as Error;
		throwError(reply, ERROR500, u.message);
	}
};
/* createPost end */

/* findPostById start */
type findPostByIdRequest = FastifyRequest<{
	Header: { isAdmin: true };
	Params: { id: string };
}>;

export const findPostById = async (
	request: findPostByIdRequest,
	reply: FastifyReply,
) => {
	try {
		const { id } = request.params;

		const post = await getPostById(+id, request.headers.isAdmin);

		if (post) {
			reply.status(SUCCESS["200"]).send(post);
		} else {
			throwError(reply, ERROR422, "잘못된 id 입니다.");
		}
	} catch (e) {
		const u = e as Error;
		throwError(reply, ERROR500, u.message);
	}
};
/* findPostById end */

/* togglePublished start */
type togglePublishedRequest = FastifyRequest<{
	Params: { id: string };
}>;

export const togglePublished = async (
	request: togglePublishedRequest,
	reply: FastifyReply,
) => {
	try {
		const { id } = request.params;

		const post = await prisma.post.findUnique({
			where: {
				id: +id,
			},
			select: {
				published: true,
			},
		});

		if (!post) {
			throwError(reply, ERROR400);
			return;
		}

		const result = await prisma.post.update({
			where: {
				id: +id,
			},
			data: {
				published: !post.published,
			},
		});

		reply.status(SUCCESS["200"]).send(result);
	} catch (e) {
		const u = e as Error;
		throwError(reply, ERROR500, u.message);
	}
};
/* togglePublished end */

/* updatePostById start */
type updatePostByIdRequest = FastifyRequest<{
	Body: {
		id: number;
		title: string;
		contents: string;
		seriesId: number;
	};
}>;

export const updatePost = async (
	request: updatePostByIdRequest,
	reply: FastifyReply,
) => {
	try {
		const { id, title, contents, seriesId } = request.body;

		const newPost = new PostBuilder()
			.id(id)
			.title(title)
			.contents(contents)
			.seriesId(seriesId)
			.build();
			const result = await prisma.post.update({
				where: {
					id: id,
				},
				data: newPost.update(),
			})

			reply.status(SUCCESS["200"]).send(result);
	} catch (e) {
		const u = e as Error;
		throwError(reply, ERROR500, u.message);
	}
};
/* updatePostById end */

/* only use in this service */
const getPostById = (id: number, isAdmin?: string | string[] | undefined) => {
	const where = { id: id };
	return prisma.post.findFirst({
		where: addPublished(where, isAdmin),
		include: {
			series: true,
		},
	});
};

const addPublished = (
	obj: object,
	isAdmin?: string | string[] | undefined,
): object => {
	return isAdmin === "true"
		? { ...obj }
		: {
				...obj,
				published: true,
		  };
};

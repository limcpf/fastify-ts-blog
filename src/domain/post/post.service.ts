import { PrismaClient, Prisma } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import {
	ERROR400,
	ERROR422,
	ERROR500,
	SUCCESS,
} from "../../shared/status.shared";
import { throwError } from "../../shared/error.shared";
import { UpdatePostInterface } from "./post.interface";

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
		});

		reply.status(SUCCESS["200"]).send({ data: post });
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
	};
}>;

export const createPost = async (
	request: createPostRequest,
	reply: FastifyReply,
) => {
	try {
		if (request.headers.isAdmin === "true") throw new Error("운영자만 접근 가능합니다.");

		const { title, contents } = request.body;

		const userData: Prisma.PostCreateInput = {
			title: title,
			contents: contents,
		};

		const post = await prisma.post.create({ data: userData });

		reply.status(SUCCESS["201"]).send(post);
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

		if (post) { reply.status(SUCCESS["200"]).send(post); }
		else { throwError(reply, ERROR422, "잘못된 id 입니다."); }
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

		if (post?.published != null) {
			const result = await prisma.post.update({
				where: {
					id: +id,
				},
				data: {
					published: !post.published,
				},
			});

			reply.status(SUCCESS["200"]).send(result);
		} else {
			throwError(reply, ERROR400);
		}
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
	};
}>;

export const updatePost = async (
	request: updatePostByIdRequest,
	reply: FastifyReply,
) => {
	try {
		const { id, title, contents } = request.body;

		const post = await prisma.post.findUnique({
			where: {
				id: id,
			},
			select: {
				title: true,
				contents: true,
			},
		});

		const updateData: UpdatePostInterface = {};
		if (!post) {
			throwError(reply, ERROR422, "잘못된 id 값 입니다.");
			return;
		}

		if (title && post.title && title !== post.title) {
			updateData.title = title;
		}

		if (contents && post.contents && contents !== post.contents) {
			updateData.contents = contents;
		}

		if (updateData.title || updateData.contents) {
			const result = await prisma.post.update({
				where: {
					id: id,
				},
				data: updateData,
			});

			reply.status(SUCCESS["200"]).send(result);
		} else {
			throwError(reply, ERROR422, "수정할 내용을 입력해주세요.");
		}
	} catch (e) {
		const u = e as Error;
		throwError(reply, ERROR500, u.message);
	}
};
/* updatePostById end */

/* only use in this service */
const getPostById = (id: number, isAdmin?: string | string[] | undefined) => {
	const where = { id: id };
	return prisma.post.findUnique({
		where: addPublished(where, isAdmin),
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

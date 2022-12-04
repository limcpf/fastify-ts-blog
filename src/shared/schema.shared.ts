import S from "fluent-json-schema";

export interface GetSchema {
	queryString?: any;
	params?: any;
	headers: any;
}

export interface PostSchema {
	body: any;
	queryString?: any;
	params?: any;
	headers: any;
}

export const findPostsSchema: GetSchema = {
	queryString: S.object()
		.prop("size", S.string().required())
		.prop("page", S.string().required()),
	headers: S.object(),
};

export const createPostSchema: PostSchema = {
	body: S.object()
		.prop("title", S.string().required())
		.prop("contents", S.string().required()),
	headers: S.object(),
};

export const findPostByIdSchema: GetSchema = {
	params: S.object().prop("id", S.string().required()),
	headers: S.object(),
};

export const togglePublishedSchema: GetSchema = {
	params: S.object().prop("id", S.string().required()),
	headers: S.object(),
};

export const updatePostSchema: PostSchema = {
	body: S.object()
		.prop("id", S.number().required())
		.prop("title", S.string())
		.prop("contents", S.string()),
	headers: S.object(),
};

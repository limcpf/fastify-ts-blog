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
		.prop("contents", S.string().required())
		.prop("seriesId", S.number()),
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
		.prop("title", S.string().required())
		.prop("contents", S.string().required())
		.prop("seriesId", S.number().required()),
	headers: S.object(),
};

export const findSeriesSchema: GetSchema = {
	params: S.object().prop("id", S.string().required()),
	headers: S.object(),
};

export const findSeriesNameSchema: GetSchema = {
	headers: S.object(),
};

export const createSeriesSchema: PostSchema = {
	body: S.object().prop("name", S.string()),
	headers: S.object(),
};

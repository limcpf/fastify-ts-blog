import { Post } from "./post.class";
import { Builder } from "../../shared/builder.shared";

export class PostBuilder extends Builder<Post> implements BuilderType<Post> {
	constructor() {
		super(Post);
	}

	id(id: number) {
		this.object.id = id;
		return this;
	}

	published(published: boolean | undefined) {
		this.object.published = published;
		return this;
	}

	title(title: string) {
		this.object.title = title;
		return this;
	}

	contents(contents: string) {
		this.object.contents = contents;
		return this;
	}

	seriesId(seriesId: number | undefined) {
		this.object.seriesId = seriesId;
		return this;
	}

	createdAt(createdAt: string) {
		this.object.createdAt = createdAt;
		return this;
	}

	updatedAt(updateAt: string) {
		this.object.updatedAt = updateAt;
		return this;
	}
}

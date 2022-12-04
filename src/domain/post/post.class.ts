import { PostInterface } from "./post.interface";
import { TimeClass } from "../time.class";

export class PostClass extends TimeClass {
	readonly id?: number;
	private published: boolean;
	title: string;
	contents?: string;

	constructor({
		id,
		title,
		published,
		contents,
		createdAt,
		updatedAt,
	}: PostInterface) {
		super(createdAt, updatedAt);
		this.id = id;
		this.published = published ?? false;
		this.title = this.validateTitle(title);
		this.contents = contents;
	}

	private validateTitle(title: string): string {
		if (!title) { new Error("제목이 비었습니다."); }
		else if (title.length > 255) {
			new Error("제목은 255자를 넘어갈 수 없습니다.");
		}
		return title;
	}

	public togglePublished() {
		this.published = !this.published;
	}
	public getPublished(): boolean {
		return this.published;
	}
}

import { TimeClass } from "../time.class";
import {Prisma} from "@prisma/client";

export class Post extends TimeClass {
	id: number;
	published?: boolean;
	title: string;
	contents: string;
	seriesId?: number;

	constructor() {
		super();
		this.id = 0;
		this.title = "";
		this.contents = "";
	}

	create(): Prisma.PostCreateInput {
		// TODO : 정합성 추가해야함
		return {
			title: this.title,
			contents: this.contents,
			series: {
				connect: {
					id: this.seriesId,
				},
			}
		}
	}
}

export interface PostInterface {
	id?: number;
	published: boolean;
	title: string;
	contents?: string;
	createdAt: string;
	updatedAt: string;
}

export interface UpdatePostInterface {
	title?: string;
	contents?: string;
}

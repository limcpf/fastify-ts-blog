import {PostInterface} from "./post.interface";

export class PostClass implements PostInterface{
    id: number;
    title: string;
    contents: string;
    createdDate: string;
    modifiedDate: string;

    constructor({id, title, contents, createdDate, modifiedDate}: PostInterface) {
        this.id = id;
        this.title = title;
        this.contents = contents;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

}
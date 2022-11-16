export class TimeClass {
    readonly createdAt: string;
    readonly updatedAt: string;

    constructor(createAt:string, updateAt:string) {
        this.createdAt = createAt;
        this.updatedAt = updateAt;
    }
}
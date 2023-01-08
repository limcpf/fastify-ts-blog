interface emptyParam<T> {
	new (): T;
}

export class Builder<T> {
	public object: T;

	constructor(param: emptyParam<T>) {
		this.object = new param();
	}

	build(): T {
		return this.object;
	}
}

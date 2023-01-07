import {defaultClass} from "../shared/class.shared";

export class TimeClass extends defaultClass{
	createdAt: string;
	updatedAt: string;

	constructor() {
		super();
		this.createdAt = "";
		this.updatedAt = "";
	}
}

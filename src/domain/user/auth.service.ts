import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { ERROR400, ERROR500, SUCCESS } from "../../shared/status.shared";
import { throwError } from "../../shared/error.shared";

const prisma = new PrismaClient();
/*
    prefix : '/user'
*/

interface User {
	id: string;
	name: string;
	email: string;
}
/* login start */
type loginRequest = FastifyRequest<{
	Body: User;
}>;

export const login = async (request: loginRequest, reply: FastifyReply) => {
	try {
		const user = request.body;

		const count = await countUser(user);

		if (!count) {
			if (await hasUser()) {
				throwError(reply, ERROR400, "운영자 계정만 접근 가능합니다.");
				return;
			}
			await createUser(user);
		}
		const date = new Date();
		const accessToken = await reply.jwtSign({
			...user,
			iat: date.getTime(),
			exp: date.setHours(date.getHours() + 1),
		});
		reply.status(SUCCESS["200"]).send({
			accessToken,
			isSuccessLogin: true,
		});
	} catch (e) {
		console.log(e);
		throwError(reply, ERROR500);
	}
};
/* login end */

export const countUser = async ({ id, name, email }: User): Promise<number> => {
	return await prisma.user.count({
		where: {
			id,
			name,
			email,
		},
	});
};

const hasUser = async (): Promise<boolean> => (await prisma.user.count()) > 0;

const createUser = async (user: User): Promise<User> => {
	return await prisma.user.create({ data: user });
};

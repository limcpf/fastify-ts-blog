import { FastifyReply } from "fastify"
import { ERROR500 } from "./status.shared"

export const ERRORS = {
    invalidToken: new Error('Token is invalid.'),
    userExists: new Error('User already exists'),
    userNotExists: new Error('User not exists'),
    userCredError: new Error('Invalid credential'),
    tokenError: new Error('Invalid Token'),
}

export function handleServerError(reply: FastifyReply) {
    return reply.status(ERROR500.statusCode).send(ERROR500);
}
import { FastifyReply } from "fastify"
import {customError} from "./status.shared"


export const ERRORS = {
    invalidToken: new Error('Token is invalid.'),
    userExists: new Error('User already exists'),
    userNotExists: new Error('User not exists'),
    userCredError: new Error('Invalid credential'),
    tokenError: new Error('Invalid Token'),
}

export const throwError = (reply: FastifyReply, error: customError, message?: string) => reply.status(error.statusCode).send( message ? message : error.message);
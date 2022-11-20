export interface customError {
    statusCode: number;
    message: string;
}

export const SUCCESS = {
    201: 201,
    200: 200,
}

export const ERROR404: customError = {
    statusCode: 404,
    message: 'NOT_FOUND',
}

export const ERROR403: customError = {
    statusCode: 403,
    message: 'FORBIDDEN_ACCESS',
}

export const ERROR401: customError = {
    statusCode: 401,
    message: 'UNAUTHORIZED',
}

export const ERROR500: customError = {
    statusCode: 500,
    message: 'SERVER_ERROR',
}

export const ERROR409: customError = {
    statusCode: 409,
    message: 'DUPLICATE_FOUND',
}

export const ERROR400: customError = {
    statusCode: 400,
    message: 'BAD_REQUEST',
}

export const ERROR422: customError = {
    statusCode: 422,
    message: 'BAD_PARAMETER',
}


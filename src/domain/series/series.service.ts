import {Prisma, PrismaClient} from "@prisma/client";
import {FastifyReply, FastifyRequest} from "fastify";
import {ERROR422, ERROR500, SUCCESS} from "../../shared/status.shared";
import {throwError} from "../../shared/error.shared";

const prisma = new PrismaClient();

/* createSeries start */
type createSeriesRequest = FastifyRequest<{
    Params: {},
    Querystring: {},
    Body: {
      name: string
    },
    Header: {}
}>

export const createSeries = async (request:createSeriesRequest, reply:FastifyReply) => {
    try {
        const name = request.body.name;

        const seriesData: Prisma.SeriesCreateInput= {
            name,
        };

        const series = await prisma.series.create({ data: seriesData });

        reply.status(series ? SUCCESS["200"] : ERROR422.statusCode).send(series);
    } catch (e) {
        console.log(e);
        throwError(reply, ERROR500, "Series 생성에 실패하였습니다.");
    }
};
/* createSeries end */

/* findSeriesList start */
export const findSeriesList = async (request:FastifyRequest, reply:FastifyReply) => {
    try {
        if(!request) {}

        const series = await prisma.series.findMany({
            orderBy: [{
                name: "asc"
            }],
            select : {
                name: true
            }
        });

        reply.status(SUCCESS["200"]).send(series);
    } catch (e) {
        console.log(e);
        throwError(reply, ERROR500, "Series 전체 목록 조회에 실패하였습니다.");
    }
};
/* findSeriesList end */

export const findSeriesByPostId = async (
    id: number
) => {
        return await prisma.series.findUnique({
            where: {
                id: id,
            },
        });
};


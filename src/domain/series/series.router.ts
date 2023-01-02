/*
    prefix : '/admin/series'
 */
import {FastifyInstance} from "fastify";
import {createSeriesSchema, findSeriesSchema} from "../../shared/schema.shared";
import {createSeries, findSeriesList} from "./series.service";

export async function seriesRouter(fastify: FastifyInstance) {
    fastify.route({
        method: "GET",
        url: "/",
        schema: findSeriesSchema,
        handler: findSeriesList,
    });
    fastify.route({
        method: "POST",
        url: "/",
        schema: createSeriesSchema,
        handler: createSeries,
    });
}

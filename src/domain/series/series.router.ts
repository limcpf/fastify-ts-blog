/*
    prefix : '/admin/series'
 */
import { FastifyInstance } from "fastify";
import {
	createSeriesSchema,
	findSeriesNameSchema,
	findSeriesSchema,
} from "../../shared/schema.shared";
import { createSeries, findSeries, findSeriesNameList } from "./series.service";

export async function seriesRouter(fastify: FastifyInstance) {
	fastify.route({
		method: "GET",
		url: "/",
		schema: findSeriesNameSchema,
		handler: findSeriesNameList,
	});

	fastify.route({
		method: "POST",
		url: "/",
		schema: createSeriesSchema,
		handler: createSeries,
	});

	fastify.route({
		method: "GET",
		url: "/:id",
		schema: findSeriesSchema,
		handler: findSeries,
	});
}

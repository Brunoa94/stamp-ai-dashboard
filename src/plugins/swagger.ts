import { FastifyPluginAsync } from "fastify";
import fastifyPlugin from "fastify-plugin";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

const swaggerPlugin: FastifyPluginAsync = fastifyPlugin(async (server) => {
  server.register(swagger, {
    openapi: {
      info: {
        title: "Stamp AI Dashboard API",
        description: "API documentation",
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
  });

  server.register(swaggerUI, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
  });
});

export default swaggerPlugin;

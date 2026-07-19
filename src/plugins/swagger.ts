import { FastifyPluginAsync } from "fastify";
import fastifyPlugin from "fastify-plugin";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

const swaggerPlugin: FastifyPluginAsync = fastifyPlugin(async (server) => {
  server.register(swagger, {
    openapi: {
      info: {
        title: "Stamp AI Dashboard API",
        description:
          "Internal API for admins, authentication, invoices, and Stripe operations.",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Local development",
        },
      ],
      tags: [
        { name: "Health", description: "Service status endpoints" },
        { name: "Admins", description: "Admins endpoints" },
        { name: "Auth", description: "Authentication endpoints" },
        { name: "Invoices", description: "Invoice management" },
        { name: "Stripe", description: "Stripe integration endpoints" },
      ],
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
      deepLinking: true,
      displayRequestDuration: true,
    },
  });
});

export default swaggerPlugin;

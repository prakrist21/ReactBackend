import swaggerdocs from "swagger-jsdoc";
import { Options } from "swagger-jsdoc";

const swaggerconfig: Options = {
  swaggerDefinition: {
    info: {
      title: "demobackend",
      version: "1.1",
      description: "demo backend",
    },
    basePath: "api",
  },
  apis: ["../routes//*.ts"],
};

const docs = swaggerdocs(swaggerconfig);

export {docs as swaggerdocs};
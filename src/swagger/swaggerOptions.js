const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      description: "API para la gestion de tareas",
      version: "1.0.0",
    },
    tags: [
      {
        name: "Tasks",
        description: "Endpoints relacionados con tareas",
      },
      // Otros tags aquí
    ],
  },
  apis: ["./src/routes/**/**.js"],
};
export default swaggerOptions;

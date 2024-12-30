import express, { Router } from "express";
import {
  createTask,
  deleteTask,
  getTaskFiltered,
  getTasks,
  updateTask,
} from "../../controller/task.controller";
const router = Router();

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     description: Crea una tarea con un título y una descripción.
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la tarea (mínimo 3 caracteres).
 *                 example: "Comprar leche"
 *               description:
 *                 type: string
 *                 description: Descripción de la tarea (máximo 100 caracteres).
 *                 example: "Ir al supermercado para comprar leche y víveres esenciales."
 *             required:
 *               - title
 *           examples:
 *             valid:
 *               summary: Ejemplo válido
 *               value:
 *                 title: "Planear reunión"
 *                 description: "Organizar agenda para el equipo antes del lunes."
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *       400:
 *         description: Error de validación (por ejemplo, título muy corto o descripción demasiado larga)
 *       500:
 *         description: Error en el servidor
 */

router.post("/api/tasks", createTask);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     description: Recupera una lista de todas las tareas almacenadas en la base de datos. Puede filtrar por el estado de completado usando un parámetro de consulta opcional.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: string
 *           enum: ["true", "false"]
 *         description: Filtra las tareas por estado de completado (`true` o `false`). Si no se especifica, se devuelven todas las tareas sin filtrar.
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID único de la tarea.
 *                     example: "67720c1e65c42f81c591e778"
 *                   title:
 *                     type: string
 *                     description: Título de la tarea.
 *                     example: "123asdasd"
 *                   description:
 *                     type: string
 *                     description: Descripción de la tarea.
 *                     example: "1"
 *                   completed:
 *                     type: boolean
 *                     description: Estado de la tarea (completada o no).
 *                     example: true
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora de creación de la tarea.
 *                     example: "2024-12-30T02:57:34.074Z"
 *                   __v:
 *                     type: number
 *                     description: Número de versión del documento.
 *                     example: 0
 *       400:
 *         description: Error al obtener las tareas debido a una solicitud incorrecta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: "Error al obtener tareas"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error del servidor.
 *                   example: "Internal Server Error"
 */

router.get("/api/tasks", getTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     description: Devuelve los detalles de una tarea específica basada en su ID.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID único de la tarea a obtener.
 *           example: "64a8c3e8f6e4a520b8c4d6f8"
 *     responses:
 *       200:
 *         description: Detalles de la tarea obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID único de la tarea.
 *                   example: "64a8c3e8f6e4a520b8c4d6f8"
 *                 title:
 *                   type: string
 *                   description: Título de la tarea.
 *                   example: "Actualizar documentación"
 *                 description:
 *                   type: string
 *                   description: Descripción de la tarea.
 *                   example: "Revisar y actualizar la documentación del proyecto"
 *                 completed:
 *                   type: boolean
 *                   description: Indica si la tarea está completada.
 *                   example: false
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora de creación de la tarea.
 *                   example: "2024-12-30T03:12:45.000Z"
 *                 __v:
 *                   type: number
 *                   description: Número de versión del documento.
 *                   example: 0
 *       400:
 *         description: Error al obtener la tarea. Por ejemplo, si la tarea no existe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error.
 *                   example: "Task not found"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error del servidor.
 *                   example: "Internal Server Error"
 */

router.get("/tasks/:id", getTaskFiltered);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea
 *     description: Permite actualizar una tarea específica. Se puede actualizar uno o más campos de una tarea existente.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único de la tarea a actualizar.
 *         example: "64a8c3e8f6e4a520b8c4d6f8"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Nuevo título de la tarea (mínimo 3 caracteres).
 *                 minLength: 3
 *                 example: "Actualizar proyecto final"
 *               description:
 *                 type: string
 *                 description: Nueva descripción de la tarea (máximo 200 caracteres).
 *                 maxLength: 200
 *                 example: "Completar las últimas modificaciones del proyecto"
 *               completed:
 *                 type: boolean
 *                 description: Estado actualizado de la tarea.
 *                 example: true
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID único de la tarea.
 *                   example: "64a8c3e8f6e4a520b8c4d6f8"
 *                 title:
 *                   type: string
 *                   description: Título de la tarea.
 *                   example: "Actualizar proyecto final"
 *                 description:
 *                   type: string
 *                   description: Descripción de la tarea.
 *                   example: "Completar las últimas modificaciones del proyecto"
 *                 completed:
 *                   type: boolean
 *                   description: Estado de la tarea.
 *                   example: true
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora de creación de la tarea.
 *                   example: "2024-12-30T02:57:34.074Z"
 *                 __v:
 *                   type: number
 *                   description: Número de versión del documento.
 *                   example: 0
 *       400:
 *         description: Error de validación o falta de campos requeridos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error.
 *                   example: "At least one field (title, description, or completed) is required."
 *       404:
 *         description: Tarea no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: "Task not found"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error.
 *                   example: "500 Internal server error"
 */

router.put("/api/tasks/:id", updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     description: Permite eliminar una tarea específica basada en su ID.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único de la tarea a eliminar.
 *         example: 64a8c3e8f6e4a520b8c4d6f8
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación.
 *                   example: "Task deleted"
 *       404:
 *         description: Tarea no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: "Task not found"
 *       400:
 *         description: Error al intentar eliminar la tarea.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error.
 *                   example: "Error deleting task"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error.
 *                   example: "Internal server error"
 */

router.delete("/api/tasks/:id", deleteTask);

export default router;

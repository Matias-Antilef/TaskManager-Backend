import express from "express";
import { userLogin, userRegister } from "../../controller/user.controller.js";
const router = express.Router();

/**
 * @swagger
 * /api/user-register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Registra un usuario nuevo con un nombre de usuario y contraseña.
 *     tags:
 *       - Endpoints users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario único (mínimo 3 caracteres).
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 description: Contraseña segura (mínimo 6 caracteres).
 *                 example: "securepassword123"
 *             required:
 *               - username
 *               - password
 *           examples:
 *             valid:
 *               summary: Ejemplo válido
 *               value:
 *                 username: "janedoe"
 *                 password: "mypassword123"
 *             existingUser:
 *               summary: Usuario ya existente
 *               value:
 *                 username: "existinguser"
 *                 password: "anotherpassword"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64e5d8f3c2a4f37d9a2b9a2c"
 *                     username:
 *                       type: string
 *                       example: "johndoe"
 *                     password:
 *                       type: string
 *                       description: Contraseña hasheada del usuario
 *                       example: "$2b$10$7f5pOsZkYKg/45Z5f.pRTOxY5MzknI0Qr1EdgxlPgFT4PcC8yzQs6"
 *       400:
 *         description: Error de validación o el usuario ya existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User already exists"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: "Username is required"
 *                       param:
 *                         type: string
 *                         example: "username"
 *                       location:
 *                         type: string
 *                         example: "body"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post("/api/user-register", userRegister);

/**
 * @swagger
 * /api/user-login:
 *   post:
 *     summary: Iniciar sesión de un usuario
 *     description: Permite a un usuario iniciar sesión proporcionando su nombre de usuario y contraseña.
 *     tags:
 *       - Endpoints users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario registrado.
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 description: Contraseña asociada al usuario.
 *                 example: "securepassword123"
 *             required:
 *               - username
 *               - password
 *           examples:
 *             validLogin:
 *               summary: Ejemplo válido
 *               value:
 *                 username: "janedoe"
 *                 password: "mypassword123"
 *             invalidPassword:
 *               summary: Contraseña inválida
 *               value:
 *                 username: "johndoe"
 *                 password: "wrongpassword"
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User logged in successfully"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Error de validación o contraseña inválida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid password"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: "Username is required"
 *                       param:
 *                         type: string
 *                         example: "username"
 *                       location:
 *                         type: string
 *                         example: "body"
 *       401:
 *         description: Usuario no autorizado (nombre de usuario no encontrado)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */

router.post("/api/user-login", userLogin);

export default router;

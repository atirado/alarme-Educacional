const { Router } = require('express');
const { storeUser } = require('../controller/Controller'); // Importa a função corretamente

const router = Router();

/**
 * @swagger
 * /store/user:
 *   post:
 *     summary: Cadastrar um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do usuário
 *               usuario:
 *                 type: string
 *                 description: Nome de usuário para login
 *               senha:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       201:
 *         description: Sucesso! Usuário cadastrado.
 *       400:
 *         description: Erro no cadastro.
 */
router.post('/store/user', storeUser);

module.exports = router;

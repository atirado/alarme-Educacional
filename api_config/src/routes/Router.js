const { Router } = require('express');
const { bluetooth } = require('../controller/bluetooth'); // Importa corretamente a função bluetooth

const router = Router();

/**
 * @swagger
 * /store/post:
 *   post:
 *     summary: Armazenar dispositivos Bluetooth conectados
 *     tags: [Bluetooth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome_dos_dispositivos:
 *                 type: string
 *                 description: Nome dos dispositivos conectados via Bluetooth
 *     responses:
 *       201:
 *         description: Dispositivo armazenado com sucesso.
 *       400:
 *         description: Erro ao armazenar dispositivo.
 */
router.post('/store/post', bluetooth);

module.exports = router;

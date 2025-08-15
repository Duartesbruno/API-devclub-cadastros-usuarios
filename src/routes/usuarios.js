import express from 'express';
import { createUser, getUsers, updateUser, deleteUser } from '../controllers/usuariosController.js';
import { validateUserFields } from '../middlewares/validateFields.js';

const router = express.Router();

router.post('/', validateUserFields, createUser);
router.get('/', getUsers);
router.put('/:id', validateUserFields, updateUser);
router.delete('/:id', deleteUser);

export default router;
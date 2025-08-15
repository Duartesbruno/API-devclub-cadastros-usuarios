import { prisma } from '../configs/prismaClient.js';

export const createUser = async (req, res) => {
  try {
    const { email, name, age } = req.body;
    const user = await prisma.user.create({ data: { email, name, age } });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const { name, email, age } = req.query;
    const where = {};

    if (name) where.name = { startsWith: name, mode: 'insensitive' };
    if (email) where.email = email;
    if (age && !isNaN(parseInt(age, 10))) where.age = parseInt(age, 10);

    const users = await prisma.user.findMany({ where });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários', details: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, age } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { email, name, age }
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao editar usuário', details: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    await prisma.user.delete({ where: { id } });
    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar usuário', details: error.message });
  }
};
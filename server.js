import express from 'express'
import cors from 'cors'
import { PrismaClient } from './generated/prisma/index.js'


const prisma = new PrismaClient()

const app = express()
/*app.use(cors({ origin: 'http://localhost:5173' })) // front origin */
app.use(cors());
app.use(express.json())

//create user
app.post('/usuarios', async (req, res) => {
  try {
    const { email, name, age } = req.body
    const ageNumber = parseInt(age, 10);

    if (!email || !name || !age) {
      return res.status(400).json({ error: 'É obrigatório preencher todos os campos.' })
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        age: ageNumber
      },
    })

    res.status(201).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao criar usuário', error })
  }
})


//get all users or get user by id
app.get('/usuarios', async (req, res) => {
  try {
    const { name, email, age } = req.query

    // Assemble the where object dynamically
    const where = {}

    if (name) {
      where.name = {
        startsWith: name,
        mode: 'insensitive',
      }
    }

    if (email) {
      where.email = email
    }

    if (age) {
      where.age = age
    }

    const users = await prisma.user.findMany({ where })

    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar usuários', error })
  }
})


//edit user
app.put('/usuarios/:id', async (req, res) => {
    try {
        const { email, name, age } = req.body

        if (!email || !name || !age) {
          return res.status(400).json({ error: 'É obrigatório preencher todos os campos.' })
        }
        
        const updatedUser = await prisma.user.update({
            where: {
                id:req.params.id
            },
            data: {
                email,
                name,
                age
            }
        })

        res.status(200).json(updatedUser)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erro ao editar usuário', error })
    }
})

//delete user
app.delete('/usuarios/:id', async (req, res) => {
    try {
        //checking if user exists
        const user = await prisma.user.findUnique({
            where: {
                id: req.params.id
            }
        })

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' })
        }

        //deleting user
        await prisma.user.delete({
            where: {
                id:req.params.id
            }
        })

        res.status(200).json({ message: 'Usuário deletado com sucesso!' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erro ao deletar usuário', error })
    }
})

/*
//update user partially
app.patch('/usuarios/:id', async (req, res) => {
  try {
    const id = req.params.id
    const dataToUpdate = req.body // contém só os campos que o cliente quer mudar

    const updatedUser = await prisma.user.update({
      where: { id },
      data: dataToUpdate,  // atualiza só os campos enviados
    })

    res.status(200).json(updatedUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao atualizar usuário', error })
  }
})
*/

// Dynamic door for Render or fixed on local server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
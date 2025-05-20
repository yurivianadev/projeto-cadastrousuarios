import cors from 'cors'
import express from 'express'
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()



const app = express()
app.use(express.json())
app.use(cors())


app.post('/usuarios', async (req, res) => {
  try {
    const { email, name, age } = req.body;

    const user = await prisma.user.create({
      data: {
        email,
        name,
        age: new Date(age), // Converte a string para Date
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao criar usuário' });
  }
});

app.get('/usuarios', async (req, res) =>{
    const users = await prisma.user.findMany()
    res.status(200).json(users)
})

app.put('/usuarios/:id', async (req, res) => {

    const { email, name, age, id } = req.body;

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email,
            name,
            age: new Date(age), // Converte a string para Date
      }
    }) 
})

app.delete('/usuarios/:id', async (req, res) =>{
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: 'usuario deletado com sucesso'})
})
app.listen(3000)


//usuario e senha banco mongodb:
//yuri 912221
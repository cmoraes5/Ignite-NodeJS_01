import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

// Query Parameters: URL Stateful => Filtros, paginação, não-obrigatórios
// Route Parameters: Identificação de recurso
// Request Body: Envio de informações de um formulário (HTTPs)

// http://localhost:3333/users?userId=1&name=Caio       ==> Query parameter
// GET http://localhost:3333/users/1                    ==> Route parameter

// POST http://localhost:3333/users                     ==> Request Body = A partir disso crio um usuário passando as informaçoes no corpo da requisição 

const database = new Database()

export const Routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const users = database.select('users')

            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { name, email } =  req.body

            const user = {
                id: randomUUID(),
                name,
                email,
            }
    
            database.insert('users', user)
    
            return res.writeHead(201).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            return res.end()
        }
    }
]
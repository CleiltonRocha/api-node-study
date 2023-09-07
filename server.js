import { fastify} from 'fastify'
import 'dotenv/config'
import {DatabasePostgres} from './database-postgres.js'

const server = fastify()

const database = new DatabasePostgres()

//POST http://localhost:3333/videos

//Request Body

server.post('/videos', async (request, reply) => {

    const {title, description, duration} = request.body

    console.log(request.body)

    await database.create({
        title,
        description,
        duration
    })

    return reply.status(201).send()
})

server.get('/videos', async (request) => {
    const search = request.query.search

    const videos = await database.list(search)

    return videos
})

//:id Route Parameter
//PUT http://localhost:3333/videos/1

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    const {title, description, duration} = request.body

    await database.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    
    await database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port:process.env.PORT ?? 3333,
})
import fastify from "fastify";
import { FastifyRequest, FastifyReply } from 'fastify';
import axios from "axios";
import fastifyCors from '@fastify/cors';

const server = fastify({ logger: true });


server.register(fastifyCors, {
  origin: ['*'],
});

interface requestIa {
    texto: string;
}


async function getIaResponse(request: FastifyRequest, reply: FastifyReply) {
    const { texto } = request.body as requestIa;
 
    const prompt_text = `
    reponda de forma direta e simples a seguinte pergunta:
    ${texto}
    `.trim();
    const request_to_ia = {
        model: "iacozinha",
        prompt: prompt_text,
        stream: false
    }
    const response_ia = await axios.post("http://localhost:11434/api/generate", request_to_ia);
   
    return reply.send({resposta: response_ia.data.response})
    
}

server.post("/ia", getIaResponse);

const start = async () => {
    try {
        await server.listen({port: 3333});
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

start();
import axios from "axios";

const baseUrl = "http://localhost:3333";
const iaPath = "/ia";

interface Response {
    resposta:string;
}

interface Request {
    texto:string;
}

async function makeQuestionForIa(text: string): Promise<string> {
    const url = `${baseUrl}${iaPath}`;
    const data: Request = { texto: text };
    const response = await axios.post<Response>(url, data);
    return response.data.resposta;
}

export default {
    makeQuestionForIa
}
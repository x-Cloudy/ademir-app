import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import path from "path";
import swaggerDocument from "../swagger.json";
import { router } from './routes';
import { GetAllUser } from "./Job/GetAllUser";
import { VerifyMatriz } from "./Job/VerifyMatriz";

const app = express();
new GetAllUser();
new VerifyMatriz();
const port = 3333;

// Configuração do CORS para permitir todas as origens ou você pode restringir para um domínio específico
const corsOptions = {
    origin: "*", // Pode substituir "*" pelo domínio ou IP específico, por exemplo: "http://69.62.87.69"
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(cors(corsOptions));  // Aplicando a configuração do CORS

app.use('/v1', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/files', express.static(path.resolve(__dirname, "..", "tmp")));

// Middleware para tratamento de erros
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message,
        });
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error.',
    });
});

// Endpoint simples
app.get('/terms', (request: Request, response: Response) => {
    return response.json({
        message: "Termos de serviço",
    });
});

// Iniciando o servidor
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://0.0.0.0:${port} - Projeto Ademir App`);
});

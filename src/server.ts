import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/api', (req: Request, res: Response) => {
  res.send('<h>Welcome to Express & TypeScript Server</h1>');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from './@types/socket.io';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 7777;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScrpt Server');
});

app.listen(port, () => {
  console.log(`[Server]: server is running at https://localhost:${port}`);
});

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>();

io.on('connection', (socket) => {});

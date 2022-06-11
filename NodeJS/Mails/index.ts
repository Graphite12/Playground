import nodemailer, { Transporter } from 'nodemailer';
import SMPTMail from 'nodemailer/lib/smtp-transport';
import 'dotenv/config';
import path from 'path';
import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();
const port: number = 7100;

/* 메일 전송 대상(Gmail) */
let transporter: Transporter = nodemailer.createTransport({
  /* Gmail Host */
  host: 'smtp.gmail.com',
  /* Mail port */
  port: 465,
  /* your Mail Service Accounts */
  auth: {
    /* Gmail EMAIL */
    user: process.env.NODEMAIL_EMAIL,
    /* Gmail PWD */
    pass: process.env.NODEPWD_PWD,
  },
  secure: true,
});

/* SMPT 전송방식 */

/* 일반 전송 */
function mailServer() {
  app.get('/', async (req: Request, res: Response) => {
    const info = await transporter.sendMail({
      from: 'elitebook855@gmail.com', //your or my Email
      to: 'elitebook855@gmail.com', //your or my Email
      subject: 'Hello, Idiot', // title
      text: '대충 메일을 보낸다.',
      html: '<strong>Hello</strong>',
    });

    console.log('메세지 전송됨: %s', info);
    res.send('Hello World');
  });

  app.listen(port, () => {
    console.log(`이 앱은 해당 포트로 연결되었습니다. ${port}`);
  });
}

mailServer();

import nodemailer, {
  Transporter,
  SentMessageInfo,
  SendMailOptions,
} from 'nodemailer';
import 'dotenv/config';
import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();
const port: number = Number(process.env.PORT) || 7100;

/* 미들웨어 */
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const poolOption = {
  pool: true,
  maxConnections: 1,
  maxMessage: 5,
};

const smtpOptions = {
  /* Gmail Host */
  host: 'smtp.gmail.com',
  /* Mail port */
  port: 465,
  secure: true,
  tls: {
    //유효하지 않는 서명 허용
    rejectUnauthorized: false,
  },
  /* your Mail Service Accounts */
  auth: {
    /* Gmail EMAIL */
    user: process.env.NODEMAIL_EMAIL,
    /* Gmail PWD */
    pass: process.env.NODEPWD_PWD,
  },
  attachments: [
    //첨부파일
    {
      // utf-8 문자형식 첨부파일
      filename: 'text1.txt',
      content: 'hello world!',
    },
    {
      // 이진 buffer 첨부파일
      filename: 'text2.txt',
      content: new Buffer('hello world!', 'utf-8'),
    },
    {
      // 물리 디스크 저장된 첨부파일
      filename: 'text3.txt',
      path: '/path/to/file.txt', // stream this file
    },
    {
      // 물리 디스크 저장된 첨부파일(파일명만)
      path: '/path/to/file.txt',
    },
    {
      // 사용자 정의 유형의 첨부파일
      filename: 'text.bin',
      content: 'hello world!',
      contentType: 'text/plain',
    },
  ],
};

/* 메일 전송 대상(Gmail) */
let transporter: Transporter = nodemailer.createTransport(smtpOptions);

transporter.verify((err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log('메세지 받을 준비가 되있음');
  }
});

/* Example Mail Option */
// const ExampleMailOption: SendMailOptions = {
//   from: '', //your or my Email(발송자)
//   to: '', //your or my Email(수신자)
//   subject: '', // title  (발송 메일 제목)
//   text: '', // plain text (발송 메일 내용)
//   html: '', // HTML Content (발송 메일 HTML컨텐츠)
// attachments: [
//   //첨부파일
//   {
//     // utf-8 문자형식 첨부파일
//     filename: 'text1.txt',
//     content: 'hello world!',
//   },
//   {
//     // 이진 buffer 첨부파일
//     filename: 'text2.txt',
//     content: new Buffer('hello world!', 'utf-8'),
//   },
//   {
//     // 물리 디스크 저장된 첨부파일
//     filename: 'text3.txt',
//     path: '/path/to/file.txt', // stream this file
//   },
//   {
//     // 물리 디스크 저장된 첨부파일(파일명만)
//     path: '/path/to/file.txt',
//   },
//   {
//     // stream as an attachment
//     filename: 'text4.txt',
//     content: fs.createReadStream('file.txt'),
//   },
//   {
//        // 사용자 정의 유형의 첨부파일
//     filename: 'text.bin',
//     content: 'hello world!',
//     contentType: 'text/plain',
//   },
//   {
//     // URL을 활용한 첨부파일
//     filename: 'license.txt',
//     path: 'https://raw.github.com/andris9/Nodemailer/master/LICENSE',
//   },
//   {
//     // 문자열로 인코딩된 첨부파일
//     filename: 'text1.txt',
//     content: 'aGVsbG8gd29ybGQh',
//     encoding: 'base64',
//   },
//   {
//     // 데이터 URI로 첨부파일
//     path: 'data:text/plain;base64,aGVsbG8gd29ybGQ=',
//   },
// ],
//};

const defaultServer = () => {
  app.get('/', async (req: Request, res: Response) => {
    res.sendFile(__dirname + '/public/view/mail.html');
  });

  app.post('/', async (req: Request, res: Response) => {
    console.log(req.body);

    try {
      let { name, email, subject, message } = req.body;

      const mailhtml = `
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${name}</li>
      <li>Email: ${email}</li>
    </ul>
    <h3>Message</h3>
    <p>${message}</p>
    `;

      const mailOption: SendMailOptions = {
        from: email, //your or my Email(발송자)
        to: process.env.NODEMAIL_EMAIL, //your or my Email(수신자)
        subject: subject, // title  (발송 메일 제목)
        text: message, // plain text (발송 메일 내용)
        html: mailhtml, // HTML Content (발송 메일 HTML컨텐츠)
      };

      const info: SentMessageInfo = await transporter.sendMail(mailOption);

      console.log('메세지 전송됨: %s', info.messageId);
      console.log('프리뷰 URL: %s', nodemailer.getTestMessageUrl(info));
      res.send('success');
    } catch (error) {
      res.send(error).redirect('/');
    }
  });

  app.listen(port, () => {
    console.log(`이 서버는 해당 포트로 연결되었습니다. ${port}`);
  });
};

defaultServer();

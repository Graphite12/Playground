## typescript, nodejs, express 초기설정

```shell
npm init
```

```shell
npm install express
npm install -D ts-node @types/node @types/express tsc-watch
```

### package.json script설치

```json
 "start": "tsc-watch --onSuccess \"ts-node dist/app.js\""
```

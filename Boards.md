# MVC 디자인 패턴으로 설계

MVC는 Model, View, Controller로 나뉘어, 소프트웨어 구조를 좀더 쉽게 유지하고 수정하기 위한 용도의 디자인 패턴이다.

## Model

모델은 내부 비즈니스 로직을 처리가히 위한 역할을 한다.

## View

컨트롤러나 모델이 보여주고자 하는 모든 것을 사용자에게 보여주는 부분이다. 사용자가 특정
요청을 하게 될 경우 가공된 데이터와 작성된 로직을 거쳐 화면상으로 보여주는 역할이다.

## Controller

사용자의 요청이 들어오면 작성된 로직을 통해 `Model`이 어떻게 처리할지 알려주며, 가공된 데이터를 `Model`로부터 받아와 `View`에게 전달한다.

# Boards

간단한 `CRUD`(HTTP RestAPI, GET POST PUT DELTE),(DB, SELECT, INSERT, UPDATE, DELETE)로 동작하는 게시판이며, 추가적으로 회원 요청 처리, OAuth 인증 방식의 소셜로그인 도입 예정 작업물이다.

## STACK 및 Library or Framework

`nodeJS`,`ejs`,`express`,`http`,`https`,`passport`,`jsonwebtoken`,`mysql`,`mysql2`,`nodemon`,`qs`,

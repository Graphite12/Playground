# MVC 디자인 패턴으로 설계

MVC는 Model, View, Controller로 나뉘어, 소프트웨어 구조를 좀더 쉽게 유지하고 수정하기 위한 용도의 디자인 패턴이다.

개발 단계에서 `FrontEnd`와 `BackEnd` 서로 분리되어 개발할 경우에 적용한다.

## Model

모델은 내부 비즈니스 로직을 처리가히 위한 역할을 한다. 

## View

컨트롤러나 모델이 보여주고자 하는 모든 것을 사용자에게 보여주는 부분이다. 사용자가 특정
요청을 하게 될 경우 가공된 데이터와 작성된 로직을 거쳐 화면상으로 보여주는 역할이다.

## Controller

사용자의 요청이 들어오면 작성된 로직을 통해 `Model`이 어떻게 처리할지 알려주며, 가공된 데이터를 `Model`로부터 받아와 `View`에게 전달한다.

### Service

사실 현재 작성해 놓은 `Model`의 로직은 `Service`폴더내의 비즈니스 로직과 같다. 

요청한 데이터를 가공하는 부분을 담당하는 곳이 `Service`이며 `Model`은 DB의 모델을 구조화한 스키마라고 볼 수 있다.


### MiddleWares

`Express`공식 문서에선 요청(Request)과 응답(Response) 사이에서 특정 과정을 처리하는 함수라고 설명하는데 예를 들어 사용자가 로그인 이후 특정 서비스에 접근하려고 할때 인증된 사용자인지 확인이 필요하다.

이러한 절차를 가진 기능을 미들웨어라 하는데, 요청과 응답사이에서 각각의 기능들을 `MiddleWare`에 모아둔다. 

### Utils

의존성이 없는 모든 레이어에서 공통적으로 자주 사용되는 로직을 모듈화 해놓는 폴더이다.

# Boards

간단한 `CRUD`(HTTP RestAPI, GET POST PUT DELTE),(DB, SELECT, INSERT, UPDATE, DELETE)로 동작하는 게시판이며, 추가적으로 회원 요청 처리, OAuth 인증 방식의 소셜로그인 도입 예정 작업물이다.

## STACK 및 Library or Framework

`JavaScript`,`HTML`,`nodeJS`,`ejs`,`express`,`http`,`https`,`passport`,`jsonwebtoken`,`mysql`,`mysql2`,`nodemon`,`qs`,`method-override`,`socket.io`


# RDBMS는 아는데... NoSQL???

`MySQL`, `Oracle` 등등 특정 테이블과 관계를 형성하여 데이터 저장소로 사용할 때 주로 다루는 관계형 데이터베이스이다. 그런데 NoSQL이라고 하는 애들은 SQL을 사용하는 비관계형 데이터베이스, Not Only SQL 이라고한다.

NoSQL은 다음과 같은 특징을 가지고있다.

- 수평 확장 가능한 분산 아키텍쳐
- 완화된 ACID
- Schema-less

### 수평 확장 가능한 분산 아키텍쳐

MySQL도 수평확장이 가능한 Cluster라는 기능이 존재한다. 수평확장이란 대체 무엇인가?

현재의 Intel이나 AMD에서 설계하는 CPU의 물리적인 코어를 늘려 싱글코어 외의 멀티코어 성능을 향상시켜 효율적인 컴퓨팅 성능을 내듯이,

각 서버 노드(컴퓨터)를 늘려 하나의 노드에서 분담하던 작업을 여러대의 컴퓨터로 분산시키는 방법이 수평확장이다. 즉 컴퓨터를 여러대로 늘린다는 것이다.

NoSQL에선 RDBMS에 비해 효율적으로 가능하며, 데이터베이스 자체를 분할하는 작업인 `샤딩`을 진행한다.

즉 A지역에서 관리하는 데이터를 B지역에서도 따로 분할하여 A,B지역에 따로 관리하는 방식이다.

### 완화된 ACID

ACID란 무엇인가? `원자성`Atomicity, `일관성` Consistency, `독립성`Isolation,`지속성` Durability 을 뜻한다.

좀 복잡하지만, 데이터베이스의 트랜잭션이 안전하게 수행되는 것을 보장하기 위한 특성을 말한다. 즉 가능한 최대한 데이터의 안정성과 무결성을 보장해준다.

예를들어 중간에 정전이나 예기치못한 사고에도 데이터가 일부만 완료되는 일관적이지 않은 불상사를 사전에 예방해주는 개념이다.

NoSql은 BASE를 택하여 성능과 가용성을 우선시한다.

BASE의 특징은 다음과같다.

- 가용성 : 데이터는 항상 접근가능
- 독립성 : 노드의 상태는 외부에서 전송된 정보를 통해 상태를 결정
- 일관성 : 일정시간 경과 시 데이터의 일관성 유지

정형화된 스키마가 없으며, 속도와 가용성을 위해 일관성에 대한 약한 부분도 존재한다. 즉 데이터를 각각 유저가 같은 정보를 요청할 때 한쪽이 손실된 데이를 받아 볼 수 있는것이다. 즉 정해진 스키마가 존재하지 않거나 변경하는데 용이하다.

### Schema Less

NoSQL은 Schema가 없다. 가 아니라 테이블이라는 개념이 없다. RDBMS 데이터베이스는 `Create Table () Value()` 대신 `Collection`으로 구분짓고, `Document`안에 ` Key``Value ` 쌍으로 이루어진 객체를 저장한다.

# 인기쟁이 NoSQL, MongoDB

아무튼 NoSQl을 대충 알아봤으니 MongoDB를 어떻게 시작하고, 어떻게 사용하는지 속성과 용어는 무엇인지 알아보자

MERN 스택 4천왕 MongoDB, NoSQL의 대표이며, 자바스크립트를 사용하는 DB이다.

## MongoDB 설치하기

- 리눅스(Ubuntu20.04)

1. 공개 키 가져오기

```js
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
```

2. MongoDB 파일목록 생성
   `echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list`

3. 설치
   `sudo apt-get update`
   `sudo apt-get install -y mongodb-org`

- 맥(Mac)

1.  MongoDB brew Tool 설치
    `brew tap mongodb/brew `

2.  MongoDB 설치
    `brew install mongodb-community@5.0`

## MongoDB Community 시작하기!

### Linux

### MacOS

역시 무료버전인 Community가 낫다.

- 시작
  `brew services start mongodb-community@5.0`

- 중지
  `brew services stop mongodb-community@5.0`
- 백그라운드
  M1: `mongod --config /opt/homebrew/etc/mongod.conf --fork`

- 실행여부

  - 백그라운드 :`ps aux | grep -v grep | grep mongod`
  - MacOS : `brew services list`

- MongoDB 사용을 위한 mongosh

`mongosh` 혹은 `mongo`

## 간단한 명령어 (MongoShell 기준)

- MongoDB 연결
  `mongo mongodb://$[hostlist]/$[database]?authSource=$[authSource] --username $[username]`

- Switch Database
  `use test`

- 콜렉션 생성

- DB 리스트보기

- 현재 사용중인 DB보기

- DB 안 콜렉션들 보기

- 콜렉션 안 도큐먼트 보기

## CRUD Guide

- C(Insert)
  **One**

```js
db.inventory.insertOne({
  item: 'canvas',
  qty: 100,
  tags: ['cotton'],
  size: { h: 28, w: 35.5, uom: 'cm' },
});
```

**Many**

```js
db.inventory.insertMany([
  { item: 'journal', qty: 25, size: { h: 14, w: 21, uom: 'cm' }, status: 'A' },
  {
    item: 'notebook',
    qty: 50,
    size: { h: 8.5, w: 11, uom: 'in' },
    status: 'A',
  },
  { item: 'paper', qty: 100, size: { h: 8.5, w: 11, uom: 'in' }, status: 'D' },
  {
    item: 'planner',
    qty: 75,
    size: { h: 22.85, w: 30, uom: 'cm' },
    status: 'D',
  },
  {
    item: 'postcard',
    qty: 45,
    size: { h: 10, w: 15.25, uom: 'cm' },
    status: 'A',
  },
]);
```

- R(Read)

**One**

```js
myCursor = db.inventory.find({});
```

**Many**

```js
myCursor = db.inventory.find({ status: 'D' });

while (myCursor.hasNext()) {
  print(tojson(myCursor.next()));
}
```

- U(Update)

```js
db.inventory.insertOne({
  item: 'canvas',
  qty: 100,
  tags: ['cotton'],
  size: { h: 28, w: 35.5, uom: 'cm' },
});
```

- D(Delete)

```js
db.inventory.insertOne({
  item: 'canvas',
  qty: 100,
  tags: ['cotton'],
  size: { h: 28, w: 35.5, uom: 'cm' },
});
```

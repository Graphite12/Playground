# PK란?

PK는 Primary Key, 데이터베이스 행을 고유하게 식별하기 위한 필수적인 사항이다.

## PK 조건

- 유일한 값을 가져야함.
- NULL을 허용하지 않아야함.
- 데이터 변경이 발생하지 않아야함.
- int, bigInt 형태의 컬럼이어야함(Auto_increment)
- 유일한 컬럼이어야함.

## 복합키

복합키(Composite Key)는 두개 이상의 컬럼을 PK로 지정해놓는 것을 말한다.

즉, 2개이상의 컬럼을 조합하여 고유 키를 설정하는 것이다.

그러나 단일PK를 지정할때와 마찬가지로, 각 컬럼은 Unique해야한다.

- 복합키 설정

```js
Create Table(
   id int(7) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
   name VARCHAR(32),
   PRIMARY KEY(id, created_at)
)
```

## Primary Key 지정

1. 테이블 생성 시

- 단일키

- 복합키

2. 이미 테이블을 생성했을 때

- 단일키

- 복합키

3. 잘못 줬을 때

- 단일키

- 복합키

## UUID와 AUTO INCREMENT

## Insert 시 UUID() 적용

- 기본

```js
CREATE Table testID (
   uuid CHAR(36) PRIMARY_KEY,
   name VARCHAR(20) NOT NULL,
)

db.query()
db.excute()
```

- 최적화

```js
CREATE Table testID (
   uuid BINARY(16) PRIMARY_KEY,
   name VARCHAR(20) NOT NULL,
)
```

ref: ![블로그](https://estenpark.tistory.com/385)

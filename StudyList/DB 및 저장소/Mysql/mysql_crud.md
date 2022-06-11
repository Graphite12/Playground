# MySQL 라이브러리 명령어

# DB 명령어 종류

1. DDL, 데이터 정의어

- 테이블과 같은 데이터 구조를 정의하는데 쓰이는 명령어

  `CREATE`,`ALTER`,`DROP`, `RENAME`, `TRUNCATE`

2. DML, 데이터 조작어

- DB내의 들어있는 데이터를 조회, 수정 등을 하기위한 명령어
  `SELECT`,`INSERT`,`UPDATE`,`DELETE`

3. DCL, 데이터 제어어

   `GRANT`, `REVOKE`

4. TCL, 트랜잭션 제어어

## MYSQL CRUD Query 명령어

### DDL CRUD

- 테이블 생성

```js
CREATE Table (
 column property PRIMARY KEY AUTO_INCREMENT,
 column property NOT NULL, //Default NULL
 column property
 column property
)
```

- 테이블 수정

1. 컬럼 추가

```js
ALTER TABLE table_name ADD COLUMN column varchar(32) NOT NULL;
```

2. 컬럼 변경

```js
ALTER TABLE table_name MODIFY COLUMN column varchar(32) NOT NULL;
```

3. 컬럼 이름포함 변경

```js
ALTER TABLE table_name CHANGE COLUMN column1, column2 varchar(32) NOT NULL;
```

4. 컬럼 삭제

```js
ALTER TABLE table_name DROP COLUMN column varchar(32) NOT NULL;
```

5. 테이블 이름 변경

```js
ALTER TABLE table_name RENAME table_name2;
```

- 테이블 삭제

### DML

- Create

```js
INSERT INTO table_name (a, b, c, d) VALUES (?, ?, ?, ?)
INSERT INTO table_name SET ?
```

- Read

```js
SELECT * FROM table_name
SELECT field1, field2 FROM table_name WHERE fieldx
SELECT DISTINCT field FROM table_name
```

- Update

```js
UPDATE table_name SET field = data,

UPDATE table_name SET field = data, field1 = data1 WHERE field = data
```

- Delete

ref: ![티스토리 블로그1](https://extbrain.tistory.com/39),

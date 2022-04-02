# mysql

# mysql 과 mysql2 차이점

동일하다. 그러나 Mysql2는 TypeScript 로 작성되어있으며,

Promise를 지원한다는 점이 가장 큰 특징이다.

ES7의 Async/Await 구문을 지원하며, 비동기적으로 쉽게 구현이 가능하다.

## createPool 과 createConnection 차이

주로 여러 기초 예제에서 createConnection으로 특정 요소를 처리할때마다 커넥션을 생성해주고, 연결 후 쿼리문을 처리 한 뒤 연결을 끊는다. 마치 http 프로토콜 요청과 응답관계와 유사하다.

```js
mysql.createConnection => conn.connect() => conn.query() => conn.end()
```

보이는 바와 같이 개개인 사용자마다 연결을 맺고, 쿼리문을 처리하고, 연결을 끊는다. 로컬환경에서의 작은 프로젝트 같은 경우에는 사용해볼만 하지만 사용자가 많아지거나 하는 실제 어플리케이션에선 데이터 처리가 늘어날 수록 자원의 소모는 심해지고, 불필요한 통신이 많아지므로 비효율적이라 할 수 있다.

**CreatePool**

그래서 다수의 커넥션을 생성하여 Pool이라는 공간에 담아두었다가, 사용자의 요청이 들어오면 그대로 연결을 맺어주고, 쿼리문 처리가 끝나면 다시 pool로 반환하는데, 불필요한 자원 낭비도 줄일 뿐더러 보다 빠르고 쾌적한 데이터 처리목적이 강하다.

```js
mysql.createPool => [connectionPool]

pool.getConnection => conn.query() => conn.end()

=> [ConnectionPool]
```

대략 이런식의 흐름이다.

더 재밌는 방법이 있는데, Pool을 생성하고 아래처럼 작성하면 위의 3가지 동작을 한번에 처리할 수 있다.

`pool.query()`을 사용할 경우 `auto release`라고 등록 처리 반환이 자동적으로 이루어지지만, `getConnection()` 사용 시 반드시 `release()`로 풀에 반환해줘야한다.

```js
mysql.createpool;
pool.query() === getConnection() + query() + release();
```

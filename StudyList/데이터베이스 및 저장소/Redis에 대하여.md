# 메모리 스토리지 Redis

보통 개발자가 다양한, 거대한 데이터를 DB에 담아두기 마련이다 NoSQL이던 관계형이든간에 직접 물리디스크에 저장하고, 접근하여 정보를 가져온다.

하지만 서비스를 사용하는 사용자가 늘어나면 늘어날수록 기존 3티어, 즉 WEB, WAS(Web Application Server), Database 구조로는 한계에 부딪힌다 왜 그럴까?

DB는 물리 디스크에 직접 쓰기때문에 서버가 갑자기 죽어도 데이터는 날아가지 않는다. 하지만 사용자가 늘어나면 늘어날수록 데이터를 기록하고 가져오는 읽기/쓰기 작업이 늘어나게 되면서 부하가 많아져 결국 느려지기 마련이다.

그래서 캐시(Cache)서버를 도입하는 것을 검토하게 된다. 캐시는 정말 많이 나오는 용어인데 한번 읽어온 데이터를 임의의 공간에 저장하여 다음에 읽어올땐 빠르게 결과값을 받도록 도와주는 공간

즉, 임시 사본을 모아둔 공간을 말한다.

## 대충 자세한 동작원리

우선 클라이언트에서 특정 리소스를 요청하면, 웹 서버는 DB대신 먼저 Cache에 데이터가 있는지 확인 후, 존재한다면 바로 서버를 통해 클라이언트에게 전달하고, 존재하지 않다면 DB에 요청한다.

Cache에 데이터가 존재하여 바여 바로 클라이언트에게 반환하면 `Cache Hit`을 말하고ㅡ
그 반대는 `Cache miss`가 된다. DB에 요청하면 DB서버는 따로 데이터를 조회하여 결과를 반환하고, 이 데이터를 Cache에 저장 후 클라이언트에게 반환한다.

어디서 많이 본 구조 아닌가? CDN이든 DNS든 말그대로 임시 사본을 저장하는 서버라고 생각하면 쉬울것같다.

## 많이쓰이는 캐쉬서버 Redis

지금부터 내가 알아야할 건 Redis이다. 캐시서버를 구축하기 위한 오픈소스이며, 인-메모리 방식이다.

Redis는 `Key`-`Value` 기반의 `In-Memeory`데이터 저장소이다. 비휘발성인 보조기억장치에 저장하지 않고, 주기억장치 즉 램(RAM)에서 데이터를 처리하기 때문에 속도가 빠른 장점을 가지고 있다.

## Redis의 간단한 구조

MongoDB랑 비슷한 것 같은데 다양한 데이터 구조(Collection)를 제공한다.

- Strings : 단순한 Key-Value 매핑 구조이다.
- Lists : 배열[Array] 형식의 데이터 구조이다. 처음과 끝에 데이터를 넣고 뺴는 작업은 쉽다지만, 중간에 데이터를 삽입하는 행위는 어렵다고한다.
- Sets : 순서가 없는 Strings 데이터의 집합이다. 중복된 데이터는 하나로 처리하기 떄문에 중복에 대한 걱정은 없다.
- Stored Sets : Sets와 같은 구조이지만, 순서를 정할 수 있어 Leaderboard와 같은 기능을 구현할 수 있다.
- Hashes : Key-Value 값의 구조를 여러개 가진 Object 타입을 저장하기 좋은 구조이다.

# Redis를 어떻게 설치할까?

- MAC OS
  `brew install redis`

- Linux
  `sudo apt update`
  `sudo apt install redis`

```js
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

sudo apt-get update
sudo apt-get install redis
```

### Redis 시작 및 정지

- 백그라운드에서 서비스 시작
  `brew services start redis`

- 정보보기
  `brew services info redis`

- 서비스 중지
  `brew services stop redis`

- 레디스 연결(Common)
  `redis-cli`

## 레디스 서버는 잡았고, 클라이언트 설정

- Nodejs
  `Nodejs`는 NPM이라는 강력한 저장소를 가지고있다.

  `npm install redis` or `npm i redis`

# 출처

- 링크1 : https://www.zerocho.com/category/NodeJS/post/5a3238b714c5f9001b16c430
- 링크2 : https://redis.io/docs/libraries/
- 링크3 : https://brunch.co.kr/@jehovah/20

import redis from 'redis';

const client = redis.createClient();

/* String */
client.get('key', 'value');
client.get('key', (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data);
});

/* hash */
/**
 *  객체를 저장한다.
 * @hmset  설정
 * @hGetAll 가져오기
 */
client.method('key', { key: 'value' });
client.hmset('한글', '가', '가라고 읽는다', '다', '다라고 읽는다');
client.hGetAll('한글', (err, obj) => {
  console.log(obj); //{ 가: 가라고 읽는다, 다: 다라고 읽는다};
});

/* list */
/**
 * 키-배열이며, 중복 데이터 허용한다. 정말 많지만 대표적인 몇가지를 알아보자
 *
 * @rPush (key, [arr...]) : 자바스크립트의 Push와 동일
 * @lpush (key, [arr...]) : 자바스크립트의 unshift와 동일
 * @lrange (key, start, end, callback) : 자세한 설명 생략
 *
 */

client.rPush('key', 1, 2, 3, 4, 5);
client.lPush('key', 0, 5);
client.lRange('key', 0, -1, (err, arr) => {
  if (err) {
    console.log(err);
  }
  console.log(arr);
});

/* set */
/**
 * @sAdd (key, [arr..])
 * @sMember (key, Callback)
 */
client.sAdd('alphabet', 'a', 'a', 'b', 'a', 'b', 'c', 'd', 'e', 'f');
client.sMembers('alphabet', (err, arr) => {
  if (err) {
    console.log(err);
  }
  console.log(arr); // [a,b,c,d,e,f]
});
/* Stored set */

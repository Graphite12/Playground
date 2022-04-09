import { v4 as uuidV4 } from 'uuid';

const generateUUID = () => {
  const token = uuidV4().split('-');

  /**
   *  UUID를 V4로 생성하게 되면 기본 16진수의 문자열 + '-'으로 이루어져
   *
   *  String 형태로 저장된다.
   *
   *  총 36자의 크기로, DB에서 PK로 지정할 경우에는 결국 메모리에 담지 못할정도로
   *
   *  인덱스가 커지게된다. 그러나 UUID는 고유한 값으로 여전히 선호하는 방식이기 떄문에
   *
   *  효율 적으로 저장하고 관리하는 방법을 아래 링크를 통해서 배워보자
   *
   * 링크1- https://www.percona.com/blog/2014/12/19/store-uuid-optimized-way/
   * 링크2- https://jane-aeiou.tistory.com/59
   */

  return token[2] + token[1] + token[0] + token[3] + token[4];
};

export default generateUUID;

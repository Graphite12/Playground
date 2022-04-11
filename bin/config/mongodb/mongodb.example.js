import { MongoClient, ServerApiVersion } from 'mongodb';

console.log(MongoClient);
console.log(ServerApiVersion.v1);

async function main() {
  /* Atals Cluster  */

  const uri = `mongodb+srv://Elitebook:<password>@testcluster.nh1zw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  /* MongoDB 시작 */

  /* MongoDB 인스턴스 생성 */

  /**
   * MongoDB Instance
   *
   * new MongoClient(uri, {optoion})
   */
  const client = new MongoClient(uri, {
    useNewUrlParser: true, // 설명
    useUnifiedTopology: true, // 설명
    serverApi: ServerApiVersion.v1,
  });

  /* MongoDB Atlas 연결 */

  try {
    await client.connect((err) => {
      const collection = client.db('test').collection('devices');

      client.close();
    });
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

/* ====================== MongoDB CRUD ====================== */

/* Create */

// 데이터 하나씩 추가
const createListing = async (client, newListing) => {
  const reuslt = await client
    .db('sample_shop')
    .collection('listingProducts')
    .insertOne(newListing);
};

// 데이터 여러개 동시에 추가
const createMultipleListing = async (client, newListing) => {
  const result = await client
    .db('sample_shop')
    .collection('listingProducts')
    .insertMany(newListing);
};

/* Read */

/* Update */

/* Delete */

import { ObjectId, MongoClient } from "mongodb";
import { id, Repository } from "mongodb-typescript";

class ReproduceBug {
  @id
  _id: ObjectId;

  aTimeout: NodeJS.Timeout;

  initTimeout() {
    this.aTimeout = setTimeout(() => {
      console.log("1 second");
    }, 1000);
  }
}

async function repro() {
  const client = await MongoClient.connect(
    "mongodb://localhost:27017/repro_bug",
    {
      useNewUrlParser: true
    }
  );

  const buggy = new ReproduceBug();
  buggy.initTimeout();

  console.dir(buggy);

  const repository = new Repository<ReproduceBug>(
    ReproduceBug,
    client,
    "items"
  );

  await repository.insert(buggy);
}

repro();

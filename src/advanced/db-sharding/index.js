const app = require("express")();
const { Pool } = require("pg");
const HashRing = require("hashring");
const crypto = require("crypto");

// create consistent hashing instance and add 3 database ports
const hr = new HashRing();
hr.add("5432");
hr.add("5433");
hr.add("5434");

// create postgres client for 3 shards
const pools = {
  5432: new Pool({
    host: "172.17.0.2",
    port: "5432",
    user: "postgres",
    password: "postgres",
    database: "postgres",
  }),

  5433: new Pool({
    host: "172.17.0.3",
    port: "5433",
    user: "postgres",
    password: "postgres",
    database: "postgres",
  }),

  5434: new Pool({
    host: "172.17.0.4",
    port: "5434",
    user: "postgres",
    password: "postgres",
    database: "postgres",
  }),
};

// Now connect the three database servers
async function queryShard(shard, query, values) {
  const client = await pools[shard].connect();
  const result = await client.query(query, values);
  client.release();
  return result;
}

// Write to sharded database

app.post("/", async (req, res) => {
  const url = req.query.url;
  const hash = crypto.createHash("sha256").update(url).digest("base64");
  const urlId = hash.substring(0, 5);
  const server = hr.get(urlId);

  console.log(server);

  await queryShard(
    server,
    "INSERT INTO url_table (url, url_id) VALUES($1,$2)",
    [url, urlId]
  );

  res.send({
    urlId: urlId,
    url: url,
    server: server,
  });
});

// Read from sharded database

app.get("/:urlId", async (req, res) => {
  const urlId = req.params.urlId;
  const server = hr.get(urlId);
  const result = await queryShard(
    server,
    "SELECT * FROM URL_TABLE WHERE URL_ID = $1",
    [urlId]
  );
  if (result.rowCount > 0) {
    res.send({
      urlId: result.url_id,
      url: result.url,
      server: server,
    });
  } else {
    res.sendStatus(404);
  }
});

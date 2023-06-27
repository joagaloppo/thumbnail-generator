import express, { Request, Response } from "express";
import serverless from "serverless-http";
import bodyParser from "body-parser";
import AWS from "aws-sdk";

const app = express();
const router = express.Router();

router.use(bodyParser.json({ strict: false }));

const USERS_TABLE = process.env.USERS_TABLE;
if (!USERS_TABLE) throw new Error("USERS_TABLE not set");
const IS_OFFLINE = process.env.IS_OFFLINE;
let dynamoDb: AWS.DynamoDB.DocumentClient;
if (IS_OFFLINE === "true") {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: "localhost",
    endpoint: "http://localhost:8000",
  });
  console.log(dynamoDb);
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient();
}

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

router.get("/is-offline", (req: Request, res: Response) => {
  res.json({ message: "Is offline: " + IS_OFFLINE });
});

router.get("/users", function (req, res) {
  const params = {
    TableName: USERS_TABLE,
  };

  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error: "Could not get users" });
    }
    if (result.Items) {
      return res.json(result.Items);
    } else {
      return res.status(404).json({ error: "No users found" });
    }
  });
});

router.get("/users/:userId", function (req, res) {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error: "Could not get user" });
    }
    if (result.Item) {
      const { userId, name } = result.Item;
      return res.json({ userId, name });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  });
});

router.post("/users", function (req, res) {
  const { userId, name } = req.body;
  if (typeof userId !== "string") {
    return res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== "string") {
    return res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId: userId,
      name: name,
    },
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error: "Could not create user" });
    }
    return res.json({ userId, name });
  });
});

app.use("/", router);

export const handler = serverless(app);

import AWS from "aws-sdk";
import config from "../config/config";

const { isOffline } = config;

let db: AWS.DynamoDB.DocumentClient;

if (isOffline === "true") {
  db = new AWS.DynamoDB.DocumentClient({
    region: "localhost",
    endpoint: "http://localhost:8000",
  });
} else {
  db = new AWS.DynamoDB.DocumentClient();
}

export default db;

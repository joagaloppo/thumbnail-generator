import AWS from 'aws-sdk';
import config from './config';

const { isOffline } = config;

const db: AWS.DynamoDB.DocumentClient =
  isOffline === 'true'
    ? new AWS.DynamoDB.DocumentClient({
        endpoint: 'http://localhost:8000',
        region: 'us-east-1',
      })
    : new AWS.DynamoDB.DocumentClient();

export default db;

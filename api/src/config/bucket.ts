import AWS from 'aws-sdk';
import config from './config';

const { isOffline } = config;

const s3: AWS.S3 =
  isOffline === 'true'
    ? new AWS.S3({
        endpoint: 'http://localhost:4566',
        s3ForcePathStyle: true,
        accessKeyId: 'test',
        secretAccessKey: 'test',
        region: 'us-east-1',
      })
    : new AWS.S3();

export default s3;

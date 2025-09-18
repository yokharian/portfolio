import * as s3 from 'aws-cdk-lib/aws-s3';
import { defineBackend } from '@aws-amplify/backend';
import { storage } from './storage/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  storage
});


/**
 * @see https://docs.amplify.aws/react/build-a-backend/storage/extend-s3-resources/ to extend the S3 bucket
 */
const s3Bucket = backend.storage.resources.bucket;
const cfnBucket = s3Bucket.node.defaultChild as s3.CfnBucket;
console.log("Bucket name: ", cfnBucket.bucketName);
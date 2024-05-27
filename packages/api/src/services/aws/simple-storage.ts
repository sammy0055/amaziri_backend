import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectsCommand,
  DeleteObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getEnv } from "../../helpers/getEnv";
export class ManageS3Storage {
  protected client: S3Client;
  protected bucketName: string;
  constructor() {
    this.client = new S3Client({
      region: getEnv("AWS_REGION"),
      credentials: {
        secretAccessKey: getEnv("BEDROCK_AWS_SECRET_ACCESS_KEY"),
        accessKeyId: getEnv("BEDROCK_AWS_ACCESS_KEY_ID"),
      },
    });

    this.bucketName = "amaziri-rest-bucket";
  }
  createPresignedUrl = async (key: string, documentId: string) => {
    const input = {
      Bucket: this.bucketName,
      Key: key,
      Metadata: { documentId },
    };

    const command = new PutObjectCommand(input);
    return getSignedUrl(this.client, command, { expiresIn: 3600 });
  };

  downloadPresignedUrl = async (key: string) => {
    const command = new GetObjectCommand({ Bucket: this.bucketName, Key: key });
    return getSignedUrl(this.client, command, { expiresIn: 3600 });
  };

  deleteObject = async (key: string) => {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    return await this.client.send(command);
  };

  deleteObjects = async (keys: string[]) => {
    const Keys = keys.map((key) => {
      return { Key: key };
    });
    const input = {
      Bucket: this.bucketName,
      Delete: {
        Objects: Keys,
      },
    };
    const command = new DeleteObjectsCommand(input);
    return await this.client.send(command);
  };
}

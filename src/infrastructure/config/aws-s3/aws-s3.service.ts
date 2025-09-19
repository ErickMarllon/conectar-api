import {
  GetBase64ImageOutput,
  IAwsService,
  UploadInput,
} from '@/domain/contracts/gateways/awss3';
import {
  DeleteObjectCommand,
  DeleteObjectRequest,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { AwsConfig } from '../types/aws-config.type';

@Injectable()
export class AwsS3Service implements IAwsService {
  private readonly s3: S3Client;
  private readonly bucket: string;

  constructor(configService: ConfigService) {
    const AwsConfig = configService.getOrThrow<AwsConfig>('aws');

    this.bucket = AwsConfig.bucket;

    //aws
    // this.s3 = new S3Client({
    //   region: AwsConfig.region,
    //   credentials: {
    //     accessKeyId: AwsConfig.accessKeyId,
    //     secretAccessKey: AwsConfig.secretAccessKey,
    //   },
    // });

    //backblaze
    this.s3 = new S3Client({
      endpoint: 'https://s3.us-east-005.backblazeb2.com',
      region: AwsConfig.region,
      credentials: {
        accessKeyId: AwsConfig.accessKeyId,
        secretAccessKey: AwsConfig.secretAccessKey,
      },
    });
  }

  async getImage(path?: string): Promise<string | undefined> {
    if (!path) {
      return;
    }
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: path,
    });

    const oneDayInSeconds = 86400;
    const url = await getSignedUrl(this.s3, command, {
      expiresIn: oneDayInSeconds,
    });
    return url;
  }

  async getBase64Image(path: string): Promise<GetBase64ImageOutput> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: path,
    });

    const response = await this.s3.send(command);

    const img = await response.Body?.transformToString('base64');

    return {
      path,
      img,
    };
  }

  async upload(input: UploadInput) {
    try {
      const uploadParams: PutObjectCommandInput = {
        Bucket: this.bucket,
        Key: input.key,
        Body: input.buffer,
        ContentType: input.contentType,
        ACL: 'private',
      };
      await this.s3.send(new PutObjectCommand(uploadParams));
    } catch (_error) {}
  }

  async delete(key?: string): Promise<void> {
    if (!key) return;
    const uploadParams: DeleteObjectRequest = {
      Bucket: this.bucket,
      Key: key,
    };
    await this.s3.send(new DeleteObjectCommand(uploadParams));
  }
}

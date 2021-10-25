import { Injectable } from '@nestjs/common';

import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import sharp from 'sharp';

import { UtilService } from 'src/util/util.service';

import internal from 'stream';

@Injectable()
export class MediaService {
  private readonly AWS_S3_BUCKET_REGION: string;
  private readonly AWS_S3_BUCKET_NAME: string;
  private readonly AWS_S3_ACCESS_KEY: string;
  private readonly AWS_S3_SECRET_ACCESS_KEY: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly util: UtilService,
  ) {
    this.AWS_S3_BUCKET_REGION = this.configService.get('AWS_S3_BUCKET_REGION');
    this.AWS_S3_BUCKET_NAME = this.configService.get('AWS_S3_BUCKET_NAME');
    this.AWS_S3_ACCESS_KEY = this.configService.get('AWS_S3_ACCESS_KEY');
    this.AWS_S3_SECRET_ACCESS_KEY = this.configService.get(
      'AWS_S3_SECRET_ACCESS_KEY',
    );
  }
  protected createS3Client(): S3 {
    return new S3({
      region: this.AWS_S3_BUCKET_REGION,
      accessKeyId: this.AWS_S3_ACCESS_KEY,
      secretAccessKey: this.AWS_S3_SECRET_ACCESS_KEY,
    });
  }
  public async uploadFile(
    file: Express.Multer.File,
    imageType?: string,
  ): Promise<unknown> {
    const s3Client = this.createS3Client();
    const randomHash = this.util.createRandomHash();

    //process image before uploading
    let processedImage: Buffer;

    switch (imageType) {
      case 'profile':
        processedImage = await sharp(file.buffer).resize(250, 250).toBuffer();
        break;

      case 'post':
        processedImage = await sharp(file.buffer).resize(500, 500).toBuffer();
        break;

      case 'background':
        processedImage = await sharp(file.buffer).resize(900, 1600).toBuffer();
        break;

      default:
        processedImage = await sharp(file.buffer).resize(500, 500).toBuffer();
        break;
    }

    const uploadParams = {
      Bucket: this.AWS_S3_BUCKET_NAME,
      Body: processedImage,
      Key: `media-fse-${randomHash}-${file.originalname}`,
    };
    try {
      return new Promise((resolve, reject) => {
        s3Client.upload(uploadParams, (err: Error, data: any) => {
          if (err) {
            reject(err.message);
          }
          resolve(data);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  public downloadFile(fileKey: string): internal.Readable {
    const s3Client = this.createS3Client();
    const downloadParams = { Key: fileKey, Bucket: this.AWS_S3_BUCKET_NAME };
    return s3Client.getObject(downloadParams).createReadStream();
  }

  public async deleteFile(fileKey: string): Promise<void> {
    const s3Client = this.createS3Client();
    const deleteParams = {
      Key: fileKey,
      Bucket: this.AWS_S3_BUCKET_NAME,
    };
    console.log(deleteParams);
    await s3Client.deleteObject(deleteParams).promise();
  }
}

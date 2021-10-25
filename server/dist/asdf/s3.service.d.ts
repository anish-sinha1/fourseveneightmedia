/// <reference types="multer" />
/// <reference types="node" />
import S3 from 'aws-sdk/clients/s3';
import { ConfigService } from '@nestjs/config';
import internal from 'stream';
export declare class S3Service {
    private readonly configService;
    private readonly s3Client;
    private readonly AWS_S3_BUCKET_NAME;
    constructor(s3Client: S3, configService: ConfigService);
    uploadFile(file: Express.Multer.File): void;
    downloadFile(fileKey: string): internal.Readable;
    deleteFile(fileKey: string): void;
}

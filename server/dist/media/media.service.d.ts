/// <reference types="multer" />
/// <reference types="node" />
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { UtilService } from 'src/util/util.service';
import internal from 'stream';
export declare class MediaService {
    private readonly configService;
    private readonly util;
    private readonly AWS_S3_BUCKET_REGION;
    private readonly AWS_S3_BUCKET_NAME;
    private readonly AWS_S3_ACCESS_KEY;
    private readonly AWS_S3_SECRET_ACCESS_KEY;
    constructor(configService: ConfigService, util: UtilService);
    protected createS3Client(): S3;
    uploadFile(file: Express.Multer.File, imageType?: string): Promise<unknown>;
    downloadFile(fileKey: string): internal.Readable;
    deleteFile(fileKey: string): Promise<void>;
}

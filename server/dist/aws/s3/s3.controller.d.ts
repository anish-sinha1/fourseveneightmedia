/// <reference types="multer" />
import { S3Service } from './s3.service';
export declare class S3Controller {
    private readonly service;
    constructor(service: S3Service);
    getObject(fileKey: string): void;
    putObject(file: Express.Multer.File): void;
    deleteObject(): void;
}

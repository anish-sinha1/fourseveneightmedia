/// <reference types="multer" />
/// <reference types="node" />
import internal from 'stream';
import { Response } from 'express';
import { MediaService } from './media.service';
export declare class MediaController {
    private readonly service;
    constructor(service: MediaService);
    uploadFile(file: Express.Multer.File): void;
    downloadFile(fileKey: string, res: Response): internal.Readable;
    deleteFile(fileKey: string): Promise<void>;
}

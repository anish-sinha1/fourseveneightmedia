"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const nestjs_s3_1 = require("@ntegral/nestjs-s3");
const s3_1 = require("aws-sdk/clients/s3");
const config_1 = require("@nestjs/config");
const fs_1 = require("fs");
let S3Service = class S3Service {
    constructor(s3Client, configService) {
        this.configService = configService;
        this.s3Client = s3Client;
        this.AWS_S3_BUCKET_NAME = this.configService.get('AWS_S3_BUCKET_NAME');
    }
    uploadFile(file) {
        const fileStream = fs_1.default.createReadStream(file.path);
        const uploadParams = {
            Bucket: this.AWS_S3_BUCKET_NAME,
            Body: fileStream,
            Key: `media-fse-${file.filename}`,
        };
        this.s3Client.upload(uploadParams).promise();
    }
    downloadFile(fileKey) {
        const downloadParams = {
            Key: fileKey,
            Bucket: this.AWS_S3_BUCKET_NAME,
        };
        return this.s3Client.getObject(downloadParams).createReadStream();
    }
    deleteFile(fileKey) {
        const deleteParams = {
            Bucket: this.AWS_S3_BUCKET_NAME,
            Key: fileKey,
        };
        this.s3Client.deleteObject(deleteParams);
    }
};
S3Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_s3_1.InjectS3)()),
    __metadata("design:paramtypes", [s3_1.default,
        config_1.ConfigService])
], S3Service);
exports.S3Service = S3Service;
//# sourceMappingURL=s3.service.js.map
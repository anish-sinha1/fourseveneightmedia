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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
const config_1 = require("@nestjs/config");
const sharp_1 = __importDefault(require("sharp"));
const util_service_1 = require("../util/util.service");
let MediaService = class MediaService {
    constructor(configService, util) {
        this.configService = configService;
        this.util = util;
        this.AWS_S3_BUCKET_REGION = this.configService.get('AWS_S3_BUCKET_REGION');
        this.AWS_S3_BUCKET_NAME = this.configService.get('AWS_S3_BUCKET_NAME');
        this.AWS_S3_ACCESS_KEY = this.configService.get('AWS_S3_ACCESS_KEY');
        this.AWS_S3_SECRET_ACCESS_KEY = this.configService.get('AWS_S3_SECRET_ACCESS_KEY');
    }
    createS3Client() {
        return new aws_sdk_1.S3({
            region: this.AWS_S3_BUCKET_REGION,
            accessKeyId: this.AWS_S3_ACCESS_KEY,
            secretAccessKey: this.AWS_S3_SECRET_ACCESS_KEY,
        });
    }
    async uploadFile(file, imageType) {
        const s3Client = this.createS3Client();
        const randomHash = this.util.createRandomHash();
        let processedImage;
        switch (imageType) {
            case 'profile':
                processedImage = await (0, sharp_1.default)(file.buffer).resize(250, 250).toBuffer();
                break;
            case 'post':
                processedImage = await (0, sharp_1.default)(file.buffer).resize(500, 500).toBuffer();
                break;
            case 'background':
                processedImage = await (0, sharp_1.default)(file.buffer).resize(900, 1600).toBuffer();
                break;
            default:
                processedImage = await (0, sharp_1.default)(file.buffer).resize(500, 500).toBuffer();
                break;
        }
        const uploadParams = {
            Bucket: this.AWS_S3_BUCKET_NAME,
            Body: processedImage,
            Key: `media-fse-${randomHash}-${file.originalname}`,
        };
        try {
            return new Promise((resolve, reject) => {
                s3Client.upload(uploadParams, (err, data) => {
                    if (err) {
                        reject(err.message);
                    }
                    resolve(data);
                });
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    downloadFile(fileKey) {
        const s3Client = this.createS3Client();
        const downloadParams = { Key: fileKey, Bucket: this.AWS_S3_BUCKET_NAME };
        return s3Client.getObject(downloadParams).createReadStream();
    }
    async deleteFile(fileKey) {
        const s3Client = this.createS3Client();
        const deleteParams = {
            Key: fileKey,
            Bucket: this.AWS_S3_BUCKET_NAME,
        };
        console.log(deleteParams);
        await s3Client.deleteObject(deleteParams).promise();
    }
};
MediaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        util_service_1.UtilService])
], MediaService);
exports.MediaService = MediaService;
//# sourceMappingURL=media.service.js.map
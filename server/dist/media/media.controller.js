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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const stream_1 = __importDefault(require("stream"));
const platform_express_1 = require("@nestjs/platform-express");
const media_service_1 = require("./media.service");
const auth0_guard_1 = require("../auth0/auth0.guard");
let MediaController = class MediaController {
    constructor(service) {
        this.service = service;
    }
    uploadFile(file) {
        this.service.uploadFile(file);
    }
    downloadFile(fileKey, res) {
        const readStream = this.service.downloadFile(fileKey);
        if (readStream)
            return readStream
                .on('data', (data) => {
                res.write(data);
            })
                .on('end', () => readStream.pipe(res))
                .on('error', () => res.end());
    }
    async deleteFile(fileKey) {
        await this.service.deleteFile(fileKey);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(':fileKey'),
    __param(0, (0, common_1.Param)('fileKey')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", stream_1.default.Readable)
], MediaController.prototype, "downloadFile", null);
__decorate([
    (0, common_1.Delete)(':fileKey'),
    __param(0, (0, common_1.Param)('fileKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "deleteFile", null);
MediaController = __decorate([
    (0, common_1.Controller)('api/media'),
    __metadata("design:paramtypes", [media_service_1.MediaService])
], MediaController);
exports.MediaController = MediaController;
//# sourceMappingURL=media.controller.js.map
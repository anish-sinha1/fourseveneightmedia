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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = __importDefault(require("../prisma/prisma.service"));
let ProfileService = class ProfileService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createProfile(data) {
        return this.prisma.profile.create({ data });
    }
    async getProfile(username) {
        const profile = await this.prisma.profile.findFirst({
            where: { username },
        });
        return profile;
    }
    async getProfiles(profileIds) {
        const profiles = profileIds.map((profileId) => this.prisma.profile.findFirst({ where: { profile_id: profileId } }));
        return Promise.all(profiles);
    }
    async editProfile(profile_id, data) {
        const profile = await this.prisma.profile.findFirst({
            where: { profile_id },
        });
        if (profile)
            await this.prisma.profile.update({
                where: { profile_id },
                data: Object.assign({}, data),
            });
        return profile;
    }
    async deleteProfile(user_id) {
        const profile = await this.prisma.profile.findFirst({ where: { user_id } });
        if (!profile)
            throw new common_1.HttpException('Profile not found', 404);
        await this.prisma.profile.update({
            where: { profile_id: profile.profile_id },
            data: { deleted: true },
        });
    }
};
ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.default])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map
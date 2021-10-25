"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const profile_controller_1 = require("./profile/profile.controller");
const profile_service_1 = require("./profile/profile.service");
const profile_module_1 = require("./profile/profile.module");
const auth0_module_1 = require("./auth0/auth0.module");
const media_controller_1 = require("./media/media.controller");
const media_service_1 = require("./media/media.service");
const util_service_1 = require("./util/util.service");
const media_module_1 = require("./media/media.module");
const prisma_service_1 = __importDefault(require("./prisma/prisma.service"));
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [auth0_module_1.Auth0Module, config_1.ConfigModule.forRoot(), profile_module_1.ProfileModule, media_module_1.MediaModule],
        controllers: [app_controller_1.AppController, profile_controller_1.ProfileController, media_controller_1.MediaController],
        providers: [
            app_service_1.AppService,
            prisma_service_1.default,
            profile_service_1.ProfileService,
            media_service_1.MediaService,
            util_service_1.UtilService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
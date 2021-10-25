import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class Auth0Guard implements CanActivate {
    private configService;
    private AUTH0_AUDIENCE;
    private AUTH0_DOMAIN;
    constructor(configService: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

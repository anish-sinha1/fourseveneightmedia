import { Module } from '@nestjs/common';
import { Auth0Guard } from './auth0.guard';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [Auth0Guard],
})
export class Auth0Module {}

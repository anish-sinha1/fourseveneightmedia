import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';
import { ProfileModule } from './profile/profile.module';

import { Auth0Module } from './auth0/auth0.module';
import { MediaController } from './media/media.controller';
import { MediaService } from './media/media.service';
import { UtilService } from './util/util.service';
import { MediaModule } from './media/media.module';

import PrismaService from './prisma/prisma.service';

@Module({
  imports: [Auth0Module, ConfigModule.forRoot(), ProfileModule, MediaModule],
  controllers: [AppController, ProfileController, MediaController],
  providers: [
    AppService,
    PrismaService,
    ProfileService,
    MediaService,
    UtilService,
  ],
})
export class AppModule {}

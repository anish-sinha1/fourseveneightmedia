import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UtilService } from 'src/util/util.service';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';

@Module({
  controllers: [MediaController],
  providers: [MediaService, UtilService, ConfigService],
})
export class MediaModule {}

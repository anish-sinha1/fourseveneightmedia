import {
  Get,
  Param,
  Post,
  UseInterceptors,
  UploadedFile,
  Controller,
  UseGuards,
  Res,
  Delete,
} from '@nestjs/common';

import internal from 'stream';

import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

import { MediaService } from './media.service';
import { Auth0Guard } from 'src/auth0/auth0.guard';

@Controller('api/media')
export class MediaController {
  private readonly service: MediaService;
  constructor(service: MediaService) {
    this.service = service;
  }

  @Post()
  //   @UseGuards(Auth0Guard)
  @UseInterceptors(FileInterceptor('file'))
  public uploadFile(@UploadedFile() file: Express.Multer.File): void {
    this.service.uploadFile(file);
  }

  @Get(':fileKey')
  public downloadFile(
    @Param('fileKey') fileKey: string,
    @Res() res: Response,
  ): internal.Readable {
    const readStream: internal.Readable = this.service.downloadFile(fileKey);
    if (readStream)
      return readStream
        .on('data', (data) => {
          res.write(data);
        })
        .on('end', () => readStream.pipe(res))
        .on('error', () => res.end());
  }
  @Delete(':fileKey')
  public async deleteFile(@Param('fileKey') fileKey: string): Promise<void> {
    await this.service.deleteFile(fileKey);
  }
}

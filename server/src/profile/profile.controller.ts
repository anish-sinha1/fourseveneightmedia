import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  UseGuards,
  HttpException,
} from '@nestjs/common';

import { Auth0Guard } from 'src/auth0/auth0.guard';
import { ProfileService } from './profile.service';
import { UserObject } from './interfaces/new-profile.interface';

import { profile as ProfileDocument } from '@prisma/client';

@Controller('api/profile')
export class ProfileController {
  private service: ProfileService;
  constructor(service: ProfileService) {
    this.service = service;
  }
  @Get(':username')
  public async getProfile(
    @Param('username') username: string,
  ): Promise<ProfileDocument> {
    const profile = await this.service.getProfile(username);
    if (!profile) throw new HttpException('Profile not found', 404);
    return profile;
  }

  @Get() public async getProfiles(@Body() profileIds: number[]) {
    if (profileIds.length < 1)
      throw new HttpException('No profiles found', 404);
    const profiles = await this.service.getProfiles(profileIds);
    return profiles;
  }

  @Post()
  @UseGuards(Auth0Guard)
  public async createProfile(
    @Body() newProfileParams: UserObject,
  ): Promise<ProfileDocument> {
    const profile = await this.service.getProfile(newProfileParams.username);
    if (profile) return;
    const newProfile = await this.service.createProfile(newProfileParams);
    return newProfile;
  }

  @Patch()
  @UseGuards(Auth0Guard)
  public async updateProfile(
    @Body() updateProfileParams: UserObject,
    userId: string,
  ): Promise<ProfileDocument> {
    const profile = await this.service.getProfile(userId);
    if (!profile) throw new HttpException('Profile not found', 404);
    const newProfile = await this.service.editProfile(
      profile.profile_id,
      updateProfileParams,
    );
    return newProfile;
  }

  // @Delete()
  // @UseGuards(Auth0Guard)
  // public async deleteProfile(@)
}

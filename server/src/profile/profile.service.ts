import { HttpException, Injectable } from '@nestjs/common';

import PrismaService from '../prisma/prisma.service';
import { profile as ProfileDocument, Prisma } from '@prisma/client';

@Injectable()
export class ProfileService {
  private prisma: PrismaService;
  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  //create a new profile
  public async createProfile(
    data: Prisma.profileCreateInput,
  ): Promise<ProfileDocument> {
    return this.prisma.profile.create({ data });
  }

  //get an existing profile
  public async getProfile(username: string): Promise<ProfileDocument> {
    const profile = await this.prisma.profile.findFirst({
      where: { username },
    });
    return profile;
  }

  //get an array of profiles
  public async getProfiles(profileIds: number[]): Promise<ProfileDocument[]> {
    const profiles = profileIds.map((profileId: number) =>
      this.prisma.profile.findFirst({ where: { profile_id: profileId } }),
    );
    return Promise.all(profiles);
  }

  //update an existing profile
  public async editProfile(
    profile_id: number,
    data: Prisma.profileUpdateInput,
  ): Promise<ProfileDocument> {
    const profile = await this.prisma.profile.findFirst({
      where: { profile_id },
    });

    if (profile)
      await this.prisma.profile.update({
        where: { profile_id },
        data: { ...data },
      });

    return profile;
  }

  //delete an existing profile
  public async deleteProfile(user_id: string): Promise<void> {
    const profile = await this.prisma.profile.findFirst({ where: { user_id } });
    if (!profile) throw new HttpException('Profile not found', 404);
    await this.prisma.profile.update({
      where: { profile_id: profile.profile_id },
      data: { deleted: true } as Prisma.profileWhereUniqueInput,
    });
  }
}

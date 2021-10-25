import PrismaService from '../prisma/prisma.service';
import { profile as ProfileDocument, Prisma } from '@prisma/client';
export declare class ProfileService {
    private prisma;
    constructor(prisma: PrismaService);
    createProfile(data: Prisma.profileCreateInput): Promise<ProfileDocument>;
    getProfile(username: string): Promise<ProfileDocument>;
    getProfiles(profileIds: number[]): Promise<ProfileDocument[]>;
    editProfile(profile_id: number, data: Prisma.profileUpdateInput): Promise<ProfileDocument>;
    deleteProfile(user_id: string): Promise<void>;
}

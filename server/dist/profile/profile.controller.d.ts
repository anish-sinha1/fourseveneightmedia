import { ProfileService } from './profile.service';
import { UserObject } from './interfaces/new-profile.interface';
import { profile as ProfileDocument } from '@prisma/client';
export declare class ProfileController {
    private service;
    constructor(service: ProfileService);
    getProfile(username: string): Promise<ProfileDocument>;
    getProfiles(profileIds: number[]): Promise<ProfileDocument[]>;
    createProfile(newProfileParams: UserObject): Promise<ProfileDocument>;
    updateProfile(updateProfileParams: UserObject, userId: string): Promise<ProfileDocument>;
}

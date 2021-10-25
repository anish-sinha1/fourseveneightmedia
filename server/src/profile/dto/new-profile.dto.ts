export class CreateProfileDto {
  readonly username: string;
  readonly bio: string;
  readonly spaces: string[];
  readonly user_id: string;
  readonly followers: string[];
  readonly following: string[];
  readonly picture: string;
  readonly email: string;
  readonly email_verified: string;
}

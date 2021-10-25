export default class CreatePostDto {
    readonly title: string;
    readonly summary: string;
    readonly content: string;
    readonly imageUri: string;
    readonly imageAlt: string;
    readonly category: string;
    readonly tags: string[];
}

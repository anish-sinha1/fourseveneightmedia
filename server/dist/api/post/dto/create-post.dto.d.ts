export default class CreatePostDto {
    readonly title: string;
    readonly content: string;
    readonly summary: string;
    readonly imageAlt: string;
    readonly imageUri: string;
    readonly category: string;
    readonly tags: string[];
    readonly likes: number;
}

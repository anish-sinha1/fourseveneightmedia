export default interface PostObject {
    postId: number;
    title: string;
    content: string;
    createdAt: Date;
    deleted: boolean;
    imageUri: string;
    imageAlt: string;
    slug: string;
    summary: string;
    category: string;
    tags: string[];
    userId: string;
}

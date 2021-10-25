import PrismaService from '../prisma/prisma.service';
import { post as PostDocument, Prisma } from '@prisma/client';
export default class PostService {
    private prisma;
    constructor(prisma: PrismaService);
    createPost(data: Prisma.postCreateInput): Promise<PostDocument>;
}

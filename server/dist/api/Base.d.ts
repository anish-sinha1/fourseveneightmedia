import { Request, Response } from 'express';
export interface BaseController {
    create: (req: Request, res: Response) => void;
    get: (req: Request, res: Response) => void;
    getAll: (req: Request, res: Response) => void;
    read: (req: Request, res: Response) => void;
    update: (req: Request, res: Response) => void;
    delete: (req: Request, res: Response) => void;
}
export default abstract class Base implements BaseController {
    abstract create(req: Request, res: Response): void;
    abstract get(req: Request, res: Response): void;
    abstract getAll(req: Request, res: Response): void;
    abstract read(req: Request, res: Response): void;
    abstract update(req: Request, res: Response): void;
    abstract delete(req: Request, res: Response): void;
}

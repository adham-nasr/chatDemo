import type { Response } from 'express';
import type { AuthenticatedRequest } from '../types.js';
export declare const createGroup: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getGroups: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const joinGroup: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=group.controller.d.ts.map
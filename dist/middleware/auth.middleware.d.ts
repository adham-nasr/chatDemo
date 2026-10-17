import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../types.js';
export declare const authenticate: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.middleware.d.ts.map
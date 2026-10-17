import type { Request, Response, NextFunction } from 'express';
export declare const asyncHandler: (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => (req: Request, res: Response, next: NextFunction) => Promise<any>;
export declare const regexes: {
    email: RegExp;
};
//# sourceMappingURL=helpers.d.ts.map
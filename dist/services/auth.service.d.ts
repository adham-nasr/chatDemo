export declare const registerUserService: (data: {
    username: string;
    password: string;
}) => Promise<{
    token: string;
    user: {
        id: import("mongoose").Types.ObjectId;
        username: string;
    };
}>;
export declare const loginUserService: (data: {
    username: string;
    password: string;
}) => Promise<{
    token: string;
    user: {
        id: import("mongoose").Types.ObjectId;
        username: string;
    };
}>;
//# sourceMappingURL=auth.service.d.ts.map
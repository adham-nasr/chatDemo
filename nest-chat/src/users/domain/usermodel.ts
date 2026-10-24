// User Domain Model

export class User {
    constructor(
        public  username: string,
        public  password: string,
        public readonly id?: string,
        public readonly createdAt?: Date,
    ) {}
}

export class User {
    id: number;
    name: string;
    email: string;
    verified: boolean;
    avatar: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

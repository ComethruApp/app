export class User {
    id: number;
    name: string;
    email: string;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

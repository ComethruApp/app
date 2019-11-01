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

export class Event_ {
    id: number;
    name: string;
    description: string;
    location: string;
    lat: number;
    lng: number;
    time: number;
    hosts: User[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

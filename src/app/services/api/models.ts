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
    location_name: string;
    location_lat: number;
    location_lon: number;
    time_start: number;
    time_end: number;
    venmo: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

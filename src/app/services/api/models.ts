export class User {
    id: number;
    name: string;
    email: string;
    verified: boolean;
    avatar: string;
    is_me: boolean;
    has_sent_friend_request: boolean;
    has_received_friend_request: boolean;
    is_friend: boolean;

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
    happening_now: boolean;
    mine: boolean;
    open: boolean;
    transitive_invites: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

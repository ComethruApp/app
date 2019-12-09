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
    // Usually null
    invited: boolean;
    facebook_id: string;
    facebook_name: string;
    hosting: boolean;

    // TODO don't repeat
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export class Vote {
    positive: boolean;
    negative: boolean;
    review: string;

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
    end_time: number;
    ended: boolean;
    hosts: User[];
    vote: Vote;
    happening_now: boolean;
    mine: boolean;
    open: boolean;
    transitive_invites: boolean;
    invited_me: boolean;
    people: number;
    capacity: number;
    rating: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

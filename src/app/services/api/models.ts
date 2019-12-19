export class _Base {
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export class User extends _Base {
    id: number;
    name: string;
    email: string;
    verified: boolean;
    is_me: boolean;
    has_sent_friend_request: boolean;
    has_received_friend_request: boolean;
    is_friend: boolean;
    // Usually null
    invited: boolean;
    facebook_id: string;
    facebook_name: string;
    hosting: boolean;
}

export class Review extends _Base {
    positive: boolean;
    negative: boolean;
    body: string;
}

export class Event_ extends _Base {
    id: number;
    name: string;
    description: string;
    location: string;
    address: string;
    lat: number;
    lng: number;
    time: number;
    end_time: number;
    ended: boolean;
    hosts: User[];
    review: Review;
    happening_now: boolean;
    mine: boolean;
    open: boolean;
    transitive_invites: boolean;
    invited_me: boolean;
    people: number;
    capacity: number;
    rating: number;
}

export interface AuthResponse {
    user: {
        id: number,
        name: string,
        email: string,
        token: string,
        expires_in: number,
    },
}

export interface RegisterResponse {
    status: string,
    message: string,
}

export interface ResetPasswordResponse {
    status: string,
    message: string,
}

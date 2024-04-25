export interface User {
    id: string;
    email: string;
    username: string;
    isActivated: boolean;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

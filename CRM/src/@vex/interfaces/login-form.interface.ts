
export interface AuthResponse {
    token: string;
    uid: any;
    ok: boolean;
    iud?: string;
    name?: string;
    lastname?: string;
    msg?: string;
    rol?: string;
}

export interface UserAdmin {
    
    uid: string;
    name?: string;
    lastname?: string;
    rol?: string;
}
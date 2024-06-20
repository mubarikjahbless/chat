import { AuthService } from './auth.service';
import { User } from '../../common/interfaces';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(credentials: any): Promise<void | {
        status: import("../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
    logout(user: any): Promise<void | {
        status: import("../../common/enums/status-code.enum").StatusCode;
        message: string;
    }>;
    signUp(signUp: User): Promise<void | {
        status: import("../../common/enums/status-code.enum").StatusCode;
        message: string;
    }>;
    getAllUser(): Promise<void | {
        status: import("../../common/enums/status-code.enum").StatusCode;
        message: string;
        data: Record<string, any>;
    }>;
}

import { HttpService } from "@/services/HttpService";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

class LoginService {
  private httpService = HttpService.getInstance();

  async login({ username, password }: LoginRequest): Promise<LoginResponse> {
    const response = await this.httpService.post<LoginResponse>('/oauth/token', { 
      username, 
      password, 
      grant_type: 'password',
      client_id: import.meta.env.VITE_CLIENT_ID,
      client_secret: import.meta.env.VITE_CLIENT_SECRET,
     });
    localStorage.setItem('token', response.access_token);
    return response;
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}

export const loginService = new LoginService();

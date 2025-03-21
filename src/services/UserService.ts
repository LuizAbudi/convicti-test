import { HttpService } from "@/services/HttpService";

interface PermissionPivot {
  profile_id: number;
  permission_id: number;
}

export interface Permission {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  pivot: PermissionPivot;
}

interface Profile {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  total_users: number;
  permissions: Permission[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
  profile_id: number;
  profile: Profile;
}

interface CreateUserBody {
  name: string;
  profile_id: number;
  email: string;
}

interface ApiResponse<T> {
  data: T;
}

interface GetLoggedUserResponse {
  data: {
    user: User;
  };
}

class UserService {
  private httpService = HttpService.getInstance();

  async getUsers(): Promise<ApiResponse<User[]>> {
    const response = await this.httpService.get<ApiResponse<User[]>>("/api/v1/users");
    return response;
  }

  async createUser(body: CreateUserBody): Promise<User> {
    const response = await this.httpService.post<User>("/api/v1/users", body);
    return response;
  }

  async updateUser(id: number, body: CreateUserBody): Promise<User> {
    const response = await this.httpService.put<User>(`/api/v1/users/${id}`, body);
    return response;
  }

  async getLoggedUser(): Promise<User> {
    const response = await this.httpService.get<GetLoggedUserResponse>("/api/v1/me");
    return response.data.user;
  }
}

export const userService = new UserService();

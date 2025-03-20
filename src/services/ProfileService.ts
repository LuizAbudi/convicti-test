import { HttpService } from "@/services/HttpService";

interface Permission {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    profile_id: number;
    permission_id: number;
  };
}

export interface Profile {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  total_users: number;
  permissions: Permission[];
}

interface ApiResponse<T> {
  data: T[];
}

class ProfileService {
  private httpService = HttpService.getInstance();

  async getProfiles(): Promise<ApiResponse<Profile>> {
    const response = await this.httpService.get<ApiResponse<Profile>>("/api/v1/profiles");
    return response;
  }
}

export const profileService = new ProfileService();

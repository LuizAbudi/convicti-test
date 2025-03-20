import { HttpService } from "@/services/HttpService";

export interface Download {
  id: number;
  device_id: number;
  created_at: string;
  updated_at: string;
  platform: "IOS" | "ANDROID";
}

export interface Error {
  id: number;
  device_id: number;
  details: string;
  created_at: string;
  updated_at: string;
  platform: "IOS" | "ANDROID";
}

export interface Evaluation {
  id: number;
  device_id: number;
  description: string;
  evaluation: number;
  improvements: string;
  created_at: string;
  updated_at: string;
  platform: "IOS" | "ANDROID";
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginationData<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface ApiResponse<T> {
  data: PaginationData<T>;
}

class StatisticsService {
  private httpService = HttpService.getInstance();

  async getDownloads(page?: number): Promise<ApiResponse<Download>> {
    const response = await this.httpService.get<ApiResponse<Download>>(
      page ? `/api/v1/downloads?page=${page}` : "/api/v1/downloads"
    );

    return response;
  }

  async getEvaluations(page?: number): Promise<ApiResponse<Evaluation>> {
    const response = await this.httpService.get<ApiResponse<Evaluation>>(
      page ? `/api/v1/evaluations?page=${page}` : "/api/v1/evaluations"
    );

    return response;
  }

  async getErrors(page?: number): Promise<ApiResponse<Error>> {
    const response = await this.httpService.get<ApiResponse<Error>>(
      page ? `/api/v1/errors?page=${page}` : "/api/v1/errors"
    );

    return response;
  }
}

export const statisticsService = new StatisticsService();

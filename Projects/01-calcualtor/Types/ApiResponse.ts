export interface Res {
  success: boolean;
  message: string;
  data?: number | string;
}

export default interface ApiResponse {
  data: Res;
  status: number;
}

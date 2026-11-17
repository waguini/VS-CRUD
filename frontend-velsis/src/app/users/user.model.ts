export interface User {
  id?: number;
  name: string;
  birthDate: string | null;
  document: string;
  addressLine: string;
  addressNumber: number | null;
  city: string;
  state: string;
  zip: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
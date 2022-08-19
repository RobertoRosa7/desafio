export interface Login {
  login: string;
  password: string;
}

export interface LoginResponse {
  error: boolean;
  message: string;
  data: Token | null;
}

export interface Token {
  token: string
}

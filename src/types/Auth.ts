export interface AuthState {
  isAuthenticated: boolean;
  user: { id: number; username: string; email: string } | null;
  token: string | null;
}

export interface AuthContextType {
  authState: AuthState;
  login: (user: { id: number; username: string; email: string }, token: string) => void;
  logout: () => void;
}
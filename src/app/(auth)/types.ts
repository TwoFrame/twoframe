export interface SignupState {
    errors?: {
      username?: string[];
      email?: string[];
      password?: string[];
      cpassword?: string[];
    };
    success?: boolean;
  }

export interface LoginState {
  errors?: {
    email?: string[];
    password?: string[];
  };
  success?: boolean;
}
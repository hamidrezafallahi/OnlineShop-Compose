
export interface ILogin {
  EmailOrPhone: string;
  Password: string;
}
export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}
export interface TokenPayload {
  role: string;
  name: string;
  email: string;
}
export interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface ISignup {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  image:File|null
}
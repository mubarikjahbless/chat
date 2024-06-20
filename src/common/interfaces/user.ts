import { Channel } from ".";

export interface User extends SignUp {
  id: string;
  channels: Channel[];
  loggedIn: boolean;
}

export interface SignUp {
  name: string;
  email: string;
  password: string;
}


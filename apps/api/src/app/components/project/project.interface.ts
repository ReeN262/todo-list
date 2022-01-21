import {User} from "../user/user.interface";

export interface Project {
  id: number;
  name: string;
  user: User;
}

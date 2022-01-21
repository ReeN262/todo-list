import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {UserEntity} from "./user.entity";

interface UserData {
  firstName: string;
  lastName: string;
  picture: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>) {}

  async findUserByEmail(email:string): Promise<UserEntity | undefined> {
    return this.userEntity.findOne({where: {email}})
  }

  newUser(data: Partial<UserData>): Promise<UserEntity> {
    return this.userEntity.save({
      name: `${data.firstName} ${data.lastName || '' }`,
      avatar: data.picture,
      email: data.email,
    });
  }
}

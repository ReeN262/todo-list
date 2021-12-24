import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../entity/user.entity";
import {Repository} from "typeorm";

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

  async newUser(data: Partial<UserData>): Promise<UserEntity> {

    const user = await this.userEntity.create({
      name: `${data.firstName} ${data.lastName}`,
      avatar: data.picture,
      email: data.email,
    })
    user.save();

    return user;
  }
}

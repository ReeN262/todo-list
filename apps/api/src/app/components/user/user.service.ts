import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {UserEntity} from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>) {}

  async findUserByEmail(email:string): Promise<UserEntity | undefined> {
    return this.userEntity.findOne({where: {email: email}})
  }
}

import { Injectable } from '@nestjs/common';
import { UserEntity } from "../user/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

interface UserData {
  firstName: string;
  lastName: string;
  picture: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserEntity)
              private userEntity: Repository<UserEntity>) {}

  newUser(data: Partial<UserData>): Promise<UserEntity> {
    return this.userEntity.save({
      name: `${data.firstName} ${data.lastName || '' }`,
      avatar: data.picture,
      email: data.email,
    });
  }
}

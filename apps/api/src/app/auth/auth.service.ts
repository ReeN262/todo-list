import { Injectable } from '@nestjs/common';
import {UserEntity} from "../entity/user.entity";
import {Repository} from "typeorm";


@Injectable()
export class AuthService {
constructor(readonly userEntity: Repository<UserEntity>) {
}
}

import * as HttpStatus from "http-status";
import { httpException } from "../../../../src/config/error";
import { CreateUserDto, UpdateUserDto } from "./dto";

export class UserService {
  public async listAll() {
    return [
      {
        _id: String(Math.floor(Math.random() * 1000)),
        name: "Jhon Doe",
        email: "jhondoe@gmail.com",
      },
      {
        _id: String(Math.floor(Math.random() * 1000)),
        name: "Foo Bar",
        email: "foobar@gmail.com",
      },
    ];
  }

  public async findById(id: string) {
    try {
      if (!id) throw httpException("Id user not found.", HttpStatus.NOT_FOUND);
      return {
        _id: id,
        name: "Jhon Doe",
        email: "jhondoe@gmail.com",
      };
    } catch (error) {
      throw error;
    }
  }

  public async create(createUserDto: CreateUserDto) {
    try {
      if (!createUserDto)
        throw httpException("User data was not sent.", HttpStatus.BAD_REQUEST);

      return {
        _id: String(Math.floor(Math.random() * 100)),
        name: createUserDto.name,
        email: createUserDto.email,
      };
    } catch (error) {
      throw error;
    }
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      if (!id) throw httpException("Id user not found.", HttpStatus.NOT_FOUND);
      if (!updateUserDto)
        throw httpException("User data was not sent.", HttpStatus.BAD_REQUEST);
      return {
        _id: id,
        name: updateUserDto.name,
        email: updateUserDto.email,
      };
    } catch (error) {
      throw error;
    }
  }

  public async remove(id: string) {
    try {
      if (!id) throw httpException("Id user not found.", HttpStatus.NOT_FOUND);
      return { message: "User successfully removed" };
    } catch (error) {
      throw error;
    }
  }
}

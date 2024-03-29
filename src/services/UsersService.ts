import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create(email: string) {
    // Verificar se o usuário existe
    const userAlreadyExists = await this.usersRepository.findOne({
      email,
    });

    // Se existir, retornar user
    if (userAlreadyExists) {
      return userAlreadyExists;
    }

    // Se não existir, salvar no banco de dados
    const user = this.usersRepository.create({
      email,
    });

    await this.usersRepository.save(user);

    // Retorna o user que foi criado
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      email,
    });
    return user;
  }
}

export { UsersService };

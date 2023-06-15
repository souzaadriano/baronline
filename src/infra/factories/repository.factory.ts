import { ClassConstructor } from '@/utils/class-constructor.type';

export class RepositoryFactory {
  private static readonly repositories = new Map<string, any>();

  public static factory(Repository: ClassConstructor) {
    if (RepositoryFactory.repositories.has(Repository.name)) return;
    const repository = new Repository();
    this.repositories.set(Repository.name, repository);
  }

  public static get<T>(Repository: ClassConstructor<T>): T {
    const repository = RepositoryFactory.repositories.get(Repository.name);
    if (!repository) RepositoryFactory.factory(Repository);
    return RepositoryFactory.repositories.get(Repository.name);
  }
}

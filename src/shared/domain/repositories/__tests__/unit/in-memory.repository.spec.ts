import { Entity } from '../../../entities/entity';
import { NotFoundError } from '../../../errors/not-found-error';
import { InMemoryRepository } from '../../in-memory.repository';

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository unit tests', () => {
  let sut: StubInMemoryRepository;

  beforeEach(() => {
    sut = new StubInMemoryRepository();
  });

  it('should insert a new entity', async () => {
    const entity = new StubEntity({ name: 'Test', price: 100 });

    await sut.insert(entity);

    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON());
  });

  it('should throw error when entity is not found', async () => {
    await expect(sut.findById('fake-id')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('should find an entity by id', async () => {
    const entity = new StubEntity({ name: 'Test', price: 50 });

    await sut.insert(entity);
    const result = await sut.findById(entity.id);

    expect(entity.toJSON()).toStrictEqual(result.toJSON());
  });
});

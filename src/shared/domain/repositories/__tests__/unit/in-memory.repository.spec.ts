import { Entity } from '@/shared/domain/entities/entity';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { InMemoryRepository } from '@/shared/domain/repositories/in-memory.repository';

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

  it('should return all entities', async () => {
    const entity = new StubEntity({ name: 'Test', price: 50 });

    await sut.insert(entity);
    const result = await sut.findAll();

    expect([entity]).toStrictEqual(result);
  });

  it('should throw error when entity is not found on update', async () => {
    const entity = new StubEntity({ name: 'Test', price: 50 });

    await expect(sut.update(entity)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('should update an entity', async () => {
    const entity = new StubEntity({ name: 'Test', price: 50 });

    await sut.insert(entity);
    const updatedEntity = new StubEntity(
      {
        name: 'Test 1',
        price: 10,
      },
      entity.id,
    );
    await sut.update(updatedEntity);

    expect(updatedEntity.toJSON()).toStrictEqual(sut.items[0].toJSON());
  });

  it('should throw error when entity is not found on delete', async () => {
    await expect(sut.delete('fake-id')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('should delete an entity', async () => {
    const entity = new StubEntity({ name: 'Test', price: 50 });

    await sut.insert(entity);
    await sut.delete(entity.id);

    expect(sut.items).toHaveLength(0);
  });
});

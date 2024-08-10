import { Entity } from '@/shared/domain/entities/entity';
import { validate as uuidValidate } from 'uuid';

type StubProps = {
  prop1: string;
  prop2: number;
};

class StubEntity extends Entity<StubProps> {}

describe('Entity', () => {
  it('should set props and id', () => {
    const props = {
      prop1: 'value1',
      prop2: 1,
    };

    const entity = new StubEntity(props);

    expect(entity.props).toStrictEqual(props);
    expect(entity._id).not.toBeNull();
    expect(uuidValidate(entity._id)).toBeTruthy();
  });

  it('should set valid uuid', () => {
    const props = {
      prop1: 'value1',
      prop2: 1,
    };
    const id = '7e6b64bc-f559-4f9a-a059-63beb632db25';
    const entity = new StubEntity(props, id);

    expect(uuidValidate(entity._id)).toBeTruthy();
    expect(entity._id).toBe(id);
  });

  it('should convert entity to json', () => {
    const props = {
      prop1: 'value1',
      prop2: 1,
    };
    const id = '7e6b64bc-f559-4f9a-a059-63beb632db25';
    const entity = new StubEntity(props, id);

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props,
    });
  });
});

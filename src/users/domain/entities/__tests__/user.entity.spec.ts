import { UserEntity, UserProps } from '@/users/domain/entities/user.entity';
import { faker } from '@faker-js/faker';

describe('UserEntity', () => {
  let props: UserProps;
  let sut: UserEntity;

  beforeEach(() => {
    props = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    sut = new UserEntity(props);
  });

  it('should assert constructor method', () => {
    expect(sut.props.name).toEqual(props.name);
    expect(sut.props.email).toEqual(props.email);
    expect(sut.props.password).toEqual(props.password);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('should assert getter of name field', () => {
    expect(sut.props.name).toBeDefined();
    expect(sut.props.name).toBe(props.name);
    expect(typeof sut.props.name).toBe('string');
  });

  it('should assert getter of email field', () => {
    expect(sut.props.email).toBeDefined();
    expect(sut.props.email).toBe(props.email);
    expect(typeof sut.props.email).toBe('string');
  });

  it('should assert getter of password field', () => {
    expect(sut.props.password).toBeDefined();
    expect(sut.props.password).toBe(props.password);
    expect(typeof sut.props.password).toBe('string');
  });

  it('should assert getter of createdAt field', () => {
    expect(sut.props.createdAt).toBeDefined();
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });
});

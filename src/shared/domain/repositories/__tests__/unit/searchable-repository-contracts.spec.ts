import { SearchParams } from '../../searchable-repository-contracts';

describe('Searchable Repository', () => {
  describe('SearchParams', () => {
    describe('page', () => {
      it('should return page 1 if no params are provided', () => {
        const sut = new SearchParams();

        expect(sut.page).toBe(1);
      });

      it.each([
        [null, 1],
        [undefined, 1],
        ['', 1],
        ['test', 1],
        [0, 1],
        [-1, 1],
        [5.5, 1],
        [true, 1],
        [false, 1],
        [{}, 1],
        [1, 1],
        [2, 2],
      ])('param %o should return page %d', (page, expected) => {
        const sut = new SearchParams({ page: page as any });
        expect(sut.page).toBe(expected);
      });
    });

    describe('perPage', () => {
      it('should return page 1 if no params are provided', () => {
        const sut = new SearchParams();

        expect(sut.perPage).toBe(15);
      });

      it.each([
        [null, 15],
        [undefined, 15],
        ['', 15],
        ['test', 15],
        [0, 15],
        [-1, 15],
        [5.5, 15],
        [true, 15],
        [false, 15],
        [{}, 15],
        [1, 1],
        [2, 2],
        [25, 25],
      ])('param %o should return %d values per page ', (perPage, expected) => {
        const sut = new SearchParams({ perPage: perPage as any });
        expect(sut.perPage).toBe(expected);
      });
    });

    describe('sort', () => {
      it('should return page 1 sorted', () => {
        const sut = new SearchParams();

        expect(sut.sort).toBe(null);
      });

      it.each([
        [null, null],
        [undefined, null],
        ['', null],
        ['test', 'test'],
        [0, '0'],
        [-1, '-1'],
        [5.5, '5.5'],
        [true, 'true'],
        [false, 'false'],
        [{}, '[object Object]'],
        [1, '1'],
        [2, '2'],
        [25, '25'],
      ])('sorted param %o should return %o', (sort, expected) => {
        const sut = new SearchParams({ sort: sort as any });
        expect(sut.sort).toBe(expected);
      });
    });

    describe('sortDirection', () => {
      it('should return null if no value is provided', () => {
        const sut = new SearchParams();

        expect(sut.sortDirection).toBeNull();
      });

      it('should return null if sort is null', () => {
        const sut = new SearchParams({ sort: null });

        expect(sut.sortDirection).toBeNull();
      });

      it.each([
        [null, 'DESC'],
        [undefined, 'DESC'],
        ['', 'DESC'],
        ['test', 'DESC'],
        [0, 'DESC'],
        [{}, 'DESC'],
        ['ASC', 'ASC'],
        ['DESC', 'DESC'],
      ])(
        'param %o should return sort direction %o',
        (sortDirection, expected) => {
          const sut = new SearchParams({
            sort: 'test',
            sortDirection: sortDirection as any,
          });

          expect(sut.sortDirection).toBe(expected);
        },
      );
    });

    describe('filter', () => {
      it('should return page 1 filtered', () => {
        const sut = new SearchParams();

        expect(sut.filter).toBe(null);
      });

      it.each([
        [null, null],
        [undefined, null],
        ['', null],
        ['test', 'test'],
        [0, '0'],
        [-1, '-1'],
        [5.5, '5.5'],
        [true, 'true'],
        [false, 'false'],
        [{}, '[object Object]'],
        [1, '1'],
        [2, '2'],
        [25, '25'],
      ])('filtered param %o should return %o', (filter, expected) => {
        const sut = new SearchParams({ filter: filter as any });
        expect(sut.filter).toBe(expected);
      });
    });
  });
});
